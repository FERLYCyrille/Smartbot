import { useEffect, useState } from "react";
import { CreditCard, Gauge, Mail, KeyRound, Check } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../../Supabaseclient";


const QUOTA_LIMITE = 5000;


export default function SettingsPage() {

    const { user, signOut } = useAuth();


    const [nouveauMotDePasse, setNouveauMotDePasse] = useState("");

    const [enregistrement, setEnregistrement] = useState(false);

    const [message, setMessage] = useState<{ type: "success" | "error"; texte: string } | null>(null);


    const [messagesUtilises, setMessagesUtilises] = useState<number | null>(null);




    useEffect(() => {

        const chargerQuota = async () => {

            if (!user) return;


            const { data: agentsData } = await supabase
                .from("agents")
                .select("id")
                .eq("user_id", user.id);

            const agentIds = (agentsData ?? []).map(a => a.id);

            if (agentIds.length === 0) {
                setMessagesUtilises(0);
                return;
            }


            const { data: convsData } = await supabase
                .from("conversations")
                .select("id")
                .in("agent_id", agentIds);

            const convIds = (convsData ?? []).map(c => c.id);

            if (convIds.length === 0) {
                setMessagesUtilises(0);
                return;
            }


            const { count } = await supabase
                .from("messages")
                .select("id", { count: "exact", head: true })
                .in("conversation_id", convIds);

            setMessagesUtilises(count ?? 0);

        };

        chargerQuota();

    }, [user]);




    const initiales = (user?.user_metadata?.full_name || user?.email || "?")
        .split(" ")
        .map((mot: string) => mot[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();




    const handleEnregistrer = async () => {

        setMessage(null);


        if (!nouveauMotDePasse) {

            setMessage({ type: "error", texte: "Entrez un nouveau mot de passe pour l'enregistrer." });

            return;

        }


        if (nouveauMotDePasse.length < 6) {

            setMessage({ type: "error", texte: "Le mot de passe doit contenir au moins 6 caractères." });

            return;

        }


        setEnregistrement(true);

        const { error } = await supabase.auth.updateUser({ password: nouveauMotDePasse });

        setEnregistrement(false);


        if (error) {

            setMessage({ type: "error", texte: "Impossible de mettre à jour le mot de passe. Réessayez." });

        } else {

            setMessage({ type: "success", texte: "Mot de passe mis à jour." });

            setNouveauMotDePasse("");

        }

    };




    const pourcentageQuota = messagesUtilises !== null
        ? Math.min(100, Math.round((messagesUtilises / QUOTA_LIMITE) * 100))
        : 0;




    return (

        <>

            <div className="
            flex
            items-center
            gap-4
            mb-8
            ">

                <div className="
                w-14
                h-14
                rounded-full
                bg-[#14171F]
                text-white
                flex
                items-center
                justify-center
                text-lg
                font-semibold
                shrink-0
                ">

                    {initiales}

                </div>


                <div>

                    <h1 className="
                    text-2xl
                    font-semibold
                    text-[#14171F]
                    ">
                        Paramètres du compte
                    </h1>

                    <p className="
                    text-sm
                    text-[#6B6459]
                    ">
                        {user?.email}
                    </p>

                </div>

            </div>





            <div className="
            grid
            lg:grid-cols-2
            gap-6
            max-w-4xl
            ">



                {/* FACTURATION */}

                <div className="
                bg-white
                border
                border-[#DCD5C4]
                rounded-2xl
                p-6
                ">

                    <div className="
                    flex
                    items-center
                    gap-2
                    mb-5
                    ">

                        <CreditCard size={16} className="text-[#2F6F5E]" />

                        <h3 className="font-semibold text-[#14171F]">
                            Facturation
                        </h3>

                    </div>



                    <div className="
                    flex
                    justify-between
                    text-sm
                    mb-3
                    ">

                        <span className="text-[#6B6459]">
                            Plan actuel
                        </span>

                        <span className="font-medium">
                            Standard — 9 900 FCFA/mois
                        </span>

                    </div>



                    <div className="
                    flex
                    justify-between
                    text-sm
                    ">

                        <span className="text-[#6B6459]">
                            Paiement
                        </span>

                        <span className="font-medium">
                            Mobile Money
                        </span>

                    </div>



                    <p className="
                    text-xs
                    text-[#6B6459]
                    mt-4
                    ">
                        La gestion des abonnements arrive bientôt.
                    </p>


                </div>





                {/* QUOTA */}

                <div className="
                bg-white
                border
                border-[#DCD5C4]
                rounded-2xl
                p-6
                ">

                    <div className="
                    flex
                    items-center
                    gap-2
                    mb-5
                    ">

                        <Gauge size={16} className="text-[#2F6F5E]" />

                        <h3 className="font-semibold text-[#14171F]">
                            Quota messages
                        </h3>

                    </div>



                    <div className="
                    h-2
                    rounded-full
                    bg-[#DCD5C4]
                    overflow-hidden
                    ">

                        <div

                            className="
                            h-full
                            bg-[#2F6F5E]
                            rounded-full
                            transition-all
                            "

                            style={{ width: `${pourcentageQuota}%` }}

                        />

                    </div>



                    <p className="
                    text-xs
                    text-[#6B6459]
                    mt-3
                    ">

                        {
                            messagesUtilises === null
                                ? "Chargement..."
                                : `${messagesUtilises.toLocaleString("fr-FR")} / ${QUOTA_LIMITE.toLocaleString("fr-FR")} messages utilisés`
                        }

                    </p>


                </div>





                {/* COMPTE */}

                <div className="
                bg-white
                border
                border-[#DCD5C4]
                rounded-2xl
                p-6
                lg:col-span-2
                ">

                    <div className="
                    flex
                    items-center
                    gap-2
                    mb-5
                    ">

                        <KeyRound size={16} className="text-[#2F6F5E]" />

                        <h3 className="font-semibold text-[#14171F]">
                            Informations de connexion
                        </h3>

                    </div>



                    <div className="
                    grid
                    sm:grid-cols-2
                    gap-5
                    ">


                        <div>

                            <label className="
                            text-xs
                            text-[#6B6459]
                            flex
                            items-center
                            gap-1.5
                            mb-2
                            ">

                                <Mail size={12} />

                                Email

                            </label>


                            <input

                                value={user?.email ?? ""}

                                disabled

                                className="
                                w-full
                                border
                                rounded-xl
                                px-4
                                py-3
                                text-sm
                                outline-none
                                bg-gray-50
                                text-gray-500
                                "

                            />


                        </div>



                        <div>

                            <label className="
                            text-xs
                            text-[#6B6459]
                            block
                            mb-2
                            ">
                                Nouveau mot de passe
                            </label>


                            <input

                                type="password"

                                value={nouveauMotDePasse}

                                onChange={e => setNouveauMotDePasse(e.target.value)}

                                placeholder="••••••••"

                                className="
                                w-full
                                border
                                rounded-xl
                                px-4
                                py-3
                                text-sm
                                outline-none
                                "

                            />


                        </div>


                    </div>




                    {
                        message &&

                        <p className={`
                        text-sm
                        mt-4
                        flex
                        items-center
                        gap-1.5
                        ${message.type === "success" ? "text-[#2F6F5E]" : "text-red-600"}
                        `}>

                            {message.type === "success" && <Check size={14} />}

                            {message.texte}

                        </p>

                    }




                    <div className="
                    flex
                    items-center
                    gap-3
                    mt-6
                    ">


                        <button

                            onClick={handleEnregistrer}

                            disabled={enregistrement}

                            className="
                            bg-[#14171F]
                            text-white
                            rounded-full
                            px-6
                            py-2.5
                            text-sm
                            disabled:opacity-50
                            "

                        >

                            {enregistrement ? "Enregistrement..." : "Enregistrer"}

                        </button>



                        <button

                            onClick={signOut}

                            className="
                            text-sm
                            text-[#6B6459]
                            "

                        >

                            Se déconnecter

                        </button>


                    </div>


                </div>


            </div>


        </>

    );

}