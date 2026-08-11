import { motion } from "framer-motion";


export default function Footer() {
    return (
        <footer className="px-4 pb-4">
            <motion.div
                initial={{ opacity: 0, y: 120 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="relative overflow-hidden rounded-[32px] bg-[#1f1f22] text-white"
            >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12 px-6 py-10 sm:px-10 sm:py-14">
                    {/* Company */}
                    <div>
                        <h4 className="font-semibold mb-5">Entreprise</h4>

                        <ul className="space-y-3 text-sm text-zinc-400">
                            <li>À propos</li>
                            <li>Carrières</li>
                            <li>Presse</li>
                            <li>Nous contacter</li>
                            <li>Statut du système</li>
                        </ul>


                    </div>

                    {/* Products */}
                    <div>
                        <h4 className="font-semibold mb-5">Produit</h4>

                        <ul className="space-y-3 text-sm text-zinc-400">
                            <li>
                                <a href="#comment-ca-marche" className="hover:text-white transition">
                                    Widget de chat
                                </a>
                            </li>
                            <li>
                                <a href="#plateformes" className="hover:text-white transition">
                                    Intégrations
                                </a>
                            </li>
                            <li>
                                <a href="#faq" className="hover:text-white transition">
                                    FAQ automatique
                                </a>
                            </li>
                            <li>
                                <a href="#temoignages" className="hover:text-white transition">
                                    Témoignages
                                </a>
                            </li>
                            <li>
                                <a href="#pricing" className="hover:text-white transition">
                                    Tarifs
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>

                        {/* Robot — visible ici uniquement sur mobile/tablette, dans le flux normal */}
                        <img
                            src="/robot.png"
                            alt="Robot"
                            className="lg:hidden mx-auto mt-8 w-[140px] sm:w-[180px] opacity-90"
                        />
                    </div>
                </div>

                {/* Robot — flottant en absolu, desktop uniquement */}
                <motion.img
                    initial={{ opacity: 0, scale: 0.7 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    src="/robot.png"
                    alt="Robot"
                    className="hidden lg:block absolute right-16 bottom-20 w-[220px] xl:w-[280px] z-20"
                />

                {/* BIG TEXT */}
                <div className="relative px-4 sm:px-8 md:px-12 mt-4 lg:mt-0">
                    <h2
                        className="font-black leading-none tracking-tight text-white select-none whitespace-nowrap"
                        style={{ fontSize: "clamp(44px, 16vw, 160px)" }}
                    >
                        SMARTBOT
                    </h2>
                </div>

                {/* Bottom */}
                <div className="flex flex-col md:flex-row gap-3 md:gap-0 md:justify-between border-t border-zinc-800 px-6 py-6 sm:px-10 text-xs text-zinc-500">
                    <div className="flex flex-wrap gap-x-8 gap-y-2">
                        <span>Conditions d'utilisation</span>
                        <span>Politique de confidentialité</span>
                    </div>

                    <span>© 2026, SmartBot. Tous droits réservés.</span>
                </div>
            </motion.div>
        </footer>
    );
}

