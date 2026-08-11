import { Cloud, Radio, Layers } from "lucide-react";

const TECHS = [
    { name: "React", icon: "⚛️" },
    { name: "Next.js", icon: "▲" },
    { name: "Django", icon: "🐍" },
];

export default function EcosystemSection() {
    return (
        <section className="bg-[#F6F6F6] px-3 py-16">
            <div className="max-w-[1600px] mx-auto">
                <div className="rounded-[32px] sm:rounded-[40px] overflow-hidden bg-gradient-to-br from-[#F4F1FF] via-[#FBFAFF] to-[#FFF9F0] p-6 sm:p-10 lg:p-14">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-6">
                        {/* TEXTE + LOGOS */}
                        <div className="lg:flex-1 lg:max-w-[360px]">
                            {/* badges flottants — en ligne sur mobile, repositionnés en absolu sur desktop si besoin */}
                            <div className="flex flex-wrap gap-2 mb-6 lg:mb-10">
                                <Badge icon={<Cloud size={12} />} label="Serveur Cloud" color="#22C55E" />
                                <Badge icon={<Radio size={12} />} label="Suivi en direct" color="#F59E0B" />
                            </div>

                            <h2 className="text-2xl sm:text-3xl font-semibold text-[#14171F] leading-tight">
                                Une solution intégrable
                                <br />
                                sur <span className="text-[#6D5FEB]">plusieurs plateformes</span>
                            </h2>

                            <p className="text-sm text-[#6B6459] mt-3 leading-relaxed">
                                Que vous utilisiez React, Vue.js, Django ou d'autres technologies, notre solution
                                s'adapte facilement à votre stack.
                            </p>

                            <div className="flex flex-wrap items-center gap-2 mt-5">
                                {TECHS.map((t) => (
                                    <span
                                        key={t.name}
                                        className="flex items-center gap-1.5 bg-white border border-[#EDEAE3] rounded-full px-3 py-1.5 text-xs font-medium text-[#14171F]"
                                    >
                                        <span>{t.icon}</span>
                                        {t.name}
                                    </span>
                                ))}
                                <span className="text-xs text-[#9B9284] px-2">15+ plus encore</span>
                            </div>
                        </div>

                        {/* ROBOT */}
                        <div className="flex justify-center lg:flex-1">
                            <img
                                src="/robot.png"
                                alt="Assistant robot"
                                className="w-32 h-32 sm:w-40 sm:h-40 lg:w-52 lg:h-52 object-contain drop-shadow-xl"
                            />
                        </div>

                        {/* CARTE MULTI-PLATEFORME */}
                        <div className="lg:flex-1 lg:max-w-[220px] lg:self-end">
                            <div className="bg-white border border-[#EDEAE3] rounded-2xl p-4 flex items-start gap-3 shadow-sm">
                                <div className="w-8 h-8 rounded-full bg-[#F1EFEA] flex items-center justify-center shrink-0">
                                    <Layers size={15} className="text-[#6D5FEB]" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-[#14171F]">Multi-plateforme</p>
                                    <p className="text-xs text-[#9B9284] mt-0.5 leading-relaxed">
                                        Intégration rapide, performance optimale, expérience unifiée.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function Badge({
    icon,
    label,
    color,
}: {
    icon: React.ReactNode;
    label: string;
    color: string;
}) {
    return (
        <span className="flex items-center gap-1.5 bg-white border border-[#EDEAE3] rounded-full pl-2 pr-3 py-1.5 text-xs font-medium text-[#14171F] shadow-sm">
            <span
                className="w-4 h-4 rounded-full flex items-center justify-center text-white"
                style={{ backgroundColor: color }}
            >
                {icon}
            </span>
            {label}
        </span>
    );
}