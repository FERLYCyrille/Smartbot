import { motion } from "framer-motion";
import { Send, Heart } from "lucide-react";

export default function ChatMockup() {
    return (
        <motion.div
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="rounded-3xl bg-zinc-50 border border-zinc-100 p-6 w-full max-w-md shadow-sm"
        >
            <h3 className="text-lg font-semibold text-zinc-900 mb-6">
                Chat
            </h3>

            <div className="space-y-5">
                {/* Message utilisateur */}
                <div className="flex items-start gap-3">
                    <div className="flex-1 bg-zinc-200 rounded-2xl px-4 py-3">
                        <p className="text-sm text-zinc-800">
                            Salut 👋 Comment puis-je vous aider aujourd'hui ?
                        </p>
                    </div>

                    <div className="w-10 h-10 rounded-full bg-zinc-300 shrink-0" />
                </div>

                {/* Reactions */}
                <div className="flex gap-3 text-xl pl-2">
                    <span>😀</span>
                    <span>❤️</span>
                    <span>😂</span>
                    <span>👍</span>
                </div>

                {/* Réponse bot */}
                <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-400 shrink-0" />

                    <div className="flex-1 bg-emerald-50 rounded-2xl px-4 py-3">
                        <p className="text-sm text-zinc-800">
                            Notre assistant IA répond instantanément à vos
                            clients sur WhatsApp, Messenger et votre site web.
                        </p>
                    </div>
                </div>

                {/* Message utilisateur */}
                <div className="flex justify-end items-start gap-3">
                    <div className="max-w-[75%] bg-zinc-200 rounded-2xl px-4 py-3">
                        <p className="text-sm text-zinc-800">
                            Est-il compatible avec React et Django ?
                        </p>
                    </div>

                    <div className="w-10 h-10 rounded-full bg-zinc-300 shrink-0" />
                </div>

                {/* Like */}
                <div className="flex justify-end items-center gap-2">
                    <span className="flex items-center gap-1 text-sm text-rose-500 font-medium">
                        <Heart size={14} className="fill-rose-500" />
                        Liked
                    </span>
                </div>
            </div>

            {/* Input */}
            <div className="mt-6 flex items-center gap-3 rounded-full bg-white border border-zinc-200 pl-4 pr-1.5 py-1.5">
                <span className="flex-1 text-sm text-zinc-400">
                    Écrivez votre message...
                </span>

                <button className="bg-black text-white rounded-full w-10 h-10 flex items-center justify-center">
                    <Send size={16} />
                </button>
            </div>
        </motion.div>
    );
}