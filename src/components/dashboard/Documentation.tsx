import { useState } from "react";
import {
    BookOpen,
    Code2,
    ListChecks,
    Lightbulb,
    Check,
    Copy
} from "lucide-react";


type Section =
    "fonctionnement" |
    "integration" |
    "exemples-faq" |
    "bonnes-pratiques";


type Framework =
    "html" |
    "react" |
    "nextjs" |
    "wordpress" |
    "shopify";


const WIDGET_URL =
    "https://vbzrmzycrxwqdomlfkyi.supabase.co/storage/v1/object/public/widget/widget.js";


const sections: { key: Section; label: string; icon: typeof BookOpen }[] = [

    { key: "fonctionnement", label: "Comment ça marche", icon: BookOpen },
    { key: "integration", label: "Intégration", icon: Code2 },
    { key: "exemples-faq", label: "Exemples de FAQ", icon: ListChecks },
    { key: "bonnes-pratiques", label: "Bonnes pratiques", icon: Lightbulb }

];


const frameworks: { key: Framework; label: string }[] = [

    { key: "html", label: "HTML" },
    { key: "react", label: "React / Vite" },
    { key: "nextjs", label: "Next.js" },
    { key: "wordpress", label: "WordPress" },
    { key: "shopify", label: "Shopify" }

];



function BlocCode({ code }: { code: string }) {

    const [copied, setCopied] = useState(false);

    return (

        <div className="
        bg-[#14171F]
        rounded-xl
        p-4
        relative
        overflow-x-auto
        ">


            <button

                onClick={() => {
                    navigator.clipboard.writeText(code);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 1500);
                }}

                className="
                absolute
                top-3
                right-3
                text-white/60
                hover:text-white
                "

            >

                {copied ? <Check size={14} /> : <Copy size={14} />}

            </button>


            <pre className="
            text-white
            text-xs
            leading-relaxed
            whitespace-pre-wrap
            pr-8
            ">

                {code}

            </pre>


        </div>

    );

}





