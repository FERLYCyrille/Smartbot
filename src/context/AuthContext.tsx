import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "../../Supabaseclient";

type AuthResult = { error: string | null };

type AuthContextType = {
    user: User | null;
    session: Session | null;
    loading: boolean;
    signIn: (email: string, password: string) => Promise<AuthResult>;
    signUp: (email: string, password: string, name: string) => Promise<AuthResult>;
    signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Traduit les messages d'erreur Supabase (en anglais) en français,
// pour ne pas afficher du texte brut à l'utilisateur.
function traduireErreur(message: string): string {
    const map: Record<string, string> = {
        "Invalid login credentials": "Email ou mot de passe incorrect.",
        "User already registered": "Un compte existe déjà avec cet email.",
        "Email not confirmed": "Merci de confirmer votre email avant de vous connecter.",
        "Password should be at least 6 characters":
            "Le mot de passe doit contenir au moins 6 caractères.",
        "Unable to validate email address: invalid format": "Adresse email invalide.",
    };
    return map[message] ?? "Une erreur est survenue. Réessayez.";
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setLoading(false);
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    const signIn = async (email: string, password: string): Promise<AuthResult> => {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        return { error: error ? traduireErreur(error.message) : null };
    };

    const signUp = async (
        email: string,
        password: string,
        name: string
    ): Promise<AuthResult> => {
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: { data: { full_name: name } },
        });
        return { error: error ? traduireErreur(error.message) : null };
    };

    const signOut = async () => {
        await supabase.auth.signOut();
    };

    return (
        <AuthContext.Provider
            value={{ user: session?.user ?? null, session, loading, signIn, signUp, signOut }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth doit être utilisé à l'intérieur d'un <AuthProvider>.");
    return ctx;
}