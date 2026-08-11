import { useState } from "react";
import { Menu, Loader2 } from "lucide-react";

import Sidebar from "../components/dashboard/sidebar"
import Overview from "../components/dashboard/Overview";
import CreateAgent from "../components/dashboard/CreateAgent";
import AgentDetail from "../components/dashboard/AgentDetail";
import SettingsPage from "../components/dashboard/SettingsPage";
import Documentation from "../components/dashboard/Documentation";

import { useAgents } from "../hooks/useAgents";
import type { QuestionSansReponse, AgentForm } from "../components/dashboard/types";




export default function Dashboard() {



    const { agents, loading, removeAgent, createAgent, addToFaq } = useAgents();



    const [page, setPage] = useState<
        "overview" |
        "create" |
        "agent" |
        "settings" |
        "docs"
    >("overview");

    const [selectedAgentId, setSelectedAgentId] =
        useState<string | null>(null);



    const [mobileNavOpen, setMobileNavOpen] =
        useState(false);





    const selectedAgent =
        agents.find(
            agent => agent.id === selectedAgentId
        );






    const goOverview = () => {

        setPage("overview");

        setSelectedAgentId(null);

        setMobileNavOpen(false);

    };


    const openAgent = (id: string) => {

        setSelectedAgentId(id);

        setPage("agent");

    };









    const handleAddToFaq = (

        agentId: string,

        question: QuestionSansReponse,

        answer: string,
        motsCles: string[]

    ) => {

        addToFaq(agentId, question, answer, motsCles);

    };





    const handleAgentCreated = async (
        form: AgentForm,
        cle: string
    ) => {

        const created = await createAgent(form, cle);

        if (created) {
            goOverview();
        }

    };









    return (

        <div className="
        min-h-screen
        w-full
        flex
        bg-white
        relative
        ">


            <Sidebar

                page={page}

                setPage={(value) => {

                    setPage(value);

                    setMobileNavOpen(false);

                    if (value !== "agent") {
                        setSelectedAgentId(null);
                    }

                }}

                resetToOverview={goOverview}

                mobileOpen={mobileNavOpen}

                onMobileClose={() => setMobileNavOpen(false)}

            />




            {
                mobileNavOpen &&

                <div
                    onClick={() => setMobileNavOpen(false)}
                    className="
                    fixed inset-0
                    bg-black/40
                    z-30
                    lg:hidden
                    "
                />
            }




            <main className="
            flex-1
            w-full
            min-w-0
            px-4
            py-6
            sm:px-6
            sm:py-8
            lg:px-14
            lg:py-10
            max-w-7xl
            ">



                <div className="
                flex items-center gap-3
                mb-6
                lg:hidden
                ">

                    <button
                        onClick={() => setMobileNavOpen(true)}
                        className="
                        p-2
                        rounded-lg
                        bg-[#14171F]
                        text-white
                        "
                    >
                        <Menu size={20} />
                    </button>

                    <span className="text-2xl font-extrabold tracking-tight text-white ">
                        SMARTBOT
                    </span>

                </div>




                {
                    loading &&

                    <div className="
                    flex
                    items-center
                    justify-center
                    py-20
                    text-[#6B6459]
                    ">

                        <Loader2 size={22} className="animate-spin mr-2" />

                        Chargement...

                    </div>
                }




                {
                    !loading &&
                    page === "overview" &&

                    <Overview

                        agents={agents}

                        openAgent={openAgent}

                        goCreate={() => setPage("create")}

                    />

                }






                {
                    !loading &&
                    page === "create" &&

                    <CreateAgent

                        onCancel={goOverview}

                        onCreated={handleAgentCreated}

                    />

                }







                {
                    !loading &&
                    page === "agent"
                    &&
                    selectedAgent
                    &&

                    <AgentDetail
                        agent={selectedAgent}
                        back={goOverview}
                        addToFaq={addToFaq}
                        onDelete={removeAgent}
                    />
                }








                {
                    !loading &&
                    page === "settings" &&

                    <SettingsPage />

                }








                {
                    !loading &&
                    page === "docs" &&

                    <Documentation />

                }



            </main>




        </div>

    );


}