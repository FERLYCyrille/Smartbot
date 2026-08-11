import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Loader2, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/AuthContext";

type LoginFormProps = {
    formKey: string;
    delay?: number;
    onSuccess: () => void;
};

function LoginForm({ formKey, delay = 0.25, onSuccess }: LoginFormProps) {
    const { signIn } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        const { error } = await signIn(email, password);
        setLoading(false);
        if (error) {
            setError(error);
            return;
        }
        onSuccess();
    };

    return (
        <motion.form
            key={formKey}
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay }}
            className="w-full max-w-[360px] flex flex-col gap-5"
        >
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-zinc-900 mb-2">
                Connexion
            </h1>

            {error && (
                <div className="rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-600">
                    {error}
                </div>
            )}

            <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="
                    w-full rounded-2xl border border-zinc-200
                    px-4 py-3.5 text-sm text-zinc-900
                    placeholder:text-zinc-400
                    focus:outline-none focus:ring-2 focus:ring-[#1f1f22]/80
                    transition
                "
            />

            <div className="relative">
                <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mot de passe"
                    className="
                        w-full rounded-2xl border border-zinc-200
                        px-4 py-3.5 pr-11 text-sm text-zinc-900
                        placeholder:text-zinc-400
                        focus:outline-none focus:ring-2 focus:ring-[#1f1f22]/80
                        transition
                    "
                />
                <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 transition"
                    aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
            </div>

            <div className="flex items-center justify-between text-xs text-zinc-500 mt-1">
                <label className="flex items-center gap-2">
                    <input type="checkbox" className="accent-[#1f1f22]" />
                    Se souvenir de moi
                </label>
                <a href="#" className="hover:text-black transition">
                    Mot de passe oublié ?
                </a>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="
                    mt-3 bg-[#1f1f22] text-white
                    rounded-full pl-6 pr-2 py-3
                    flex items-center justify-between gap-3
                    hover:scale-[1.02] transition
                    disabled:opacity-60 disabled:hover:scale-100
                "
            >
                {loading ? "Connexion..." : "Se connecter"}
                <span className="bg-white text-[#1f1f22] rounded-full w-9 h-9 flex items-center justify-center shrink-0">
                    {loading ? (
                        <Loader2 size={16} className="animate-spin" />
                    ) : (
                        <ArrowUpRight size={16} strokeWidth={2.5} />
                    )}
                </span>
            </button>
        </motion.form>
    );
}

type RegisterFormProps = {
    formKey: string;
    delay?: number;
    onSwitchToLogin: () => void;
};

function RegisterForm({ formKey, delay = 0.25, onSwitchToLogin }: RegisterFormProps) {
    const { signUp } = useAuth();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (password !== confirmPassword) {
            setError("Les mots de passe ne correspondent pas.");
            return;
        }

        setLoading(true);
        const { error } = await signUp(email, password, name);
        setLoading(false);
        if (error) {
            setError(error);
            return;
        }
        // Par défaut, Supabase exige une confirmation par email : pas de session
        // tant que l'utilisateur n'a pas cliqué le lien reçu. On ne redirige donc
        // pas vers /dashboard automatiquement.
        setSuccess(true);
    };

    if (success) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full max-w-[360px] text-center"
            >
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-900 mb-3">
                    Compte créé
                </h1>
                <p className="text-sm text-zinc-500 mb-6">
                    Vérifiez votre boîte mail pour confirmer votre adresse avant de vous connecter.
                </p>
                <button
                    type="button"
                    onClick={onSwitchToLogin}
                    className="text-sm font-medium underline text-zinc-900 hover:opacity-70 transition"
                >
                    Aller à la connexion
                </button>
            </motion.div>
        );
    }

    return (
        <motion.form
            key={formKey}
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay }}
            className="w-full max-w-[360px] flex flex-col gap-5"
        >
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-zinc-900 mb-2">
                Créer un compte
            </h1>

            {error && (
                <div className="rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-600">
                    {error}
                </div>
            )}

            <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nom"
                className="
                    w-full rounded-2xl border border-zinc-200
                    px-4 py-3.5 text-sm text-zinc-900
                    placeholder:text-zinc-400
                    focus:outline-none focus:ring-2 focus:ring-[#1f1f22]/80
                    transition
                "
            />
            <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="
                    w-full rounded-2xl border border-zinc-200
                    px-4 py-3.5 text-sm text-zinc-900
                    placeholder:text-zinc-400
                    focus:outline-none focus:ring-2 focus:ring-[#1f1f22]/80
                    transition
                "
            />

            <div className="relative">
                <input
                    type={showPassword ? "text" : "password"}
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mot de passe"
                    className="
                        w-full rounded-2xl border border-zinc-200
                        px-4 py-3.5 pr-11 text-sm text-zinc-900
                        placeholder:text-zinc-400
                        focus:outline-none focus:ring-2 focus:ring-[#1f1f22]/80
                        transition
                    "
                />
                <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 transition"
                    aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
            </div>

            <div className="relative">
                <input
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    minLength={6}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirmer le mot de passe"
                    className="
                        w-full rounded-2xl border border-zinc-200
                        px-4 py-3.5 pr-11 text-sm text-zinc-900
                        placeholder:text-zinc-400
                        focus:outline-none focus:ring-2 focus:ring-[#1f1f22]/80
                        transition
                    "
                />
                <button
                    type="button"
                    onClick={() => setShowConfirmPassword((v) => !v)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 transition"
                    aria-label={showConfirmPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="
                    mt-3 bg-[#1f1f22] text-white
                    rounded-full pl-6 pr-2 py-3
                    flex items-center justify-between gap-3
                    hover:scale-[1.02] transition
                    disabled:opacity-60 disabled:hover:scale-100
                "
            >
                {loading ? "Création..." : "S'inscrire"}
                <span className="bg-white text-[#1f1f22] rounded-full w-9 h-9 flex items-center justify-center shrink-0">
                    {loading ? (
                        <Loader2 size={16} className="animate-spin" />
                    ) : (
                        <ArrowUpRight size={16} strokeWidth={2.5} />
                    )}
                </span>
            </button>
        </motion.form>
    );
}

type AuthPageProps = {
    onAuthSuccess?: () => void;
};

export default function AuthPage({ onAuthSuccess = () => { } }: AuthPageProps) {
    const [mode, setMode] = useState("login"); // "login" | "register"
    const isLogin = mode === "login";

    return (
        <>
            {/* ===== MOBILE / TABLET (< lg) : empilé, une seule colonne ===== */}
            <div className="lg:hidden min-h-screen w-full bg-white flex flex-col">
                <div className="bg-[#1f1f22] px-6 sm:px-10 py-10 text-center relative">
                    <a
                        href="/"
                        className="absolute top-5 left-6 inline-flex items-center gap-1.5 text-sm font-medium text-white/70 hover:text-white transition"
                    >
                        <ArrowUpRight size={14} className="rotate-[225deg]" />
                        Accueil
                    </a>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={mode}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="flex flex-col items-center gap-4 max-w-sm mx-auto pt-8"
                        >
                            <h2 className="text-3xl font-black tracking-tight text-white">
                                {isLogin ? "Content de vous revoir" : "Nouveau ici ?"}
                            </h2>
                            <p className="text-sm text-white/60 leading-relaxed">
                                {isLogin
                                    ? "Connectez-vous pour retrouver vos agents là où vous les avez laissés."
                                    : "Créez un compte et configurez votre premier agent."}
                            </p>
                            <button
                                onClick={() => setMode(isLogin ? "register" : "login")}
                                className="
                                    mt-2 border border-white/30 text-white
                                    rounded-full px-6 py-2.5 text-sm font-medium
                                    hover:bg-white hover:text-[#1f1f22]
                                    transition
                                "
                            >
                                {isLogin ? "S'inscrire" : "Se connecter"}
                            </button>
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="flex-1 px-6 sm:px-10 py-10 flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        {isLogin ? (
                            <LoginForm formKey="login-mobile" delay={0.15} onSuccess={onAuthSuccess} />
                        ) : (
                            <RegisterForm
                                formKey="register-mobile"
                                delay={0.15}
                                onSwitchToLogin={() => setMode("login")}
                            />
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* ===== DESKTOP (>= lg) : panneau glissant d'origine ===== */}
            <div className="hidden lg:block relative min-h-screen w-full overflow-hidden bg-white">
                {/* Lien retour accueil, fixe au-dessus des deux panneaux */}
                <a
                    href="/"
                    className="
                        absolute top-6 left-8 z-20
                        inline-flex items-center gap-1.5
                        text-sm font-medium text-zinc-500 hover:text-zinc-900
                        transition mix-blend-difference
                    "
                >
                    <ArrowUpRight size={14} className="rotate-[225deg]" />
                    Accueil
                </a>

                {/* DARK SLIDING PANEL */}
                <motion.div
                    initial={false}
                    animate={{ x: isLogin ? 0 : "100%" }}
                    transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
                    className="absolute top-0 left-0 w-1/2 h-full bg-[#1f1f22] z-10 flex flex-col items-center justify-center px-10 lg:px-20 text-center"
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={mode}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.35, delay: 0.2 }}
                            className="flex flex-col items-center gap-5 max-w-sm"
                        >
                            <h2 className="text-4xl lg:text-5xl font-black tracking-tight text-white">
                                {isLogin ? "Content de vous revoir" : "Nouveau ici ?"}
                            </h2>
                            <p className="text-sm lg:text-base text-white/60 leading-relaxed">
                                {isLogin
                                    ? "Connectez-vous pour retrouver vos agents là où vous les avez laissés."
                                    : "Créez un compte et configurez votre premier agent."}
                            </p>
                            <button
                                onClick={() => setMode(isLogin ? "register" : "login")}
                                className="
                                    mt-3 border border-white/30 text-white
                                    rounded-full px-7 py-3 text-sm font-medium
                                    hover:bg-white hover:text-[#1f1f22]
                                    transition
                                "
                            >
                                {isLogin ? "S'inscrire" : "Se connecter"}
                            </button>
                        </motion.div>
                    </AnimatePresence>
                </motion.div>

                {/* LOGIN FORM */}
                <div className="absolute top-0 right-0 w-1/2 h-full flex items-center justify-center px-10 lg:px-20">
                    <AnimatePresence mode="wait">
                        {isLogin && <LoginForm formKey="login" onSuccess={onAuthSuccess} />}
                    </AnimatePresence>
                </div>

                {/* REGISTER FORM */}
                <div className="absolute top-0 left-0 w-1/2 h-full flex items-center justify-center px-10 lg:px-20">
                    <AnimatePresence mode="wait">
                        {!isLogin && (
                            <RegisterForm
                                formKey="register"

                                onSwitchToLogin={() => setMode("login")}
                            />
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </>
    );
}