export default function Documentation() {


    const [section, setSection] = useState<Section>("fonctionnement");

    const [framework, setFramework] = useState<Framework>("html");



    return (

        <div className="
        flex
        flex-col
        lg:flex-row
        gap-8
        ">



            {/* SOUS-SIDEBAR DOCUMENTATION */}

            <nav className="
            lg:w-56
            shrink-0
            flex
            lg:flex-col
            gap-1
            overflow-x-auto
            lg:overflow-visible
            border-b
            lg:border-b-0
            lg:border-r
            border-[#DCD5C4]
            pb-3
            lg:pb-0
            lg:pr-6
            ">


                {
                    sections.map(({ key, label, icon: Icon }) => (

                        <button

                            key={key}

                            onClick={() => setSection(key)}

                            className={`
                            flex
                            items-center
                            gap-2.5
                            px-3
                            py-2.5
                            rounded-xl
                            text-sm
                            text-left
                            shrink-0
                            whitespace-nowrap
                            ${section === key
                                    ? "bg-[#14171F] text-white"
                                    : "text-[#6B6459] hover:bg-white"
                                }
                            `}

                        >

                            <Icon size={15} />

                            {label}

                        </button>

                    ))

                }


            </nav>





            {/* CONTENU */}

            <div className="
            flex-1
            max-w-2xl
            ">




                {/* COMMENT ÇA MARCHE */}

                {
                    section === "fonctionnement" &&

                    <div className="flex flex-col gap-6">


                        <div>

                            <h1 className="text-2xl font-semibold text-[#14171F] mb-2">
                                Comment fonctionne Kadi
                            </h1>

                            <p className="text-sm text-[#6B6459]">
                                Trois étapes séparent la création d'un agent de son utilisation par vos visiteurs.
                            </p>

                        </div>



                        {
                            [
                                {
                                    titre: "1. Configurez votre agent",
                                    texte: "Donnez-lui un nom, décrivez votre activité, et remplissez sa FAQ avec les questions les plus fréquentes de vos clients. C'est cette FAQ qui sert de base de connaissance à l'agent."
                                },
                                {
                                    titre: "2. Intégrez le script sur votre site",
                                    texte: "Une seule balise <script> à coller sur votre site, quel que soit le framework utilisé. Le widget apparaît sous forme de bulle de chat flottante."
                                },
                                {
                                    titre: "3. L'agent répond, vous vous améliorez",
                                    texte: "Quand un visiteur pose une question, l'agent cherche d'abord dans votre FAQ. Si aucune correspondance n'est trouvée, il tente une réponse via IA. S'il ne trouve toujours rien, la question est enregistrée dans l'onglet « Questions sans réponse » — vous pouvez alors l'ajouter à la FAQ en un clic."
                                }
                            ].map(item => (

                                <div

                                    key={item.titre}

                                    className="
                                    bg-white
                                    border
                                    border-[#DCD5C4]
                                    rounded-2xl
                                    p-5
                                    "

                                >

                                    <h3 className="font-semibold text-[#14171F] mb-1.5">
                                        {item.titre}
                                    </h3>

                                    <p className="text-sm text-[#6B6459]">
                                        {item.texte}
                                    </p>

                                </div>

                            ))

                        }


                    </div>

                }









                {/* INTÉGRATION */}

                {
                    section === "integration" &&

                    <div className="flex flex-col gap-6">


                        <div>

                            <h1 className="text-2xl font-semibold text-[#14171F] mb-2">
                                Intégrer le widget
                            </h1>

                            <p className="text-sm text-[#6B6459]">
                                Remplacez <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">VOTRE_CLE</code> par
                                la clé unique de votre agent, visible dans l'onglet « Intégration » de sa fiche.
                            </p>

                        </div>




                        <div className="
                        flex
                        gap-2
                        flex-wrap
                        ">


                            {
                                frameworks.map(({ key, label }) => (

                                    <button

                                        key={key}

                                        onClick={() => setFramework(key)}

                                        className={`
                                        px-3.5
                                        py-1.5
                                        rounded-full
                                        text-xs
                                        border
                                        ${framework === key
                                                ? "bg-[#2F6F5E] text-white border-[#2F6F5E]"
                                                : "border-[#DCD5C4] text-[#6B6459]"
                                            }
                                        `}

                                    >

                                        {label}

                                    </button>

                                ))

                            }


                        </div>




                        {
                            framework === "html" &&

                            <div className="flex flex-col gap-3">

                                <p className="text-sm text-[#6B6459]">
                                    Collez ce code juste avant la balise <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">{"</body>"}</code> de votre page.
                                </p>

                                <BlocCode code={
                                    `<script src="${WIDGET_URL}"
    data-key="VOTRE_CLE"
    data-color="#2F6F5E"
    data-position="bas-droit">
</script>`
                                } />

                            </div>

                        }




                        {
                            framework === "react" &&

                            <div className="flex flex-col gap-3">

                                <p className="text-sm text-[#6B6459]">
                                    Option la plus simple : ajoutez le script directement dans <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">index.html</code>, avant <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">{"</body>"}</code>.
                                </p>

                                <BlocCode code={
                                    `<script src="${WIDGET_URL}"
    data-key="VOTRE_CLE"
    data-color="#2F6F5E"
    data-position="bas-droit">
</script>`
                                } />

                                <p className="text-sm text-[#6B6459] mt-2">
                                    Ou, si vous voulez l'injecter dynamiquement (par exemple pour ne l'afficher que sur certaines pages) :
                                </p>

                                <BlocCode code={
                                    `import { useEffect } from "react";

useEffect(() => {
    const script = document.createElement("script");
    script.src = "${WIDGET_URL}";
    script.setAttribute("data-key", "VOTRE_CLE");
    script.setAttribute("data-color", "#2F6F5E");
    script.setAttribute("data-position", "bas-droit");
    document.body.appendChild(script);

    return () => {
        document.body.removeChild(script);
    };
}, []);`
                                } />

                            </div>

                        }




                        {
                            framework === "nextjs" &&

                            <div className="flex flex-col gap-3">

                                <p className="text-sm text-[#6B6459]">
                                    Utilisez le composant <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">next/script</code> dans votre layout ou votre page.
                                </p>

                                <BlocCode code={
                                    `import Script from "next/script";

<Script
    src="${WIDGET_URL}"
    strategy="afterInteractive"
    data-key="VOTRE_CLE"
    data-color="#2F6F5E"
    data-position="bas-droit"
/>`
                                } />

                            </div>

                        }




                        {
                            framework === "wordpress" &&

                            <div className="flex flex-col gap-3">

                                <p className="text-sm text-[#6B6459]">
                                    Le plus simple sans toucher au code du thème : installez le plugin gratuit
                                    « Insert Headers and Footers », puis collez ce code dans la section « Footer ».
                                </p>

                                <BlocCode code={
                                    `<script src="${WIDGET_URL}"
    data-key="VOTRE_CLE"
    data-color="#2F6F5E"
    data-position="bas-droit">
</script>`
                                } />

                                <p className="text-sm text-[#6B6459] mt-2">
                                    Alternative : Apparence → Éditeur de thème → <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">footer.php</code>, juste avant <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">{"</body>"}</code>.
                                </p>

                            </div>

                        }




                        {
                            framework === "shopify" &&

                            <div className="flex flex-col gap-3">

                                <p className="text-sm text-[#6B6459]">
                                    Boutique en ligne → Thèmes → Modifier le code → ouvrez <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">theme.liquid</code>, puis collez le code juste avant <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">{"</body>"}</code>.
                                </p>

                                <BlocCode code={
                                    `<script src="${WIDGET_URL}"
    data-key="VOTRE_CLE"
    data-color="#2F6F5E"
    data-position="bas-droit">
</script>`
                                } />

                            </div>

                        }


                    </div>

                }









                {/* EXEMPLES DE FAQ */}

                {
                    section === "exemples-faq" &&

                    <div className="flex flex-col gap-6">


                        <div>

                            <h1 className="text-2xl font-semibold text-[#14171F] mb-2">
                                Construire une bonne FAQ
                            </h1>

                            <p className="text-sm text-[#6B6459]">
                                Une FAQ efficace couvre les questions récurrentes de vos clients, avec des
                                réponses courtes et directement exploitables.
                            </p>

                        </div>




                        <div className="
                        bg-white
                        border
                        border-[#DCD5C4]
                        rounded-2xl
                        p-5
                        ">

                            <h3 className="font-semibold text-[#14171F] mb-3">
                                Catégories à couvrir en priorité
                            </h3>

                            <ul className="text-sm text-[#6B6459] flex flex-col gap-1.5 list-disc pl-4">

                                <li>Livraison (délais, zones couvertes, coût)</li>
                                <li>Paiement (moyens acceptés, sécurité)</li>
                                <li>Retours et échanges (conditions, délais)</li>
                                <li>Horaires et disponibilité</li>
                                <li>Produits ou services phares (tailles, stock, tarifs)</li>
                                <li>Comment joindre un humain si besoin</li>

                            </ul>

                        </div>




                        {
                            [
                                {
                                    activite: "Boutique de vêtements",
                                    exemples: [
                                        ["Quels sont les délais de livraison ?", "Livraison sous 48h à Cotonou, 3 à 5 jours dans les autres villes du Bénin."],
                                        ["Puis-je échanger un article ?", "Échanges possibles sous 7 jours, article non porté avec étiquette."],
                                        ["Quelles tailles sont disponibles ?", "Du S au XXL selon les modèles, précisé sur chaque fiche produit."]
                                    ]
                                },
                                {
                                    activite: "Restaurant",
                                    exemples: [
                                        ["Faites-vous la livraison ?", "Oui, livraison disponible sur Cotonou et Abomey-Calavi de 11h à 22h."],
                                        ["Avez-vous des options végétariennes ?", "Oui, plusieurs plats végétariens sont indiqués sur le menu."],
                                        ["Peut-on réserver une table ?", "Réservation possible par téléphone ou WhatsApp au moins 2h à l'avance."]
                                    ]
                                },
                                {
                                    activite: "Services (coiffure, beauté)",
                                    exemples: [
                                        ["Faut-il prendre rendez-vous ?", "Oui, réservation recommandée via WhatsApp pour garantir un créneau."],
                                        ["Quels sont vos tarifs ?", "Les tarifs varient selon la prestation, consultez notre liste de prix ou demandez un devis."],
                                        ["Où êtes-vous situés ?", "Nous sommes situés à [quartier], précisez votre position pour l'itinéraire."]
                                    ]
                                }
                            ].map(bloc => (

                                <div

                                    key={bloc.activite}

                                    className="
                                    bg-white
                                    border
                                    border-[#DCD5C4]
                                    rounded-2xl
                                    p-5
                                    "

                                >

                                    <h3 className="font-semibold text-[#14171F] mb-3">
                                        {bloc.activite}
                                    </h3>

                                    <div className="flex flex-col gap-3">

                                        {
                                            bloc.exemples.map(([q, r]) => (

                                                <div key={q} className="text-sm border-b border-[#DCD5C4] pb-3 last:border-0 last:pb-0">

                                                    <p className="font-medium text-[#14171F]">{q}</p>
                                                    <p className="text-[#6B6459] mt-1">{r}</p>

                                                </div>

                                            ))

                                        }

                                    </div>

                                </div>

                            ))

                        }


                    </div>

                }









                {/* BONNES PRATIQUES */}

                {
                    section === "bonnes-pratiques" &&

                    <div className="flex flex-col gap-6">


                        <div>

                            <h1 className="text-2xl font-semibold text-[#14171F] mb-2">
                                Bonnes pratiques
                            </h1>

                            <p className="text-sm text-[#6B6459]">
                                Quelques conseils pour que votre agent réponde le plus souvent possible
                                sans passer par l'IA — plus rapide et plus fiable.
                            </p>

                        </div>



                        {
                            [
                                {
                                    titre: "Utilisez les mots de vos clients, pas les vôtres",
                                    texte: "L'agent recherche des correspondances par mots-clés. Si vos clients disent « vous livrez où », ajoutez cette formulation même si vous préférez dire « zone de livraison »."
                                },
                                {
                                    titre: "Prévoyez plusieurs formulations pour une même question",
                                    texte: "N'hésitez pas à ajouter deux entrées FAQ proches (« Vous livrez où ? » et « Zone de livraison ? ») avec la même réponse, plutôt qu'une seule formulation générique."
                                },
                                {
                                    titre: "Gardez les réponses courtes et directes",
                                    texte: "Une réponse de 1 à 3 phrases est plus utile qu'un paragraphe. Le visiteur veut une information rapide, pas un argumentaire."
                                },
                                {
                                    titre: "Mettez à jour régulièrement",
                                    texte: "Consultez l'onglet « Questions sans réponse » chaque semaine. Chaque question ajoutée à la FAQ réduit le nombre d'appels IA et améliore la rapidité des réponses futures."
                                }
                            ].map(item => (

                                <div

                                    key={item.titre}

                                    className="
                                    bg-white
                                    border
                                    border-[#DCD5C4]
                                    rounded-2xl
                                    p-5
                                    "

                                >

                                    <h3 className="font-semibold text-[#14171F] mb-1.5">
                                        {item.titre}
                                    </h3>

                                    <p className="text-sm text-[#6B6459]">
                                        {item.texte}
                                    </p>

                                </div>

                            ))

                        }


                    </div>

                }


            </div>


        </div>

    );

}