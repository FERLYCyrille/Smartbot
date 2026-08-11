import { useState } from "react";
import {
    BookOpen,
    Code2,
    ListChecks,
    Lightbulb,
    Check,
    Copy,
    Settings2,
    MessageSquareText,
    RefreshCcw,
    Zap,
    TrendingDown,
    ThumbsUp,
    ListOrdered,
    ShoppingBag,
    UtensilsCrossed,
    Scissors
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
    "django" |
    "wordpress" |
    "shopify";


const WIDGET_URL =
    "https://vbzrmzycrxwqdomlfkyi.supabase.co/storage/v1/object/public/widget/widget.js";


const sections: { key: Section; label: string; icon: typeof BookOpen }[] = [

    { key: "fonctionnement", label: "Comment ça marche", icon: BookOpen },
    { key: "integration", label: "Intégration", icon: Code2 },
    { key: "exemples-faq", label: "Construire sa FAQ", icon: ListChecks },
    { key: "bonnes-pratiques", label: "Bonnes pratiques", icon: Lightbulb }

];


const frameworks: { key: Framework; label: string }[] = [

    { key: "html", label: "HTML" },
    { key: "react", label: "React / Vite" },
    { key: "nextjs", label: "Next.js" },
    { key: "django", label: "Django" },
    { key: "wordpress", label: "WordPress" },
    { key: "shopify", label: "Shopify" }

];



function Eyebrow({ children }: { children: string }) {

    return (
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2F6F5E] mb-2">
            {children}
        </p>
    );

}



