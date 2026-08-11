import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";

type Testimonial = {
    quote: string;
    name: string;
    role: string;
    business: string;
    tag: string;
    stat: { value: string; label: string };
};

// TODO: remplacer par tes vrais premiers clients dès que tu as des retours écrits.
// Structure volontairement courte (1 quote + 1 stat) pour rester crédible sans
// avoir besoin de longs paragraphes de témoignage.
const testimonials: Testimonial[] = [
    {
        quote:
            "On recevait les mêmes questions sur nos horaires et nos prix toute la journée. Depuis Kadi, l'agent y répond avant même qu'on ouvre WhatsApp.",
        name: "Fadilath A.",
        role: "Gérante",
        business: "Boutique en ligne, Cotonou",
        tag: "E-commerce",
        stat: { value: "-40%", label: "de messages répétitifs" },
    },
    {
        quote:
            "L'intégration a pris moins d'une heure. J'ai copié le script, configuré la FAQ, et le chatbot était déjà sur le site pendant que je testais encore.",
        name: "Marcellin D.",
        role: "Fondateur",
        business: "Cabinet de conseil, Abomey-Calavi",
        tag: "Services",
        stat: { value: "< 1h", label: "de mise en place" },
    },
    {
        quote:
            "Nos clients écrivent souvent en dehors des heures d'ouverture. Maintenant ils ont une réponse tout de suite, et nous le résumé le lendemain matin.",
        name: "Rosine K.",
        role: "Responsable relation client",
        business: "Agence immobilière, Porto-Novo",
        tag: "Immobilier",
        stat: { value: "24/7", label: "de disponibilité" },
    },
];

const container = {
    hidden: {},
    show: {
        transition: { staggerChildren: 0.12 },
    },
};

const item = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function TestimonialsSection() {
    return (
        <section className="px-4 py-4">
            <div className="rounded-[40px] bg-zinc-50 px-6 py-12 sm:px-10 sm:py-14">
                <div className="mx-auto max-w-6xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
                    >
                        <div className="max-w-xl">
                            <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-medium text-zinc-600 shadow-sm">
                                <MessageSquare size={12} />
                                Ce que ça change, concrètement
                            </span>

                            <h2 className="mt-4 text-2xl sm:text-3xl font-black tracking-tight text-black">
                                Des entreprises qui ne répondent plus deux fois à la même question
                            </h2>
                        </div>
                    </motion.div>

                    <motion.div
                        variants={container}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.2 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-4"
                    >
                        {testimonials.map((t) => (
                            <motion.article
                                key={t.name}
                                variants={item}
                                className="group relative flex flex-col justify-between rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="rounded-full bg-black text-white text-[11px] font-medium px-3 py-1">
                                            {t.tag}
                                        </span>

                                        {/* petite bulle façon widget de chat, clin d'œil au produit */}
                                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-100 text-zinc-400 group-hover:bg-black group-hover:text-white transition-colors">
                                            <MessageSquare size={13} />
                                        </span>
                                    </div>

                                    <p className="text-sm leading-relaxed text-zinc-700">
                                        « {t.quote} »
                                    </p>
                                </div>

                                <div className="mt-6 flex items-end justify-between">
                                    <div>
                                        <p className="text-sm font-semibold text-black">{t.name}</p>
                                        <p className="text-xs text-zinc-500">
                                            {t.role} · {t.business}
                                        </p>
                                    </div>

                                    <div className="text-right">
                                        <p className="text-lg font-black text-black leading-none">
                                            {t.stat.value}
                                        </p>
                                        <p className="text-[11px] text-zinc-500 mt-1 max-w-[80px]">
                                            {t.stat.label}
                                        </p>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}