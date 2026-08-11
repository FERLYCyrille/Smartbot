import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import BotFace from "./Botface";

type ErrorStateProps = {
    variant: "lost" | "error";
    code: string;
    eyebrow: string;
    title: string;
    description: string;
    primaryAction: { label: string; to?: string; onClick?: () => void };
    secondaryAction?: { label: string; to?: string; onClick?: () => void };
};

export default function ErrorState({
    variant,
    code,
    eyebrow,
    title,
    description,
    primaryAction,
    secondaryAction,
}: ErrorStateProps) {
    return (
        <div
            className="flex min-h-screen items-center justify-center px-6"
            style={{ backgroundColor: "#14171F" }}
        >
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex w-full max-w-md flex-col items-center text-center"
            >
                <BotFace variant={variant} />

                <p
                    className="mt-6 font-mono text-xs uppercase tracking-[0.25em]"
                    style={{ color: "#C9A227" }}
                >
                    {eyebrow}
                </p>

                <p
                    className="mt-3 font-mono text-6xl font-semibold tracking-tight"
                    style={{ color: "#FBF9F4" }}
                >
                    {code}
                </p>

                <h1 className="mt-4 text-xl font-semibold" style={{ color: "#FBF9F4" }}>
                    {title}
                </h1>

                <p className="mt-2 text-sm leading-relaxed" style={{ color: "#6B6459" }}>
                    {description}
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    {primaryAction.to ? (
                        <Link
                            to={primaryAction.to}
                            className="rounded-full px-6 py-2.5 text-sm font-medium transition-transform hover:scale-[1.02] active:scale-[0.98]"
                            style={{ backgroundColor: "#2F6F5E", color: "#FBF9F4" }}
                        >
                            {primaryAction.label}
                        </Link>
                    ) : (
                        <button
                            onClick={primaryAction.onClick}
                            className="rounded-full px-6 py-2.5 text-sm font-medium transition-transform hover:scale-[1.02] active:scale-[0.98]"
                            style={{ backgroundColor: "#2F6F5E", color: "#FBF9F4" }}
                        >
                            {primaryAction.label}
                        </button>
                    )}

                    {secondaryAction &&
                        (secondaryAction.to ? (
                            <Link
                                to={secondaryAction.to}
                                className="rounded-full border px-6 py-2.5 text-sm font-medium transition-colors hover:border-[#C9A227]"
                                style={{ borderColor: "#6B6459", color: "#FBF9F4" }}
                            >
                                {secondaryAction.label}
                            </Link>
                        ) : (
                            <button
                                onClick={secondaryAction.onClick}
                                className="rounded-full border px-6 py-2.5 text-sm font-medium transition-colors hover:border-[#C9A227]"
                                style={{ borderColor: "#6B6459", color: "#FBF9F4" }}
                            >
                                {secondaryAction.label}
                            </button>
                        ))}
                </div>
            </motion.div>
        </div>
    );
}