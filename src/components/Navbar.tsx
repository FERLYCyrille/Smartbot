import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const links = [
    {
        label: "Comment ça marche",
        href: "#comment-ca-marche",
    },
    {
        label: "Fonctionnalités",
        href: "#fonctionnalites",
    },
    {
        label: "Cas d'usage",
        href: "#ecosysteme",
    },
    {
        label: "Tarifs",
        href: "#cta",
    },
];

export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <motion.nav
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="absolute top-4 right-4 left-4 sm:top-8 sm:right-8 sm:left-auto z-20"
        >
            {/* DESKTOP / TABLET */}
            <div className="hidden md:flex items-center gap-6 rounded-full bg-white/95 backdrop-blur shadow-lg px-6 py-3">
                {links.map((item) => (
                    <a
                        key={item.label}
                        href={item.href}
                        className="text-sm font-medium text-zinc-600 hover:text-black transition whitespace-nowrap"
                    >
                        {item.label}
                    </a>
                ))}

                <Link
                    to="/login"
                    className="
                        bg-black
                        text-white
                        rounded-full
                        pl-5
                        pr-2
                        py-2
                        flex
                        items-center
                        gap-2
                        text-sm
                        font-medium
                        hover:scale-105
                        transition
                    "
                >
                    Créer mon agent

                    <span className="bg-white text-black rounded-full w-6 h-6 flex items-center justify-center">
                        <ArrowUpRight size={14} strokeWidth={2.5} />
                    </span>
                </Link>
            </div>

            {/* MOBILE */}
            <div className="md:hidden flex justify-end">
                <button
                    onClick={() => setOpen(!open)}
                    className="bg-white/95 backdrop-blur shadow-lg rounded-full p-3 flex items-center justify-center"
                    aria-label="Toggle menu"
                >
                    {open ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25 }}
                        className="md:hidden mt-3 bg-white/95 backdrop-blur shadow-lg rounded-3xl p-4 flex flex-col gap-2"
                    >
                        {links.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                onClick={() => setOpen(false)}
                                className="text-sm font-medium text-zinc-600 hover:text-black transition py-2 px-2"
                            >
                                {item.label}
                            </a>
                        ))}

                        <Link
                            to="/login"
                            onClick={() => setOpen(false)}
                            className="
                                bg-black
                                text-white
                                rounded-full
                                pl-5
                                pr-2
                                py-2
                                flex
                                items-center
                                justify-between
                                gap-2
                                text-sm
                                font-medium
                                mt-2
                            "
                        >
                            Créer mon agent

                            <span className="bg-white text-black rounded-full w-6 h-6 flex items-center justify-center">
                                <ArrowUpRight size={14} strokeWidth={2.5} />
                            </span>
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}