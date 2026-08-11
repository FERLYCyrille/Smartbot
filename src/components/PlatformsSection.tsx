import { motion } from "framer-motion";
import { Code2, Globe } from "lucide-react";
import { Link } from "react-router-dom";
const platforms = [
    {
        name: "React",
        description:
            "Intégrez le widget dans n'importe quelle app React, sans configuration supplémentaire.",
        bg: "bg-pink-100",
        icon: Code2,
    },
    {
        name: "WordPress",
        description:
            "Collez la balise dans votre thème ou un plugin, sans toucher au code existant.",
        bg: "bg-cyan-100",
        icon: Globe,
    },
];

export default function PlatformsSection() {
    const MotionLink = motion(Link);
    return (
        <section className="bg-[#F6F6F6] px-3 py-24">
            <div className="max-w-[1600px] mx-auto grid lg:grid-cols-3 gap-10 items-center">

                {/* LEFT TEXT */}
                <motion.div
                    initial={{ x: -60, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-zinc-900 leading-tight">
                        Disponible partout où vivent vos visiteurs.
                    </h2>

                    <p className="mt-6 text-zinc-500 text-lg leading-relaxed max-w-md">
                        Une seule balise à intégrer, quel que soit le framework ou le CMS
                        derrière votre site.
                    </p>

                    <MotionLink
                        to="/login"
                        whileHover={{ scale: 1.05 }}
                        className="
        mt-8
        bg-black
        text-white
        rounded-full
        pl-6
        pr-2
        py-2
        flex
        items-center
        gap-3
        w-fit
    "
                    >
                        Créer mon agent

                        <span className="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center">
                            →
                        </span>
                    </MotionLink>
                </motion.div>

                {/* PLATFORM CARDS */}
                {platforms.map((platform, i) => (
                    <motion.div
                        key={platform.name}
                        initial={{ y: 50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2 + i * 0.15 }}
                        whileHover={{ y: -6 }}
                        className="rounded-[32px] bg-white border border-zinc-100 p-8 flex flex-col gap-8 min-h-[280px]"
                    >
                        <div>
                            <h3 className="text-xl font-bold text-zinc-900">
                                {platform.name}
                            </h3>
                            <p className="mt-2 text-sm text-zinc-500 leading-relaxed">
                                {platform.description}
                            </p>
                        </div>

                        <div
                            className={`
                ${platform.bg}
                rounded-2xl
                flex-1
                flex
                items-center
                justify-center
                min-h-[120px]
              `}
                        >
                            <platform.icon size={40} strokeWidth={1.5} className="text-zinc-900" />
                        </div>
                    </motion.div>
                ))}

            </div>
        </section>
    );
}