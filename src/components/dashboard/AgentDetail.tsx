import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowLeft,
    ChevronRight,
    Check,
    Copy,
    Trash2,
    AlertTriangle,
    Plus,
    MessageCircleQuestion,
} from "lucide-react";

import StatusBadge from "./StatusBadge";
import type { Agent, QuestionSansReponse } from "./types";
import MotsClesInput from "./MotsClesInput";

interface Props {
    agent: Agent;
    back: () => void;
    addToFaq: (
        agentId: string,
        question: QuestionSansReponse,
        answer: string,
        motsCles: string[]
    ) => void;
    // Doit supprimer l'agent (Supabase + state) et renvoyer true si ça a marché.
    onDelete: (agentId: string) => Promise<boolean>;
}

const TABS = [
    { key: "configuration", label: "Configuration" },
    { key: "integration", label: "Intégration" },
    { key: "conversations", label: "Conversations" },
    { key: "questions", label: "Questions sans réponse" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

type DateRange = "today" | "week" | "all";

const RANGE_OPTIONS = [
    { key: "today", label: "Aujourd'hui" },
    { key: "week", label: "7 derniers jours" },
    { key: "all", label: "Tout" },
] as const;

const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

const formatGroupLabel = (isoString: string) => {
    const d = new Date(isoString);
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);

    if (isSameDay(d, now)) return "Aujourd'hui";
    if (isSameDay(d, yesterday)) return "Hier";

    return d.toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: d.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
    });
};

const formatTime = (isoString: string) =>
    new Date(isoString).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });

function filterByRange<T extends { date: string }>(items: T[], range: DateRange): T[] {
    if (range === "all") return items;

    const now = new Date();

    if (range === "today") {
        return items.filter((item) => isSameDay(new Date(item.date), now));
    }

    const sevenDaysAgo = new Date(now);
    sevenDaysAgo.setDate(now.getDate() - 7);
    return items.filter((item) => new Date(item.date) >= sevenDaysAgo);
}

function groupByDay<T extends { date: string }>(items: T[]): { label: string; items: T[] }[] {
    return items.reduce<{ label: string; items: T[] }[]>((groups, item) => {
        const label = formatGroupLabel(item.date);
        const last = groups[groups.length - 1];

        if (last && last.label === label) {
            last.items.push(item);
        } else {
            groups.push({ label, items: [item] });
        }

        return groups;
    }, []);
}

