import { motion } from "framer-motion";
import {
    Plus,
    MessageSquare,
    AlertCircle,
    ChevronRight,
    Bot as BotIcon,
} from "lucide-react";

import StatusBadge from "./StatusBadge";
import { useAuth } from "../../context/AuthContext";
import type { Agent } from "./types";

interface Props {
    agents: Agent[];
    openAgent: (id: string) => void;
    goCreate?: () => void;
}

export default function Overview({ agents, openAgent, goCreate }: Props) {
    const { user } = useAuth();

    const prenom =
        user?.user_metadata?.full_name?.trim() || user?.email?.split("@")[0] || "là";

    const totalAgents = agents.length;
    const agentsActifs = agents.filter((a) => a.statut === "actif").length;

    const totalConversations = agents.reduce((acc, item) => acc + item.conversations, 0);
    const totalSansReponse = agents.reduce((acc, item) => acc + item.sansReponse, 0);

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-5 mb-8 sm:mb-10"
            >
                <div>
                    <h1 className="text-[28px] sm:text-3xl font-semibold text-[#14171F] tracking-tight">
                        Bonjour, {prenom}
                    </h1>
                    <p className="text-sm text-[#6B6459] mt-1.5">
                        Voici l'activité de vos agents aujourd'hui.
                    </p>
                </div>

                <button
                    onClick={goCreate}
                    className="flex items-center justify-center gap-2 bg-[#2F6F5E] text-white rounded-full px-5 py-2.5 text-sm font-medium hover:brightness-110 transition-all active:scale-[0.98] shrink-0"
                >
                    Créer un agent
                    <Plus size={16} />
                </button>
            </motion.div>

            {/* STATS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                <StatCard
                    icon={<BotIcon size={15} />}
                    label="Agents actifs"
                    value={agentsActifs}
                    suffix={`/ ${totalAgents}`}
                />

                <StatCard
                    icon={<MessageSquare size={15} />}
                    label="Conversations aujourd'hui"
                    value={totalConversations}
                />

                <StatCard
                    icon={<AlertCircle size={15} />}
                    label="Questions en attente"
                    value={totalSansReponse}
                    dot={totalSansReponse > 0}
                />
            </div>

            {/* AGENTS */}
            <h2 className="text-base font-semibold mb-4 text-[#14171F]">Vos agents</h2>

            <div className="flex flex-col gap-3">
                {agents.length === 0 && (
                    <div className="bg-white border border-dashed border-[#DCD5C4] rounded-2xl p-12 text-center">
                        <div className="w-11 h-11 rounded-full bg-[#F1EFEA] flex items-center justify-center mx-auto mb-3">
                            <BotIcon size={18} className="text-[#B7B0A4]" />
                        </div>
                        <p className="text-sm text-[#6B6459]">
                            Aucun agent pour l'instant. Créez-en un pour commencer.
                        </p>
                    </div>
                )}

                {agents.map((agent, index) => (
                    <motion.div
                        key={agent.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => openAgent(agent.id)}
                        className="bg-white border border-[#EDEAE3] rounded-2xl p-4 sm:p-5 cursor-pointer hover:border-[#2F6F5E] hover:shadow-[0_2px_10px_rgba(0,0,0,0.04)] transition-all"
                    >
                        <div className="flex justify-between items-center gap-4">
                            <div className="flex items-start gap-3.5 min-w-0">
                                <div className="w-10 h-10 rounded-full bg-[#F1EFEA] flex items-center justify-center text-sm font-semibold text-[#6B6459] shrink-0">
                                    {agent.nom.trim()[0]?.toUpperCase() || "?"}
                                </div>

                                <div className="min-w-0">
                                    <div className="flex items-center gap-2.5 flex-wrap">
                                        <h3 className="font-semibold text-[#14171F] truncate">{agent.nom}</h3>
                                        <StatusBadge statut={agent.statut} />
                                    </div>

                                    <p className="text-sm text-[#6B6459] mt-0.5 truncate">{agent.activite}</p>

                                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2.5 text-xs text-[#6B6459]">
                                        <span className="flex items-center gap-1.5">
                                            <MessageSquare size={13} />
                                            {agent.conversations} conversations
                                        </span>

                                        {agent.sansReponse > 0 && (
                                            <span className="flex items-center gap-1.5 text-[#B8860B]">
                                                <AlertCircle size={13} />
                                                {agent.sansReponse} sans réponse
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <ChevronRight size={18} className="text-[#B7B0A4] shrink-0" />
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

function StatCard({
    icon,
    label,
    value,
    suffix,
    dot,
}: {
    icon: React.ReactNode;
    label: string;
    value: number;
    suffix?: string;
    dot?: boolean;
}) {
    return (
        <div className="bg-white border border-[#EDEAE3] rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-full bg-[#F1EFEA] flex items-center justify-center text-[#6B6459]">
                    {icon}
                </div>
                <p className="text-xs text-[#6B6459]">{label}</p>
            </div>

            <h2 className="text-2xl font-semibold text-[#14171F] flex items-center gap-2">
                {value}
                {suffix && <span className="text-sm font-normal text-[#B7B0A4]">{suffix}</span>}
                {dot && <span className="w-2 h-2 rounded-full bg-[#E0A419]" />}
            </h2>
        </div>
    );
}