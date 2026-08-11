import { useCallback, useEffect, useState } from "react";
import { supabase } from "../../Supabaseclient";
import { useAuth } from "../context/AuthContext";
import type { Agent, AgentForm, QuestionSansReponse } from "../components/dashboard/types";



export function useAgents() {

    const { user } = useAuth();

    const [agents, setAgents] = useState<Agent[]>([]);

    const [loading, setLoading] = useState(true);



    const fetchAgents = useCallback(async () => {

        if (!user) {
            setAgents([]);
            setLoading(false);
            return;
        }

        setLoading(true);

        const { data, error } = await supabase
            .from("agents")
            .select(`
                id, nom, activite, description, statut, cle, couleur,
                position, multilingue, endpoints, conversations, sans_reponse, icone_url,
                faq ( q:question, r:reponse, motsCles:mots_cles ),
                questions_sans_reponse ( id, question, date ),
                conversations_list:conversations (
                    id, heure, langue, created_at,
                    messages ( role, texte, created_at )
                )
            `)
            .eq("user_id", user.id)
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Erreur chargement agents:", error.message);
            setLoading(false);
            return;
        }

        const mapped: Agent[] = (data ?? []).map((row: any) => ({
            id: row.id,
            nom: row.nom,
            activite: row.activite,
            description: row.description,
            statut: row.statut,
            conversations: row.conversations,
            sansReponse: row.sans_reponse,
            cle: row.cle,
            couleur: row.couleur,
            position: row.position,
            multilingue: row.multilingue,
            iconeUrl: row.icone_url ?? "",
            faq: row.faq ?? [],
            endpoints: row.endpoints,
            questionsSansReponse: row.questions_sans_reponse ?? [],
            conversationsJour: (row.conversations_list ?? [])
                .map((c: any) => ({
                    id: c.id,
                    heure: c.heure,
                    langue: c.langue,
                    date: c.created_at,
                    messages: (c.messages ?? [])
                        .slice()
                        .sort(
                            (a: any, b: any) =>
                                new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
                        )
                        .map((m: any) => ({ role: m.role, texte: m.texte })),
                }))
                .sort(
                    (a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()
                )
        }));

        setAgents(mapped);
        setLoading(false);

    }, [user]);



    useEffect(() => {

        fetchAgents();

    }, [fetchAgents]);





    const createAgent = async (
        form: AgentForm,
        cle: string
    ): Promise<Agent | null> => {

        if (!user) return null;


        const { data: agentRow, error: agentError } = await supabase
            .from("agents")
            .insert({
                user_id: user.id,
                nom: form.botName,
                activite: form.activityName,
                description: form.description,
                statut: "actif",
                cle,
                couleur: form.couleur,
                position: form.position,
                multilingue: form.multilingue,
                endpoints: form.endpoints,
                icone_url: form.iconeUrl || null,
                conversations: 0,
                sans_reponse: 0
            })
            .select()
            .single();


        if (agentError || !agentRow) {
            console.error("Erreur création agent:", agentError?.message);
            return null;
        }


        const faqToInsert = form.faq
            .filter(item => item.q.trim() && item.r.trim())
            .map(item => ({
                agent_id: agentRow.id,
                question: item.q,
                reponse: item.r,
                mots_cles: item.motsCles
            }));


        let insertedFaq: { q: string; r: string; motsCles: string[] }[] = [];


        if (faqToInsert.length > 0) {

            const { data: faqRows, error: faqError } = await supabase
                .from("faq")
                .insert(faqToInsert)
                .select();

            if (faqError) {
                console.error("Erreur insertion FAQ:", faqError.message);
            } else {
                insertedFaq = (faqRows ?? []).map(f => ({
                    q: f.question,
                    r: f.reponse,
                    motsCles: f.mots_cles ?? []
                }));
            }

        }


        const newAgent: Agent = {
            id: agentRow.id,
            nom: agentRow.nom,
            activite: agentRow.activite,
            description: agentRow.description,
            statut: agentRow.statut,
            conversations: agentRow.conversations,
            sansReponse: agentRow.sans_reponse,
            cle: agentRow.cle,
            couleur: agentRow.couleur,
            position: agentRow.position,
            multilingue: agentRow.multilingue,
            iconeUrl: agentRow.icone_url ?? "",
            faq: insertedFaq,
            endpoints: agentRow.endpoints,
            questionsSansReponse: [],
            conversationsJour: []
        };


        setAgents(prev => [newAgent, ...prev]);


        return newAgent;

    };






    const addToFaq = async (
        agentId: string,
        question: QuestionSansReponse,
        answer: string,
        motsCles: string[]
    ) => {


        const { error: insertError } = await supabase
            .from("faq")
            .insert({
                agent_id: agentId,
                question: question.question,
                reponse: answer,
                mots_cles: motsCles
            });

        if (insertError) {
            console.error("Erreur ajout FAQ:", insertError.message);
            return;
        }


        const { error: deleteError } = await supabase
            .from("questions_sans_reponse")
            .delete()
            .eq("id", question.id);

        if (deleteError) {
            console.error("Erreur suppression question:", deleteError.message);
        }


        const current = agents.find(a => a.id === agentId);

        const newCount = Math.max(0, (current?.sansReponse ?? 1) - 1);


        await supabase
            .from("agents")
            .update({ sans_reponse: newCount })
            .eq("id", agentId);


        setAgents(prev =>

            prev.map(agent => {

                if (agent.id !== agentId) return agent;

                return {
                    ...agent,
                    faq: [
                        ...agent.faq,
                        { q: question.question, r: answer, motsCles }
                    ],
                    questionsSansReponse: agent.questionsSansReponse.filter(
                        item => item.id !== question.id
                    ),
                    sansReponse: newCount
                };

            })

        );

    };
    const removeAgent = async (agentId: string): Promise<boolean> => {
        const { error } = await supabase
            .from("agents")
            .delete()
            .eq("id", agentId);

        if (error) {
            console.error("Erreur suppression agent:", error.message);
            return false;
        }

        setAgents(prev => prev.filter(agent => agent.id !== agentId));

        return true;
    };


    return { agents, loading, removeAgent, createAgent, addToFaq, refetch: fetchAgents };

}