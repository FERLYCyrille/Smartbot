import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
export default function CTASection() {
    return (
        <motion.section
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="px-6 py-24"
        >
            <div className="mx-auto max-w-6xl rounded-3xl bg-[#9c9ca7] px-8 py-20 text-center">
                <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                    Répondez à vos visiteurs avec
                    <br />
                    une automatisation intelligente
                </h2>

                <p className="mt-6 text-white/80 max-w-xl mx-auto">
                    Configurez votre agent en quelques minutes et laissez-le répondre pour vous,
                    jour et nuit.
                </p>

                <Link to="/login" className="mt-10 inline-flex items-center gap-3 rounded-full bg-black px-7 py-4 text-white shadow-lg">
                    Créer mon agent

                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black">
                        <ArrowRight size={16} />
                    </span>
                </Link>
            </div>
        </motion.section>
    );
}