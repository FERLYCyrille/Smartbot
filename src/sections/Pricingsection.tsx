import { motion } from "framer-motion";
import { Check, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

type Plan = {
    name: string;
    price: string;
    period: string;
    description: string;
    features: string[];
    cta: string;
    highlighted?: boolean;
};

// Montants indicatifs pour le marché béninois — à ajuster selon tes coûts
// réels (tokens API, hébergement) et ce que tes premiers clients acceptent.
const plans: Plan[] = [
    {
        name: "Starter",
        price: "15 000",
        period: "FCFA / mois",
        description: "Pour tester Kadi sur un premier site, sans engagement.",
        features: [
            "1 agent",
            "500 conversations / mois",
            "FAQ jusqu'à 20 questions",
            "Intégration en un script",
            "Badge « Propulsé par SmartBot »",
        ],
        cta: "Commencer",
    },
    {
        name: "Pro",
        price: "35 000",
        period: "FCFA / mois",
        description: "Pour une entreprise avec un vrai flux de visiteurs à gérer.",
        features: [
            "3 agents",
            "3 000 conversations / mois",
            "FAQ illimitée",
            "Personnalisation du style et du ton",
            "Sans badge SmartBot",
            "Support par WhatsApp",
        ],
        cta: "Choisir Pro",
        highlighted: true,
    },
    {
        name: "Business",
        price: "Sur devis",
        period: "",
        description: "Pour plusieurs sites, une équipe, ou des besoins spécifiques.",
        features: [
            "Agents illimités",
            "Conversations illimitées",
            "Prise de rendez-vous intégrée",
            "Multi-sites et multi-marques",
            "Support prioritaire dédié",
        ],
        cta: "Nous contacter",
    },
];

export default function PricingSection() {
    return (
        <section className="px-4 py-4">
            <div className="rounded-[40px] bg-zinc-50 px-6 py-12 sm:px-10 sm:py-14">
                <div className="mx-auto max-w-6xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-10 text-center max-w-xl mx-auto"
                    >
                        <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-medium text-zinc-600 shadow-sm">
                            Tarifs
                        </span>

                        <h2 className="mt-4 text-2xl sm:text-3xl font-black tracking-tight text-black">
                            Un prix pensé pour les entreprises d'ici
                        </h2>

                        <p className="mt-3 text-sm text-zinc-500">
                            Sans engagement. Change de plan ou arrête à tout moment depuis ton tableau de bord.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
                        {plans.map((plan, index) => (
                            <motion.div
                                key={plan.name}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.5, delay: index * 0.08 }}
                                className={`relative flex flex-col rounded-[28px] p-7 ${plan.highlighted
                                    ? "bg-black text-white md:-translate-y-3 shadow-xl"
                                    : "bg-white text-black border border-zinc-200"
                                    }`}
                            >
                                {plan.highlighted && (
                                    <span className="absolute -top-3 left-7 rounded-full bg-white text-black text-[11px] font-semibold px-3 py-1 shadow">
                                        Le plus choisi
                                    </span>
                                )}

                                <h3 className="text-lg font-semibold">{plan.name}</h3>

                                <p
                                    className={`mt-2 text-sm ${plan.highlighted ? "text-zinc-300" : "text-zinc-500"
                                        }`}
                                >
                                    {plan.description}
                                </p>

                                <div className="mt-6 flex items-end gap-2">
                                    <span className="text-3xl font-black tracking-tight">
                                        {plan.price}
                                    </span>
                                    {plan.period && (
                                        <span
                                            className={`pb-1 text-xs ${plan.highlighted ? "text-zinc-400" : "text-zinc-500"
                                                }`}
                                        >
                                            {plan.period}
                                        </span>
                                    )}
                                </div>

                                <ul className="mt-7 flex flex-col gap-3 flex-1">
                                    {plan.features.map((feature) => (
                                        <li key={feature} className="flex items-start gap-2 text-sm">
                                            <span
                                                className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${plan.highlighted
                                                    ? "bg-white text-black"
                                                    : "bg-zinc-100 text-zinc-600"
                                                    }`}
                                            >
                                                <Check size={10} strokeWidth={3} />
                                            </span>
                                            <span className={plan.highlighted ? "text-zinc-200" : "text-zinc-600"}>
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                <Link
                                    to="/login"
                                    className={`mt-8 inline-flex items-center justify-between gap-2 rounded-full px-5 py-3 text-sm font-medium transition hover:scale-[1.02] ${plan.highlighted
                                        ? "bg-white text-black"
                                        : "bg-black text-white"
                                        }`}
                                >
                                    {plan.cta}
                                    <span
                                        className={`flex h-6 w-6 items-center justify-center rounded-full ${plan.highlighted ? "bg-black text-white" : "bg-white text-black"
                                            }`}
                                    >
                                        <ArrowUpRight size={13} strokeWidth={2.5} />
                                    </span>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}