import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

type MockupType = "today" | "messages" | "faq";

const steps: {
    title: string;
    description: string;
    mockup: MockupType;
}[] = [
        {
            title: "Accueillez chaque visiteur dès son arrivée",
            description:
                "Un message d'accueil personnalisé, affiché instantanément à l'ouverture du chat.",
            mockup: "today",
        },
        {
            title: "Répondez dans la langue du visiteur",
            description:
                "Votre FAQ reste en français, l'agent s'adapte automatiquement à celle du visiteur.",
            mockup: "messages",
        },
        {
            title: "Automatisez vos FAQ avec l'IA",
            description:
                "Donnez à vos visiteurs une réponse claire et instantanée, générée à partir de votre FAQ.",
            mockup: "faq",
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
            ease: "easeOut" as const,
        },
    },
};



function MockupToday() {
    return (
        <div className="bg-white rounded-2xl p-4 h-full flex flex-col gap-3 shadow-sm">

            <div className="flex justify-between items-center">
                <span className="text-xs font-semibold text-zinc-800">
                    Aujourd'hui
                </span>

                <span className="text-[10px] text-zinc-400">
                    24 visiteurs
                </span>
            </div>


            <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center">
                    👋
                </div>

                <div>
                    <p className="text-[11px] font-medium text-zinc-800">
                        Nouveau visiteur
                    </p>

                    <p className="text-[10px] text-zinc-400">
                        Il y a 2 minutes
                    </p>
                </div>
            </div>


            <div className="mt-auto bg-zinc-50 rounded-xl p-3">
                <p className="text-[11px] text-zinc-600">
                    Bonjour 👋 Comment puis-je vous aider aujourd'hui ?
                </p>
            </div>

        </div>
    );
}



function MockupMessages() {
    return (
        <div className="bg-white rounded-2xl p-4 h-full flex flex-col gap-3 shadow-sm">

            <div className="flex justify-between items-center">
                <span className="text-xs font-semibold text-zinc-800">
                    Conversation
                </span>

                <span className="text-[10px] text-emerald-500">
                    ● En ligne
                </span>
            </div>


            <div className="flex gap-2">
                <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-xs">
                    👤
                </div>

                <div className="bg-zinc-100 rounded-xl px-3 py-2">
                    <p className="text-[10px] text-zinc-700">
                        Bonjour, livrez-vous à Porto-Novo ?
                    </p>
                </div>
            </div>



            <div className="flex gap-2 justify-end">

                <div className="bg-zinc-900 rounded-xl px-3 py-2">
                    <p className="text-[10px] text-white">
                        Oui, livraison disponible 🚀
                    </p>
                </div>


                <div className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center">
                    🤖
                </div>

            </div>


            <div className="mt-auto rounded-full border border-zinc-200 px-3 py-2">
                <p className="text-[10px] text-zinc-400">
                    Écrivez votre message...
                </p>
            </div>

        </div>
    );
}



function MockupFaq() {
    return (
        <div className="bg-white rounded-2xl p-4 h-full flex flex-col gap-3 shadow-sm">


            <div className="flex justify-between items-center">

                <span className="text-xs font-semibold text-zinc-800">
                    Base FAQ IA
                </span>


                <span className="text-[10px] bg-emerald-50 text-emerald-600 px-2 py-1 rounded-full">
                    Active
                </span>

            </div>



            <div className="bg-zinc-50 rounded-xl p-3">

                <p className="text-[11px] font-semibold text-zinc-800">
                    Question
                </p>

                <p className="text-[10px] text-zinc-500 mt-1">
                    Quels sont vos délais de livraison ?
                </p>

            </div>



            <div className="bg-emerald-50 rounded-xl p-3">

                <p className="text-[11px] font-semibold text-emerald-700">
                    Réponse IA
                </p>


                <p className="text-[10px] text-zinc-600 mt-1">
                    Livraison sous 24 à 48h partout au Bénin.
                </p>

            </div>


        </div>
    );
}



const mockups: Record<MockupType, React.FC> = {
    today: MockupToday,
    messages: MockupMessages,
    faq: MockupFaq,
};



export default function HowItWorksSection() {

    return (

        <section className="bg-[#F6F6F6] px-3 py-24">

            <div className="max-w-[1600px] mx-auto">


                <motion.div
                    initial={{ y: 40, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center max-w-xl mx-auto"
                >

                    <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-zinc-900">
                        De l'accueil à la réponse, sans effort
                    </h2>


                    <p className="mt-4 text-zinc-500 text-lg">
                        Démarrez avec des automatisations prêtes à l'emploi, ou construisez les vôtres.
                    </p>


                </motion.div>



                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.3 }}
                    className="grid md:grid-cols-3 gap-6 mt-16"
                >


                    {steps.map((step) => {

                        const Mockup = mockups[step.mockup];


                        return (

                            <motion.div
                                key={step.title}
                                variants={item}
                                whileHover={{ y: -6 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 20
                                }}
                                className="rounded-[32px] bg-zinc-100 p-4"
                            >


                                <div className="h-40 mb-6">
                                    <Mockup />
                                </div>


                                <h3 className="text-lg font-bold text-zinc-900 leading-snug">
                                    {step.title}
                                </h3>


                                <p className="mt-2 text-sm text-zinc-500 leading-relaxed">
                                    {step.description}
                                </p>


                            </motion.div>

                        );

                    })}


                </motion.div>


            </div>

        </section>

    );
}