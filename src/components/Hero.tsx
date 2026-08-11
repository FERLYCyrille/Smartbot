import { motion } from "framer-motion";
import Navbar from "./Navbar";
import ChatMockup from "./ChatPreview";
import robot from "../assets/robot.png";
import { Link } from "react-router-dom";
export default function Hero() {
    return (
        <section className="min-h-screen bg-[#F6F6F6] px-3 py-4">
            <div className="max-w-[1600px] mx-auto flex flex-col gap-10">

                {/* TOP BANNER */}
                <motion.div
                    initial={{ y: -40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="
        relative
        rounded-[40px]
        bg-gradient-to-br from-zinc-300 via-zinc-200 to-zinc-300
        overflow-hidden
        h-[380px]
        lg:h-[420px]
    "
                >
                    <Navbar />

                    {/* LOGO / NOM DU SITE — visible uniquement sur mobile & tablette */}
                    <div className="lg:hidden absolute top-5 left-5 z-20">
                        <span className="text-white font-black text-xl tracking-tight flex items-baseline">
                            SMARTBOT
                            <sup className="text-[10px] ml-0.5">®</sup>
                        </span>
                    </div>

                    {/* BIG TEXT — desktop uniquement : le pl-[420px] n'a de sens qu'à côté du robot en grand format */}
                    <div className="hidden lg:flex absolute inset-0 items-center pl-[420px]">
                        <motion.h1
                            initial={{ x: -150, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                            className="
                text-white
                font-black
                text-9xl
                lg:text-[10rem]
                tracking-tight
                flex
                items-baseline
            "
                        >
                            SMARTBOT
                            <sup className="text-4xl lg:text-5xl ml-1">®</sup>
                        </motion.h1>
                    </div>

                    {/* ROBOT */}
                    <motion.img
                        src={robot}
                        alt="Smart robot"
                        initial={{ x: -300, opacity: 0 }}
                        animate={{
                            x: 0,
                            opacity: 1,
                        }}
                        transition={{
                            duration: 1.4,
                            ease: "easeOut",
                        }}
                        className="
              absolute
              bottom-0
              left-1/2
              -translate-x-1/2
              lg:left-6
              lg:translate-x-0
              h-full
              w-auto
              object-contain
              z-10
            "
                    />
                </motion.div>

                {/* BOTTOM CONTENT */}
                <div className="grid lg:grid-cols-2 gap-10 items-center px-2">

                    <div>
                        <motion.h2
                            initial={{ y: 60, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="
                text-4xl
                lg:text-5xl
                font-bold
                tracking-tight
                max-w-lg
                text-zinc-900
              "

                        >
                            Votre FAQ devient un agent qui répond vraiment
                        </motion.h2>

                        <motion.p
                            initial={{ y: 40, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="mt-6 text-zinc-500 text-lg max-w-md leading-relaxed"
                        >
                            Configurez votre agent en quelques minutes et intégrez-le sur
                            n'importe quel site — React, WordPress ou HTML classique.
                        </motion.p>

                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="flex items-center gap-6 mt-8"
                        >
                            <Link
                                to="/login"
                                className="
        bg-black
        text-white
        rounded-full
        pl-6
        pr-2
        py-2
        flex
        items-center
        gap-3
        hover:scale-105
        transition
    "
                            >
                                Créer mon agent

                                <span className="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center">
                                    →
                                </span>
                            </Link>


                        </motion.div>
                    </div>

                    <div className="flex justify-center lg:justify-end">
                        <ChatMockup />
                    </div>
                </div>
            </div>
        </section>
    );
}