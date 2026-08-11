import { motion } from "framer-motion";
import { Bot } from "lucide-react";

import type { AgentForm } from "./types";

interface Props {
    form: AgentForm;
}

export default function WidgetPreview({ form }: Props) {
    const firstFaq = form.faq.find((item) => item.q.trim());

    return (
        <div>
            <div className="flex items-center gap-1.5 text-xs uppercase tracking-wide text-[#6B6459] mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2F6F5E] animate-pulse" />
                Aperçu en direct
            </div>

            <div className="rounded-3xl border border-[#EDEAE3] bg-gradient-to-b from-[#FDFCFA] to-white p-6 h-[420px] relative flex flex-col justify-end overflow-hidden">
                {/* ambient glow derrière le mockup */}
                <div
                    className="absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl opacity-[0.10] pointer-events-none"
                    style={{ backgroundColor: form.couleur }}
                />

                <motion.div
                    layout
                    className="rounded-2xl overflow-hidden border border-black/5 shadow-lg relative bg-white"
                >
                    <div
                        className="flex items-center gap-2.5 px-4 py-3"
                        style={{ backgroundColor: form.couleur }}
                    >
                        <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center overflow-hidden shrink-0">
                            {form.iconeUrl ? (
                                <img src={form.iconeUrl} alt="" className="w-full h-full object-cover" />
                            ) : (
                                <Bot size={15} className="text-white" />
                            )}
                        </div>

                        <span className="text-sm font-medium text-white truncate">
                            {form.botName || "Votre bot"}
                        </span>
                    </div>

                    <div className="p-4 flex flex-col gap-2">
                        <div className="bg-[#F6F4EF] rounded-xl rounded-tl-sm px-3.5 py-2.5 text-xs leading-relaxed text-[#14171F] max-w-[85%]">
                            {form.description
                                ? `Bonjour 👋 ${form.description.slice(0, 80)}${form.description.length > 80 ? "..." : ""
                                }`
                                : "Bonjour 👋 Configurez votre activité."}
                        </div>

                        {firstFaq && (
                            <div
                                className="self-end rounded-xl rounded-tr-sm px-3.5 py-2.5 text-xs leading-relaxed text-white max-w-[85%]"
                                style={{ backgroundColor: form.couleur }}
                            >
                                {firstFaq.q}
                            </div>
                        )}
                    </div>
                </motion.div>

                <motion.div
                    layout
                    className={`absolute bottom-5 w-11 h-11 rounded-full flex items-center justify-center shadow-lg overflow-hidden ${form.position === "bas-gauche" ? "left-5" : "right-5"
                        }`}
                    style={{ backgroundColor: form.couleur }}
                >
                    {form.iconeUrl ? (
                        <img src={form.iconeUrl} alt="" className="w-full h-full object-cover" />
                    ) : (
                        <Bot size={18} className="text-white" />
                    )}
                </motion.div>
            </div>

            <p className="text-xs text-[#6B6459] mt-3 text-center lg:text-left">
                Cet aperçu se met à jour automatiquement.
            </p>
        </div>
    );
}