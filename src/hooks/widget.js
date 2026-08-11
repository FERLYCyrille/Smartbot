(function () {

    "use strict";


    var script = document.currentScript;

    var cle = script.getAttribute("data-key");

    var couleur = script.getAttribute("data-color") || "#2F6F5E";

    var position = script.getAttribute("data-position") || "bas-droit";

    var iconeUrl = script.getAttribute("data-icon") || "";

    var EDGE_FUNCTION_URL = "https://vbzrmzycrxwqdomlfkyi.supabase.co/functions/v1/chat-widget";


    if (!cle) {
        console.error("Kadi Widget: attribut data-key manquant.");
        return;
    }


    var estADroite = position !== "bas-gauche";


    var conversationId = sessionStorage.getItem("kadi_conv_" + cle);

    if (!conversationId) {

        conversationId = crypto.randomUUID
            ? crypto.randomUUID()
            : String(Date.now()) + Math.random().toString(16).slice(2);

        sessionStorage.setItem("kadi_conv_" + cle, conversationId);

    }




    // ----- Styles injectés une seule fois -----

    var style = document.createElement("style");

    style.textContent = `
        .kadi-bulle {
            position: fixed;
            bottom: 20px;
            ${estADroite ? "right" : "left"}: 20px;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            border: none;
            cursor: pointer;
            z-index: 999999;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 6px 20px rgba(0,0,0,0.25);
            transition: transform 0.2s ease, box-shadow 0.2s ease;
            padding: 0;
            overflow: hidden;
        }

        .kadi-bulle:hover {
            transform: scale(1.06);
            box-shadow: 0 8px 26px rgba(0,0,0,0.3);
        }

        .kadi-bulle img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .kadi-panneau {
            position: fixed;
            bottom: 92px;
            ${estADroite ? "right" : "left"}: 20px;
            width: 360px;
            max-width: 92vw;
            height: 480px;
            max-height: 72vh;
            background: #ffffff;
            border-radius: 22px;
            box-shadow: 0 16px 50px rgba(0,0,0,0.25);
            display: flex;
            flex-direction: column;
            overflow: hidden;
            z-index: 999999;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
            opacity: 0;
            transform: translateY(16px) scale(0.96);
            pointer-events: none;
            transition: opacity 0.22s ease, transform 0.22s ease;
        }

        .kadi-panneau.kadi-ouvert {
            opacity: 1;
            transform: translateY(0) scale(1);
            pointer-events: auto;
        }

        .kadi-entete {
            padding: 16px 18px;
            display: flex;
            align-items: center;
            gap: 12px;
            color: #fff;
        }

        .kadi-avatar {
            width: 38px;
            height: 38px;
            border-radius: 50%;
            background: rgba(255,255,255,0.2);
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            flex-shrink: 0;
        }

        .kadi-avatar img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .kadi-entete-texte {
            flex: 1;
            min-width: 0;
        }

        .kadi-entete-titre {
            font-size: 14px;
            font-weight: 600;
            margin: 0;
        }

        .kadi-entete-statut {
            font-size: 11px;
            opacity: 0.85;
            display: flex;
            align-items: center;
            gap: 5px;
            margin: 2px 0 0;
        }

        .kadi-point-vert {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: #4ADE80;
            display: inline-block;
        }

        .kadi-fermer {
            background: none;
            border: none;
            color: #fff;
            opacity: 0.8;
            cursor: pointer;
            padding: 4px;
            display: flex;
        }

        .kadi-fermer:hover {
            opacity: 1;
        }

        .kadi-messages {
            flex: 1;
            overflow-y: auto;
            padding: 16px;
            display: flex;
            flex-direction: column;
            gap: 10px;
            background: #FAFAF8;
        }

        .kadi-bulle-msg {
            max-width: 78%;
            padding: 10px 14px;
            font-size: 13.5px;
            line-height: 1.45;
            animation: kadiFadeIn 0.25s ease;
        }

        .kadi-bulle-bot {
            align-self: flex-start;
            background: #fff;
            color: #14171F;
            border-radius: 4px 16px 16px 16px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.08);
        }

        .kadi-bulle-visiteur {
            align-self: flex-end;
            color: #fff;
            border-radius: 16px 4px 16px 16px;
        }

        @keyframes kadiFadeIn {
            from { opacity: 0; transform: translateY(6px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .kadi-typing {
            align-self: flex-start;
            display: flex;
            gap: 4px;
            background: #fff;
            padding: 12px 14px;
            border-radius: 4px 16px 16px 16px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.08);
        }

        .kadi-typing span {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: #C4C0B6;
            animation: kadiBounce 1.2s infinite ease-in-out;
        }

        .kadi-typing span:nth-child(2) { animation-delay: 0.15s; }
        .kadi-typing span:nth-child(3) { animation-delay: 0.3s; }

        @keyframes kadiBounce {
            0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
            30% { transform: translateY(-5px); opacity: 1; }
        }

        .kadi-saisie {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 12px;
            background: #fff;
            border-top: 1px solid #EFEDE7;
        }

        .kadi-input {
            flex: 1;
            border: 1px solid #E5E1D8;
            border-radius: 999px;
            padding: 10px 16px;
            font-size: 13.5px;
            outline: none;
            font-family: inherit;
        }

        .kadi-input:focus {
            border-color: #C4C0B6;
        }

        .kadi-envoyer {
            width: 38px;
            height: 38px;
            border-radius: 50%;
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            transition: transform 0.15s ease;
        }

        .kadi-envoyer:hover {
            transform: scale(1.08);
        }

        .kadi-envoyer:disabled {
            opacity: 0.5;
            cursor: default;
            transform: none;
        }

        @media (max-width: 480px) {
            .kadi-panneau {
                width: 92vw;
                bottom: 88px;
            }
        }
    `;

    document.head.appendChild(style);




    // ----- Icônes SVG -----

    var ICONE_CHAT_DEFAUT = `
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <path d="M12 3C7.03 3 3 6.58 3 11c0 2.39 1.19 4.53 3.08 5.99-.1.9-.44 2.1-1.31 3.31-.15.21.02.5.28.46 1.77-.27 3.15-.98 4.09-1.6.9.22 1.86.34 2.86.34 4.97 0 9-3.58 9-8s-4.03-8-9-8z" fill="white"/>
        </svg>
    `;

    var ICONE_BOT_DEFAUT = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M12 3C7.03 3 3 6.58 3 11c0 2.39 1.19 4.53 3.08 5.99-.1.9-.44 2.1-1.31 3.31-.15.21.02.5.28.46 1.77-.27 3.15-.98 4.09-1.6.9.22 1.86.34 2.86.34 4.97 0 9-3.58 9-8s-4.03-8-9-8z" fill="white"/>
        </svg>
    `;

    var ICONE_ENVOYER = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M3 11.5L21 3L14.5 21L11 13L3 11.5Z" fill="white"/>
        </svg>
    `;




    // ----- Construction des éléments -----

    var bulle = document.createElement("button");

    bulle.className = "kadi-bulle";

    bulle.style.background = couleur;

    bulle.innerHTML = iconeUrl
        ? '<img src="' + iconeUrl + '" alt="Chat" />'
        : ICONE_CHAT_DEFAUT;



    var panneau = document.createElement("div");

    panneau.className = "kadi-panneau";


    var entete = document.createElement("div");

    entete.className = "kadi-entete";

    entete.style.background = couleur;

    entete.innerHTML =
        '<div class="kadi-avatar">' +
        (iconeUrl ? '<img src="' + iconeUrl + '" alt="" />' : ICONE_BOT_DEFAUT) +
        '</div>' +
        '<div class="kadi-entete-texte">' +
        '<p class="kadi-entete-titre">Assistant</p>' +
        '<p class="kadi-entete-statut"><span class="kadi-point-vert"></span>En ligne</p>' +
        '</div>';


    var boutonFermer = document.createElement("button");

    boutonFermer.className = "kadi-fermer";

    boutonFermer.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M6 6L18 18M6 18L18 6" stroke="white" stroke-width="2" stroke-linecap="round"/></svg>';

    entete.appendChild(boutonFermer);



    var zoneMessages = document.createElement("div");

    zoneMessages.className = "kadi-messages";



    var zoneSaisie = document.createElement("div");

    zoneSaisie.className = "kadi-saisie";


    var input = document.createElement("input");

    input.className = "kadi-input";

    input.type = "text";

    input.placeholder = "Écrivez votre message...";


    var boutonEnvoyer = document.createElement("button");

    boutonEnvoyer.className = "kadi-envoyer";

    boutonEnvoyer.style.background = couleur;

    boutonEnvoyer.innerHTML = ICONE_ENVOYER;


    zoneSaisie.appendChild(input);
    zoneSaisie.appendChild(boutonEnvoyer);

    panneau.appendChild(entete);
    panneau.appendChild(zoneMessages);
    panneau.appendChild(zoneSaisie);


    document.body.appendChild(bulle);
    document.body.appendChild(panneau);




    function ajouterMessage(role, texte) {

        var bloc = document.createElement("div");

        bloc.className = "kadi-bulle-msg " + (role === "bot" ? "kadi-bulle-bot" : "kadi-bulle-visiteur");

        if (role !== "bot") bloc.style.background = couleur;

        bloc.textContent = texte;

        zoneMessages.appendChild(bloc);

        zoneMessages.scrollTop = zoneMessages.scrollHeight;

    }



    function afficherFrappe() {

        var bloc = document.createElement("div");

        bloc.className = "kadi-typing";

        bloc.id = "kadi-typing-indicator";

        bloc.innerHTML = "<span></span><span></span><span></span>";

        zoneMessages.appendChild(bloc);

        zoneMessages.scrollTop = zoneMessages.scrollHeight;

    }


    function retirerFrappe() {

        var el = document.getElementById("kadi-typing-indicator");

        if (el) el.remove();

    }




    async function envoyerMessage() {

        var texte = input.value.trim();

        if (!texte) return;


        ajouterMessage("visiteur", texte);

        input.value = "";

        boutonEnvoyer.disabled = true;

        afficherFrappe();


        try {

            var res = await fetch(EDGE_FUNCTION_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    cle: cle,
                    message: texte,
                    conversationId: conversationId,
                    langue: navigator.language || "fr"
                })
            });


            var data = await res.json();


            retirerFrappe();

            ajouterMessage("bot", data.reply || "Désolé, une erreur est survenue.");


        } catch (err) {

            retirerFrappe();

            ajouterMessage("bot", "Erreur de connexion. Réessayez.");

        }


        boutonEnvoyer.disabled = false;

    }



    boutonEnvoyer.addEventListener("click", envoyerMessage);

    input.addEventListener("keydown", function (e) {
        if (e.key === "Enter") envoyerMessage();
    });


    var ouvert = false;

    var accueilAffiche = false;


    function toggle() {

        ouvert = !ouvert;

        panneau.classList.toggle("kadi-ouvert", ouvert);


        if (ouvert && !accueilAffiche) {
            ajouterMessage("bot", "Bonjour ! Comment puis-je vous aider ?");
            accueilAffiche = true;
        }

        if (ouvert) input.focus();

    }


    bulle.addEventListener("click", toggle);

    boutonFermer.addEventListener("click", toggle);


})();