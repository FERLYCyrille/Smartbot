import type { Agent } from "../components/dashboard/types";


export const initialAgents: Agent[] = [

    {
        id: 1,
        nom: "Assistant Boutique Ana",
        activite: "Boutique de prêt-à-porter en ligne",
        description: "Nous vendons des vêtements et accessoires pour femmes.",
        statut: "actif",

        conversations: 42,
        sansReponse: 5,

        cle: "kadi_live_8f2a19cd91d0",

        couleur: "#2F6F5E",

        position: "bas-droit",

        multilingue: true,

        faq: [
            {
                q: "Quels sont les délais de livraison ?",
                r: "48h à Cotonou."
            }
        ],

        endpoints: "GET /produits",

        questionsSansReponse: [],

        conversationsJour: []

    }

];