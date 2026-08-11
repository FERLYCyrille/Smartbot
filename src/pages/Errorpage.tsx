import ErrorState from "./Errorstate";

type ErrorPageProps = {
    onRetry?: () => void;
};

export default function ErrorPage({ onRetry }: ErrorPageProps) {
    return (
        <ErrorState
            variant="error"
            code="500"
            eyebrow="Erreur serveur"
            title="Le bot a fait un court-circuit."
            description="Une erreur inattendue s'est produite de notre côté. Réessaie dans un instant, ou reviens plus tard si ça persiste."
            primaryAction={
                onRetry
                    ? { label: "Réessayer", onClick: onRetry }
                    : { label: "Réessayer", onClick: () => window.location.reload() }
            }
            secondaryAction={{ label: "Retour à l'accueil", to: "/" }}
        />
    );
}