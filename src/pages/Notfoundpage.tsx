import ErrorState from "./Errorstate";

export default function NotFoundPage() {
    return (
        <ErrorState
            variant="lost"
            code="404"
            eyebrow="Page introuvable"
            title="Ton bot a cherché partout, rien trouvé."
            description="La page que tu cherches n'existe pas ou a été déplacée. Vérifie l'adresse ou retourne à l'accueil."
            primaryAction={{ label: "Retour à l'accueil", to: "/" }}
            secondaryAction={{ label: "Aller au dashboard", to: "/dashboard" }}
        />
    );
}