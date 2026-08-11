import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, User, Bot } from "lucide-react";

type FAQItem = {
    question: string;
    answer: string;
};

const faqs: FAQItem[] = [
    {
        question: "Combien de temps prend l'intégration sur mon site ?",
        answer:
            "Quelques minutes. Tu crées ton agent, tu configures son nom, son domaine et ta FAQ, puis tu copies un script à coller dans ton site. Aucune compétence technique poussée n'est nécessaire.",
    },
    {
        question: "Est-ce que je peux utiliser SmartBot si mon site est fait avec WordPress, Shopify ou autre ?",
        answer:
            "Oui. Le script fonctionne sur n'importe quel site capable d'accueillir une balise <script> : WordPress, Shopify, Wix, un site fait sur mesure, etc.",
    },
    {
        question: "Mes données et celles de mes clients sont-elles en sécurité ?",
        answer:
            "Tes données sont hébergées de manière sécurisée et ne sont jamais partagées avec d'autres comptes. Tu restes propriétaire de ta base de FAQ et des conversations générées par ton agent.",
    },
    {
        question: "L'agent répond-il en français et dans nos expressions locales ?",
        answer:
            "Oui, l'agent est conçu pour répondre naturellement en français. Tu peux aussi ajuster son ton et son style pour qu'il colle à la voix de ta marque.",
    },
    {
        question: "Que se passe-t-il si l'agent ne connaît pas la réponse ?",
        answer:
            "Il le dit clairement plutôt que d'inventer une réponse, et peut rediriger le visiteur vers un contact humain ou un canal de ton choix (WhatsApp, email, téléphone).",
    },
    {
        question: "Puis-je changer de forfait ou arrêter à tout moment ?",
        answer:
            "Oui, tu peux changer de forfait ou résilier depuis ton tableau de bord à tout moment, sans engagement de durée.",
    },
];

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="px-4 py-4">
            <div className="rounded-[40px] bg-zinc-50 px-6 py-12 sm:px-10 sm:py-14">
                <div className="mx-auto max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-10 text-center"
                    >
                        <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-medium text-zinc-600 shadow-sm">
                            Questions fréquentes
                        </span>

                        <h2 className="mt-4 text-2xl sm:text-3xl font-black tracking-tight text-black">
                            Comme si tu discutais déjà avec ton agent
                        </h2>
                    </motion.div>

                    <div className="grid sm:grid-cols-2 gap-3">
                        {faqs.map((faq, index) => {
                            const isOpen = openIndex === index;

                            return (
                                <motion.div
                                    key={faq.question}
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.3 }}
                                    transition={{ duration: 0.4, delay: index * 0.04 }}
                                    className="rounded-3xl border border-zinc-200 bg-white overflow-hidden self-start"
                                >
                                    {/* "Message" de l'utilisateur = la question, cliquable */}
                                    <button
                                        onClick={() => setOpenIndex(isOpen ? null : index)}
                                        className="w-full flex items-center gap-3 px-5 py-4 text-left"
                                        aria-expanded={isOpen}
                                    >
                                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black text-white">
                                            <User size={14} />
                                        </span>

                                        <span className="flex-1 text-sm sm:text-[15px] font-medium text-black">
                                            {faq.question}
                                        </span>

                                        <motion.span
                                            animate={{ rotate: isOpen ? 45 : 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-zinc-500"
                                        >
                                            <Plus size={14} />
                                        </motion.span>
                                    </button>

                                    {/* "Réponse" de l'agent */}
                                    <AnimatePresence initial={false}>
                                        {isOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                                className="overflow-hidden"
                                            >
                                                <div className="flex items-start gap-3 px-5 pb-5">
                                                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-zinc-500">
                                                        <Bot size={14} />
                                                    </span>

                                                    <p className="flex-1 rounded-2xl rounded-tl-sm bg-zinc-50 px-4 py-3 text-sm leading-relaxed text-zinc-600">
                                                        {faq.answer}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}