import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

const cards = [
    {
        number: "01/",
        title: "Configurer votre agent",
        description:
            "Décrivez votre activité et ajoutez vos questions fréquentes en quelques minutes.",
        highlighted: false,
    },
    {
        number: "02/",
        title: "Intégrer en une balise",
        description:
            "Copiez un seul script dans votre site, quel que soit le framework utilisé.",
        highlighted: true,
    },
    {
        number: "03/",
        title: "Faire grandir votre FAQ",
        description:
            "Consultez chaque jour les questions sans réponse et enrichissez votre agent.",
        highlighted: false,
    },
];

const container: Variants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const item: Variants = {
    hidden: {
        y: 40,
        opacity: 0,
    },
    show: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.6,
            ease: "easeOut",
        },
    },
};

export default function FeaturesSection() {
    return (
        <section className="bg-[#F6F6F6] px-3 py-24">
            <div className="max-w-[1600px] mx-auto">

                {/* HEADER */}
                <motion.div
                    initial={{ y: 40, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center max-w-2xl mx-auto"
                >
                    <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-zinc-900">
                        Trois étapes, dans cet ordre
                    </h2>
                    <p className="mt-4 text-zinc-500 text-lg leading-relaxed">
                        Aucune ligne de code n'est nécessaire pour configurer, intégrer et
                        faire progresser votre agent au fil des jours.
                    </p>
                </motion.div>

                {/* CARDS */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.3 }}
                    className="grid md:grid-cols-3 gap-6 mt-16"
                >
                    {cards.map((card) => (
                        <motion.div
                            key={card.title}
                            variants={item}
                            whileHover={{ y: -6 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className={`
                rounded-[32px]
                p-8
                min-h-[220px]
                flex
                flex-col
                justify-between
                ${card.highlighted
                                    ? "bg-zinc-500 text-white md:-translate-y-6 shadow-xl"
                                    : "bg-white text-zinc-900 border border-zinc-100"
                                }
              `}
                        >
                            <span
                                className={`text-sm font-medium ${card.highlighted ? "text-zinc-200" : "text-zinc-400"
                                    }`}
                            >
                                {card.number}
                            </span>

                            <div className="mt-8">
                                <h3 className="text-2xl font-bold tracking-tight">
                                    {card.title}
                                </h3>
                                <p
                                    className={`mt-3 text-sm leading-relaxed ${card.highlighted ? "text-zinc-200" : "text-zinc-500"
                                        }`}
                                >
                                    {card.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

            </div>
        </section>
    );
}