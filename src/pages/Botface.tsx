import { motion } from "framer-motion";

type BotFaceProps = {
    variant: "lost" | "error";
};

const INK = "#14171F";
const PAPER = "#FBF9F4";
const EMERALD = "#2F6F5E";
const GOLD = "#C9A227";

export default function BotFace({ variant }: BotFaceProps) {
    const isError = variant === "error";

    return (
        <div className="relative mx-auto h-40 w-40 sm:h-48 sm:w-48">
            <motion.svg
                viewBox="0 0 200 200"
                className="h-full w-full"
                animate={isError ? { rotate: [0, -1.5, 1.5, -1, 0] } : { y: [0, -6, 0] }}
                transition={
                    isError
                        ? { duration: 0.5, repeat: Infinity, repeatDelay: 2.2, ease: "easeInOut" }
                        : { duration: 3.2, repeat: Infinity, ease: "easeInOut" }
                }
            >
                {/* antenne */}
                <motion.line
                    x1="100"
                    y1="30"
                    x2="100"
                    y2="14"
                    stroke={isError ? GOLD : EMERALD}
                    strokeWidth="3"
                    strokeLinecap="round"
                />
                <motion.circle
                    cx="100"
                    cy="10"
                    r="5"
                    fill={isError ? GOLD : EMERALD}
                    animate={
                        isError
                            ? { opacity: [1, 0.15, 1, 1, 0.15, 1] }
                            : { opacity: [1, 0.5, 1] }
                    }
                    transition={
                        isError
                            ? { duration: 1.6, repeat: Infinity, repeatDelay: 1.4 }
                            : { duration: 2.4, repeat: Infinity }
                    }
                />

                {/* tete */}
                <rect
                    x="30"
                    y="30"
                    width="140"
                    height="120"
                    rx="28"
                    fill={PAPER}
                    stroke={INK}
                    strokeWidth="3"
                />

                {/* yeux */}
                {isError ? (
                    <>
                        <path d="M64 78 L84 98 M84 78 L64 98" stroke={INK} strokeWidth="4" strokeLinecap="round" />
                        <path d="M116 78 L136 98 M136 78 L116 98" stroke={INK} strokeWidth="4" strokeLinecap="round" />
                    </>
                ) : (
                    <>
                        <motion.circle
                            cx="72"
                            cy="88"
                            r="8"
                            fill={INK}
                            animate={{ cx: [72, 78, 66, 72] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <motion.circle
                            cx="128"
                            cy="88"
                            r="8"
                            fill={INK}
                            animate={{ cx: [128, 134, 122, 128] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </>
                )}

                {/* bouche */}
                {isError ? (
                    <path d="M76 122 L92 116 L108 124 L124 116" fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" />
                ) : (
                    <path d="M80 118 Q100 110 120 118" fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" />
                )}
            </motion.svg>

            {/* effet glitch pour la page erreur serveur */}
            {isError && (
                <motion.div
                    className="pointer-events-none absolute inset-0 mix-blend-multiply"
                    style={{
                        background:
                            "repeating-linear-gradient(0deg, rgba(20,23,31,0.06) 0px, rgba(20,23,31,0.06) 1px, transparent 1px, transparent 3px)",
                    }}
                    animate={{ opacity: [0, 0.6, 0], x: [0, -2, 2, 0] }}
                    transition={{ duration: 0.4, repeat: Infinity, repeatDelay: 2.6 }}
                />
            )}
        </div>
    );
}