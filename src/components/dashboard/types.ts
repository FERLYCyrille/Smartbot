export type Page = "overview" | "create" | "agent" | "settings" | "docs";


export interface QuestionSansReponse {
    id: string;
    question: string;
    date: string;
}


export interface Message {
    role: "visiteur" | "bot";
    texte: string;
}


export interface Conversation {
    id: string;
    heure: string;
    langue: string;
    date: string;
    messages: Message[];
}


export interface Agent {

    id: string;
    nom: string;
    activite: string;
    description: string;

    statut: "actif" | "inactif";

    conversations: number;
    sansReponse: number;

    cle: string;

    couleur: string;

    position: "bas-droit" | "bas-gauche";
    iconeUrl: string;
    multilingue: boolean;

    faq: FAQ[];

    endpoints: string;

    questionsSansReponse: QuestionSansReponse[];

    conversationsJour: Conversation[];
}


export interface FAQ {
    q: string;
    r: string;
    motsCles: string[];
}

export interface AgentForm {

    botName: string;

    activityName: string;

    description: string;

    faq: FAQ[];

    endpoints: string;

    couleur: string;

    position: "bas-droit" | "bas-gauche";

    multilingue: boolean;

    iconeUrl: string;

}