export default function AgentDetail({ agent, back, addToFaq, onDelete }: Props) {
    const [motsClesReponse, setMotsClesReponse] = useState<string[]>([]);
    const [tab, setTab] = useState<TabKey>("configuration");
    const [copied, setCopied] = useState(false);
    const [expanded, setExpanded] = useState<string | null>(null);
    const [answering, setAnswering] = useState<string | null>(null);
    const [answer, setAnswer] = useState("");
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState<string | null>(null);
    const [questionsRange, setQuestionsRange] = useState<DateRange>("today");
    const [conversationsRange, setConversationsRange] = useState<DateRange>("today");

    const sortedQuestions = [...agent.questionsSansReponse].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    const filteredQuestions = filterByRange(sortedQuestions, questionsRange);
    const groupedQuestions = groupByDay(filteredQuestions);

    // conversationsJour est déjà trié du plus récent au plus ancien depuis useAgents
    const filteredConversations = filterByRange(agent.conversationsJour, conversationsRange);
    const groupedConversations = groupByDay(filteredConversations);

    const snippetAttrs =
        `data-key="${agent.cle}" data-color="${agent.couleur}" data-position="${agent.position}"` +
        (agent.iconeUrl ? ` data-icon="${agent.iconeUrl}"` : "");

    const snippet = `<script src="https://vbzrmzycrxwqdomlfkyi.supabase.co/storage/v1/object/public/widget/widget.js" ${snippetAttrs}></script>`;

    const handleDelete = async () => {
        setDeleting(true);
        setDeleteError(null);

        const success = await onDelete(agent.id);

        if (success) {
            back();
        } else {
            setDeleteError("La suppression a échoué. Réessaie dans un instant.");
            setDeleting(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
            <div className="flex items-center justify-between mb-6">
                <button
                    onClick={back}
                    className="flex items-center gap-1.5 text-sm text-[#6B6459] hover:text-[#14171F] transition-colors"
                >
                    <ArrowLeft size={16} strokeWidth={2.5} />
                    Retour
                </button>

                <button
                    onClick={() => setConfirmDelete(true)}
                    className="flex items-center gap-1.5 text-sm text-[#B3261E] hover:bg-[#FBEAE9] rounded-full px-3 py-1.5 transition-colors"
                >
                    <Trash2 size={14} />
                    Supprimer l'agent
                </button>
            </div>

            <div className="flex items-center gap-3 mb-1.5 flex-wrap">
                <h1 className="text-[28px] sm:text-3xl font-semibold tracking-tight">{agent.nom}</h1>
                <StatusBadge statut={agent.statut} />
            </div>

            <p className="text-sm text-[#6B6459] mb-8">{agent.activite}</p>

            {/* TABS */}
            <div className="flex border-b border-[#EDEAE3] mb-8 overflow-x-auto">
                {TABS.map((item) => (
                    <button
                        key={item.key}
                        onClick={() => setTab(item.key)}
                        className="relative px-4 py-3 text-sm shrink-0 whitespace-nowrap transition-colors"
                        style={{ color: tab === item.key ? "#14171F" : "#9B9284" }}
                    >
                        <span className="flex items-center gap-2">
                            {item.label}
                            {item.key === "questions" && agent.questionsSansReponse.length > 0 && (
                                <span className="text-[11px] font-medium bg-[#FCEFCB] text-[#8A6A0F] px-1.5 py-0.5 rounded-full">
                                    {agent.questionsSansReponse.length}
                                </span>
                            )}
                        </span>

                        {tab === item.key && (
                            <motion.div
                                layoutId="tab-underline"
                                className="absolute left-0 right-0 -bottom-px h-[2px] bg-[#14171F]"
                                transition={{ type: "spring", stiffness: 500, damping: 40 }}
                            />
                        )}
                    </button>
                ))}
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={tab}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                >
                    {/* CONFIGURATION */}
                    {tab === "configuration" && (
                        <div className="grid lg:grid-cols-2 gap-5">
                            <Card title="Informations">
                                <InfoRow label="Description" value={agent.description} />
                                <InfoRow label="Widget" value={agent.position} />
                                <div className="flex items-center gap-2.5 pt-1">
                                    <span className="text-sm text-[#6B6459]">Couleur</span>
                                    <span
                                        className="w-5 h-5 rounded-full border border-black/5"
                                        style={{ backgroundColor: agent.couleur }}
                                    />
                                    <span className="text-xs text-[#B7B0A4] font-mono">{agent.couleur}</span>
                                </div>
                            </Card>

                            <Card title={`FAQ (${agent.faq.length})`}>
                                {agent.faq.length === 0 ? (
                                    <p className="text-sm text-[#9B9284]">Aucune FAQ</p>
                                ) : (
                                    <div className="flex flex-col">
                                        {agent.faq.map((item, index) => (
                                            <div
                                                key={index}
                                                className={`py-3 text-sm ${index < agent.faq.length - 1 ? "border-b border-[#EDEAE3]" : ""
                                                    }`}
                                            >
                                                <p className="font-medium text-[#14171F]">{item.q}</p>
                                                <p className="text-[#6B6459] mt-1">{item.r}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </Card>
                        </div>
                    )}

                    {/* INTEGRATION */}
                    {tab === "integration" && (
                        <div className="max-w-2xl">
                            <Card title="Snippet">
                                <div className="flex justify-between items-center mb-4 -mt-2">
                                    <span />
                                    <button
                                        onClick={() => {
                                            navigator.clipboard.writeText(snippet);
                                            setCopied(true);
                                            setTimeout(() => setCopied(false), 1500);
                                        }}
                                        className="text-sm text-[#2F6F5E] flex items-center gap-1.5 hover:opacity-70 transition-opacity"
                                    >
                                        {copied ? <Check size={14} /> : <Copy size={14} />}
                                        {copied ? "Copié" : "Copier"}
                                    </button>
                                </div>

                                <div className="bg-[#14171F] rounded-xl p-4 overflow-x-auto">
                                    <code className="text-white/90 text-xs break-all">{snippet}</code>
                                </div>
                            </Card>
                        </div>
                    )}

                    {/* CONVERSATIONS */}
                    {tab === "conversations" && (
                        <div className="flex flex-col gap-5 max-w-2xl">
                            {agent.conversationsJour.length > 0 && (
                                <div className="inline-flex self-start items-center gap-0.5 bg-[#F6F4EF] border border-[#EDEAE3] rounded-full p-1">
                                    {RANGE_OPTIONS.map((r) => (
                                        <button
                                            key={r.key}
                                            onClick={() => setConversationsRange(r.key)}
                                            className="relative px-3.5 py-1.5 text-xs font-medium rounded-full transition-colors"
                                            style={{ color: conversationsRange === r.key ? "#14171F" : "#9B9284" }}
                                        >
                                            {conversationsRange === r.key && (
                                                <motion.div
                                                    layoutId="conversations-range"
                                                    className="absolute inset-0 bg-white rounded-full shadow-sm"
                                                    transition={{ type: "spring", stiffness: 500, damping: 40 }}
                                                />
                                            )}
                                            <span className="relative">{r.label}</span>
                                        </button>
                                    ))}
                                </div>
                            )}

                            {agent.conversationsJour.length === 0 && (
                                <EmptyState label="Aucune conversation pour le moment" />
                            )}

                            {agent.conversationsJour.length > 0 && filteredConversations.length === 0 && (
                                <EmptyState
                                    label={
                                        conversationsRange === "today"
                                            ? "Aucune conversation aujourd'hui"
                                            : "Aucune conversation sur cette période"
                                    }
                                />
                            )}

                            {groupedConversations.map((group) => (
                                <div key={group.label} className="flex flex-col gap-3">
                                    <p className="text-xs font-medium uppercase tracking-wide text-[#9B9284] mt-1">
                                        {group.label}
                                    </p>

                                    {group.items.map((conv) => {
                                        const open = expanded === conv.id;

                                        return (
                                            <div
                                                key={conv.id}
                                                className="bg-white border border-[#EDEAE3] rounded-2xl overflow-hidden"
                                            >
                                                <button
                                                    onClick={() => setExpanded(open ? null : conv.id)}
                                                    className="w-full flex justify-between items-center p-5 text-left"
                                                >
                                                    <span className="text-sm text-[#14171F]">
                                                        {formatTime(conv.date)}{" "}
                                                        <span className="text-[#B7B0A4]">·</span> {conv.langue}
                                                    </span>

                                                    <ChevronRight
                                                        size={16}
                                                        className="text-[#B7B0A4] transition-transform duration-200"
                                                        style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)" }}
                                                    />
                                                </button>

                                                <AnimatePresence>
                                                    {open && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: "auto", opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            transition={{ duration: 0.2 }}
                                                            className="overflow-hidden"
                                                        >
                                                            <div className="px-5 pb-5 flex flex-col gap-2">
                                                                {conv.messages.map((msg, index) => (
                                                                    <div
                                                                        key={index}
                                                                        className={`rounded-xl px-3.5 py-2.5 text-sm max-w-[80%] ${msg.role === "bot"
                                                                            ? "bg-[#EAF3EF] text-[#14171F] ml-auto"
                                                                            : "bg-[#F1EFEA] text-[#14171F]"
                                                                            }`}
                                                                    >
                                                                        {msg.texte}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* QUESTIONS */}
                    {tab === "questions" && (
                        <div className="flex flex-col gap-5 max-w-2xl">
                            {agent.questionsSansReponse.length > 0 && (
                                <div className="inline-flex self-start items-center gap-0.5 bg-[#F6F4EF] border border-[#EDEAE3] rounded-full p-1">
                                    {RANGE_OPTIONS.map((r) => (
                                        <button
                                            key={r.key}
                                            onClick={() => setQuestionsRange(r.key)}
                                            className="relative px-3.5 py-1.5 text-xs font-medium rounded-full transition-colors"
                                            style={{ color: questionsRange === r.key ? "#14171F" : "#9B9284" }}
                                        >
                                            {questionsRange === r.key && (
                                                <motion.div
                                                    layoutId="questions-range"
                                                    className="absolute inset-0 bg-white rounded-full shadow-sm"
                                                    transition={{ type: "spring", stiffness: 500, damping: 40 }}
                                                />
                                            )}
                                            <span className="relative">{r.label}</span>
                                        </button>
                                    ))}
                                </div>
                            )}

                            {agent.questionsSansReponse.length === 0 && (
                                <EmptyState label="Aucune question en attente" />
                            )}

                            {agent.questionsSansReponse.length > 0 && filteredQuestions.length === 0 && (
                                <EmptyState
                                    label={
                                        questionsRange === "today"
                                            ? "Aucune question aujourd'hui"
                                            : "Aucune question sur cette période"
                                    }
                                />
                            )}

                            {groupedQuestions.map((group) => (
                                <div key={group.label} className="flex flex-col gap-3">
                                    <p className="text-xs font-medium uppercase tracking-wide text-[#9B9284] mt-1">
                                        {group.label}
                                    </p>

                                    {group.items.map((q) => (
                                        <div
                                            key={q.id}
                                            className="bg-white border border-[#EDEAE3] rounded-2xl p-5 hover:border-[#DCD5C4] transition-colors"
                                        >
                                            <div className="flex items-start gap-3">
                                                <div className="w-8 h-8 rounded-full bg-[#F1EFEA] flex items-center justify-center shrink-0 mt-0.5">
                                                    <MessageCircleQuestion size={15} className="text-[#6B6459]" />
                                                </div>

                                                <div className="min-w-0 flex-1">
                                                    <div className="flex items-start justify-between gap-3">
                                                        <p className="font-medium text-[#14171F]">{q.question}</p>
                                                        <span className="text-xs text-[#B7B0A4] shrink-0 mt-0.5">
                                                            {formatTime(q.date)}
                                                        </span>
                                                    </div>

                                                    {answering === q.id ? (
                                                        <div className="mt-4">
                                                            <textarea
                                                                value={answer}
                                                                onChange={(e) => setAnswer(e.target.value)}
                                                                placeholder="Votre réponse"
                                                                className="w-full border border-[#EDEAE3] rounded-xl p-3 text-sm outline-none focus:border-[#2F6F5E] transition-colors"
                                                                rows={3}
                                                            />

                                                            <div className="mt-3">
                                                                <label className="text-xs text-[#6B6459] block mb-1.5">
                                                                    Mots-clés déclencheurs
                                                                </label>
                                                                <MotsClesInput
                                                                    value={motsClesReponse}
                                                                    onChange={setMotsClesReponse}
                                                                />
                                                            </div>

                                                            <div className="flex items-center gap-3 mt-3">
                                                                <button
                                                                    onClick={() => {
                                                                        addToFaq(agent.id, q, answer, motsClesReponse);
                                                                        setAnswer("");
                                                                        setMotsClesReponse([]);
                                                                        setAnswering(null);
                                                                    }}
                                                                    className="bg-[#2F6F5E] text-white rounded-full px-4 py-2 text-sm hover:brightness-110 transition-all"
                                                                >
                                                                    Enregistrer
                                                                </button>

                                                                <button
                                                                    onClick={() => {
                                                                        setAnswering(null);
                                                                        setAnswer("");
                                                                        setMotsClesReponse([]);
                                                                    }}
                                                                    className="text-sm text-[#6B6459] hover:text-[#14171F] transition-colors"
                                                                >
                                                                    Annuler
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <button
                                                            onClick={() => setAnswering(q.id)}
                                                            className="inline-flex items-center gap-1.5 mt-3 text-xs font-medium text-[#2F6F5E] border border-[#2F6F5E]/25 rounded-full px-3 py-1.5 hover:bg-[#EAF3EF] transition-colors"
                                                        >
                                                            <Plus size={12} />
                                                            Ajouter à la FAQ
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>

            {/* CONFIRMATION SUPPRESSION */}
            <AnimatePresence>
                {confirmDelete && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/30 flex items-center justify-center p-4 z-50"
                        onClick={() => !deleting && setConfirmDelete(false)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.96, y: 8 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.96, y: 8 }}
                            transition={{ duration: 0.15 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-2xl p-6 max-w-sm w-full"
                        >
                            <div className="w-10 h-10 rounded-full bg-[#FBEAE9] flex items-center justify-center mb-4">
                                <AlertTriangle size={18} className="text-[#B3261E]" />
                            </div>

                            <h3 className="font-semibold text-[#14171F] mb-1.5">
                                Supprimer {agent.nom} ?
                            </h3>

                            <p className="text-sm text-[#6B6459] mb-6">
                                Cette action est définitive. Le widget cessera de fonctionner immédiatement sur
                                votre site.
                            </p>

                            {deleteError && (
                                <p className="text-sm text-[#B3261E] mb-4">{deleteError}</p>
                            )}

                            <div className="flex items-center gap-3">
                                <button
                                    disabled={deleting}
                                    onClick={() => {
                                        setConfirmDelete(false);
                                        setDeleteError(null);
                                    }}
                                    className="flex-1 text-sm text-[#6B6459] border border-[#EDEAE3] rounded-full px-4 py-2.5 hover:bg-[#FAF9F6] transition-colors disabled:opacity-50"
                                >
                                    Annuler
                                </button>

                                <button
                                    disabled={deleting}
                                    onClick={handleDelete}
                                    className="flex-1 text-sm text-white bg-[#B3261E] rounded-full px-4 py-2.5 hover:brightness-110 transition-all disabled:opacity-50"
                                >
                                    {deleting ? "Suppression..." : "Supprimer"}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="bg-white border border-[#EDEAE3] rounded-2xl p-6">
            <h3 className="font-semibold text-[#14171F] mb-4">{title}</h3>
            {children}
        </div>
    );
}

function InfoRow({ label, value }: { label: string; value: string }) {
    return (
        <p className="text-sm pb-3">
            <span className="text-[#6B6459]">{label} : </span>
            <span className="text-[#14171F]">{value}</span>
        </p>
    );
}

function EmptyState({ label }: { label: string }) {
    return (
        <div className="bg-white border border-dashed border-[#DCD5C4] rounded-2xl p-10 text-center">
            <p className="text-sm text-[#9B9284]">{label}</p>
        </div>
    );
}