function BlocCode({ code, lang }: { code: string; lang: string }) {

    const [copied, setCopied] = useState(false);

    return (

        <div className="
        bg-[#14171F]
        rounded-xl
        overflow-hidden
        border
        border-[#2B2F3B]
        ">

            <div className="
            flex
            items-center
            justify-between
            px-4
            py-2
            border-b
            border-[#2B2F3B]
            ">

                <span className="text-[10px] font-medium uppercase tracking-wider text-white/40">
                    {lang}
                </span>

                <button

                    onClick={() => {
                        navigator.clipboard.writeText(code);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 1500);
                    }}

                    className="
                    flex
                    items-center
                    gap-1.5
                    text-[11px]
                    text-white/60
                    hover:text-white
                    transition-colors
                    "

                >

                    {copied ? <Check size={13} /> : <Copy size={13} />}
                    {copied ? "Copié" : "Copier"}

                </button>

            </div>

            <pre className="
            text-white
            text-xs
            leading-relaxed
            whitespace-pre-wrap
            p-4
            overflow-x-auto
            ">

                {code}

            </pre>


        </div>

    );

}



function StepCard({ number, titre, texte, icon: Icon }:
    { number: number; titre: string; texte: string; icon?: typeof Settings2 }) {

    return (

        <div className="
        bg-white
        border
        border-[#DCD5C4]
        rounded-2xl
        p-5
        flex
        gap-4
        ">

            <div className="
            shrink-0
            w-9
            h-9
            rounded-full
            bg-[#14171F]
            text-white
            text-sm
            font-semibold
            flex
            items-center
            justify-center
            ">
                {number}
            </div>

            <div>

                <div className="flex items-center gap-2 mb-1.5">

                    {Icon && <Icon size={16} className="text-[#2F6F5E]" />}

                    <h3 className="font-semibold text-[#14171F]">
                        {titre}
                    </h3>

                </div>

                <p className="text-sm text-[#6B6459] leading-relaxed">
                    {texte}
                </p>

            </div>

        </div>

    );

}



function AvantageCard({ icon: Icon, titre, texte }:
    { icon: typeof Zap; titre: string; texte: string }) {

    return (

        <div className="
        bg-[#FBF9F4]
        border
        border-[#DCD5C4]
        rounded-2xl
        p-5
        ">

            <div className="
            w-9
            h-9
            rounded-full
            bg-[#2F6F5E]/10
            flex
            items-center
            justify-center
            mb-3
            ">
                <Icon size={16} className="text-[#2F6F5E]" />
            </div>

            <h3 className="font-semibold text-[#14171F] mb-1 text-sm">
                {titre}
            </h3>

            <p className="text-xs text-[#6B6459] leading-relaxed">
                {texte}
            </p>

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
                            transition-colors
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

                            <Eyebrow>Guide</Eyebrow>

                            <h1 className="text-2xl font-semibold text-[#14171F] mb-2">
                                Comment fonctionne Smartbot
                            </h1>

                            <p className="text-sm text-[#6B6459]">
                                Trois étapes séparent la création d'un agent de son utilisation par vos visiteurs.
                            </p>

                        </div>



                        <div className="flex flex-col gap-3">

                            {
                                [
                                    {
                                        titre: "Configurez votre agent",
                                        texte: "Donnez-lui un nom, décrivez votre activité, et remplissez sa FAQ avec les questions les plus fréquentes de vos clients. C'est cette FAQ qui sert de base de connaissance à l'agent.",
                                        icon: Settings2
                                    },
                                    {
                                        titre: "Intégrez le script sur votre site",
                                        texte: "Une seule balise <script> à coller sur votre site, quel que soit le framework utilisé. Le widget apparaît sous forme de bulle de chat flottante.",
                                        icon: Code2
                                    },
                                    {
                                        titre: "L'agent répond, vous vous améliorez",
                                        texte: "Quand un visiteur pose une question, l'agent cherche d'abord dans votre FAQ. Si aucune correspondance n'est trouvée, il tente une réponse via IA. S'il ne trouve toujours rien, la question est enregistrée dans l'onglet « Questions sans réponse » — vous pouvez alors l'ajouter à la FAQ en un clic.",
                                        icon: MessageSquareText
                                    }
                                ].map((item, i) => (

                                    <StepCard
                                        key={item.titre}
                                        number={i + 1}
                                        titre={item.titre}
                                        texte={item.texte}
                                        icon={item.icon}
                                    />

                                ))

                            }

                        </div>


                    </div>

                }









                {/* INTÉGRATION */}

                {
                    section === "integration" &&

                    <div className="flex flex-col gap-6">


                        <div>

                            <Eyebrow>Technique</Eyebrow>

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
                                        font-medium
                                        border
                                        transition-colors
                                        ${framework === key
                                                ? "bg-[#2F6F5E] text-white border-[#2F6F5E]"
                                                : "border-[#DCD5C4] text-[#6B6459] hover:border-[#2F6F5E]"
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

                                <BlocCode lang="html" code={
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

                                <BlocCode lang="html" code={
                                    `<script src="${WIDGET_URL}"
    data-key="VOTRE_CLE"
    data-color="#2F6F5E"
    data-position="bas-droit">
</script>`
                                } />

                                <p className="text-sm text-[#6B6459] mt-2">
                                    Ou, si vous voulez l'injecter dynamiquement (par exemple pour ne l'afficher que sur certaines pages) :
                                </p>

                                <BlocCode lang="tsx" code={
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

                                <BlocCode lang="tsx" code={
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
                            framework === "django" &&

                            <div className="flex flex-col gap-3">

                                <p className="text-sm text-[#6B6459]">
                                    Si Django rend vos pages côté serveur (templates classiques), ajoutez le script
                                    dans votre template de base, juste avant <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">{"</body>"}</code>.
                                    Passez la clé depuis la vue plutôt que de la coder en dur, pour pouvoir la
                                    changer sans redéployer le template.
                                </p>

                                <BlocCode lang="html" code={
                                    `<!-- templates/base.html -->
<script src="${WIDGET_URL}"
    data-key="{{ smartbot_key }}"
    data-color="#2F6F5E"
    data-position="bas-droit">
</script>`
                                } />

                                <BlocCode lang="python" code={
                                    `# views.py
def ma_vue(request):
    context = {"smartbot_key": "VOTRE_CLE"}
    return render(request, "base.html", context)`
                                } />

                                <p className="text-sm text-[#6B6459] mt-2">
                                    Si Django ne sert que l'API (Django REST Framework) derrière un frontend
                                    séparé, le widget se pose côté frontend : ouvrez l'onglet correspondant
                                    (React, HTML...) plutôt que celui-ci.
                                </p>

                            </div>

                        }




                        {
                            framework === "wordpress" &&

                            <div className="flex flex-col gap-3">

                                <p className="text-sm text-[#6B6459]">
                                    Le plus simple sans toucher au code du thème : installez le plugin gratuit
                                    « Insert Headers and Footers », puis collez ce code dans la section « Footer ».
                                </p>

                                <BlocCode lang="html" code={
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

                                <BlocCode lang="liquid" code={
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









                {/* CONSTRUIRE SA FAQ */}

                {
                    section === "exemples-faq" &&

                    <div className="flex flex-col gap-8">


                        <div>

                            <Eyebrow>Stratégie</Eyebrow>

                            <h1 className="text-2xl font-semibold text-[#14171F] mb-2">
                                Construire une FAQ qui fait vraiment le travail
                            </h1>

                            <p className="text-sm text-[#6B6459] leading-relaxed">
                                La FAQ n'est pas une formalité : c'est elle qui détermine si votre agent répond
                                instantanément et gratuitement, ou s'il doit chaque fois passer par l'IA. Une FAQ
                                bien construite est ce qui sépare un agent utile d'un agent qui frustre vos visiteurs.
                            </p>

                        </div>



                        {/* AVANTAGES BUSINESS */}

                        <div>

                            <h2 className="font-semibold text-[#14171F] mb-3">
                                Pourquoi investir du temps dedans
                            </h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                                <AvantageCard
                                    icon={Zap}
                                    titre="Réponses instantanées"
                                    texte="Une correspondance FAQ répond en une fraction de seconde, sans latence IA — le visiteur ne patiente jamais."
                                />

                                <AvantageCard
                                    icon={TrendingDown}
                                    titre="Coûts IA réduits"
                                    texte="Chaque question couverte par la FAQ est une question qui ne déclenche pas d'appel IA. Plus votre FAQ est riche, plus votre facture baisse."
                                />

                                <AvantageCard
                                    icon={ThumbsUp}
                                    titre="Réponses fiables"
                                    texte="Une réponse FAQ, c'est exactement ce que vous avez écrit — pas une reformulation IA qui peut varier ou se tromper."
                                />

                                <AvantageCard
                                    icon={RefreshCcw}
                                    titre="Qui s'améliore seule"
                                    texte="Chaque question sans réponse enregistrée est une occasion d'enrichir la FAQ. Plus l'agent tourne, plus il devient précis."
                                />

                            </div>

                        </div>



                        {/* GUIDE PAS À PAS */}

                        <div>

                            <h2 className="font-semibold text-[#14171F] mb-3">
                                La méthode, étape par étape
                            </h2>

                            <div className="flex flex-col gap-3">

                                <StepCard
                                    number={1}
                                    titre="Listez les questions réellement posées"
                                    texte="Reprenez vos échanges WhatsApp, vos DM Instagram, vos appels ou vos emails des derniers mois. Notez chaque question récurrente telle qu'elle a été posée — c'est la meilleure source, bien avant d'inventer des questions depuis votre bureau."
                                />

                                <StepCard
                                    number={2}
                                    titre="Reprenez les mots de vos clients, pas les vôtres"
                                    texte="L'agent recherche des correspondances par mots-clés. Si vos clients écrivent « vous livrez où », utilisez cette formulation même si vous, en interne, préférez dire « zone de couverture »."
                                />

                                <StepCard
                                    number={3}
                                    titre="Prévoyez plusieurs formulations pour une même réponse"
                                    texte="Ajoutez plusieurs entrées proches (« Vous livrez où ? », « Zone de livraison ? », « Vous livrez à... ? ») pointant vers la même réponse, plutôt qu'une seule formulation générique que personne ne tape jamais exactement."
                                />

                                <StepCard
                                    number={4}
                                    titre="Rédigez des réponses courtes et actionnables"
                                    texte="Une réponse de 1 à 3 phrases, avec l'information concrète (délai, prix, condition) en premier. Le visiteur veut une réponse, pas un argumentaire commercial."
                                />

                                <StepCard
                                    number={5}
                                    titre="Groupez par catégorie avant de vous lancer"
                                    texte="Structurez votre réflexion autour de vos grandes catégories métier (livraison, paiement, retours...) plutôt que d'ajouter des questions au hasard. Ça évite les trous et les doublons."
                                />

                                <StepCard
                                    number={6}
                                    titre="Surveillez, ajoutez, recommencez chaque semaine"
                                    texte="Consultez l'onglet « Questions sans réponse » régulièrement. Chaque question ajoutée à la FAQ est un appel IA en moins et une réponse plus rapide pour le prochain visiteur qui pose la même question."
                                />

                            </div>

                        </div>



                        {/* CATÉGORIES */}

                        <div className="
                        bg-white
                        border
                        border-[#DCD5C4]
                        rounded-2xl
                        p-5
                        ">

                            <div className="flex items-center gap-2 mb-3">

                                <ListOrdered size={16} className="text-[#C9A227]" />

                                <h3 className="font-semibold text-[#14171F]">
                                    Catégories à couvrir en priorité
                                </h3>

                            </div>

                            <ul className="text-sm text-[#6B6459] flex flex-col gap-1.5 list-disc pl-4">

                                <li>Livraison (délais, zones couvertes, coût)</li>
                                <li>Paiement (moyens acceptés, sécurité)</li>
                                <li>Retours et échanges (conditions, délais)</li>
                                <li>Horaires et disponibilité</li>
                                <li>Produits ou services phares (tailles, stock, tarifs)</li>
                                <li>Comment joindre un humain si besoin</li>

                            </ul>

                        </div>



                        {/* EXEMPLES CONCRETS */}

                        <div>

                            <h2 className="font-semibold text-[#14171F] mb-3">
                                Exemples concrets par type d'activité
                            </h2>

                            <p className="text-sm text-[#6B6459] mb-4 leading-relaxed">
                                À adapter avec vos propres délais, tarifs et conditions — ces exemples illustrent
                                surtout le ton et le niveau de détail à viser.
                            </p>

                            <div className="flex flex-col gap-4">

                                {
                                    [
                                        {
                                            activite: "Boutique de vêtements",
                                            icon: ShoppingBag,
                                            exemples: [
                                                ["Quels sont les délais de livraison ?", "Livraison sous 48h à Cotonou, 3 à 5 jours dans les autres villes du Bénin."],
                                                ["Puis-je échanger un article ?", "Échanges possibles sous 7 jours, article non porté avec étiquette."],
                                                ["Quelles tailles sont disponibles ?", "Du S au XXL selon les modèles, précisé sur chaque fiche produit."]
                                            ]
                                        },
                                        {
                                            activite: "Restaurant",
                                            icon: UtensilsCrossed,
                                            exemples: [
                                                ["Faites-vous la livraison ?", "Oui, livraison disponible sur Cotonou et Abomey-Calavi de 11h à 22h."],
                                                ["Avez-vous des options végétariennes ?", "Oui, plusieurs plats végétariens sont indiqués sur le menu."],
                                                ["Peut-on réserver une table ?", "Réservation possible par téléphone ou WhatsApp au moins 2h à l'avance."]
                                            ]
                                        },
                                        {
                                            activite: "Services (coiffure, beauté)",
                                            icon: Scissors,
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

                                            <div className="flex items-center gap-2 mb-3">

                                                <bloc.icon size={16} className="text-[#2F6F5E]" />

                                                <h3 className="font-semibold text-[#14171F]">
                                                    {bloc.activite}
                                                </h3>

                                            </div>

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

                        </div>


                    </div>

                }









                {/* BONNES PRATIQUES */}

                {
                    section === "bonnes-pratiques" &&

                    <div className="flex flex-col gap-6">


                        <div>

                            <Eyebrow>Optimisation</Eyebrow>

                            <h1 className="text-2xl font-semibold text-[#14171F] mb-2">
                                Bonnes pratiques
                            </h1>

                            <p className="text-sm text-[#6B6459]">
                                Quelques conseils pour que votre agent réponde le plus souvent possible
                                sans passer par l'IA — plus rapide et plus fiable.
                            </p>

                        </div>



                        <div className="flex flex-col gap-3">

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
                                ].map((item, i) => (

                                    <StepCard
                                        key={item.titre}
                                        number={i + 1}
                                        titre={item.titre}
                                        texte={item.texte}
                                    />

                                ))

                            }

                        </div>


                    </div>

                }


            </div>


        </div>

    );

}