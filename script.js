// script.js
document.addEventListener('DOMContentLoaded', function() {
    
    // --- Configuration des contacts ---
    const whatsappNumber = "2250757254662"; // Format international sans le '+' pour le lien API
    const emailDestination = "drawandbuildingco@gmail.com";

    // --- GESTION DU MENU MOBILE (Hamburger) ---
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Animation optionnelle des barres du burger
            menuToggle.classList.toggle('is-active'); 
        });

        // Fermer le menu quand on clique sur un lien (pour les ancres #)
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
               if (window.innerWidth <= 768) { // Seulement sur mobile
                   navLinks.classList.remove('active');
                   menuToggle.classList.remove('is-active');
               }
            });
        });
    }


    // --- FONCTION CENTRALE D'ENVOI (WhatsApp + Mail) ---
    function envoyerCommande(titre, corpsTexte) {
        // Encoder les textes pour les URL
        const encodedTitle = encodeURIComponent(titre);
        const encodedBody = encodeURIComponent(corpsTexte);

        // 1. Préparer et ouvrir le lien WhatsApp
        // On ajoute le titre en gras au début du message WhatsApp
        const whatsappMessage = `*${titre}*\n\n${corpsTexte}`;
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
        window.open(whatsappUrl, '_blank');

        // 2. Préparer et ouvrir le lien Mailto après un court délai
        // Le délai est nécessaire car certains navigateurs bloquent deux ouvertures instantanées
        setTimeout(() => {
            const mailtoUrl = `mailto:${emailDestination}?subject=${encodedTitle}&body=${encodedBody}`;
            // Utiliser location.href pour le mailto est souvent plus fiable que window.open
            window.location.href = mailtoUrl;
        }, 800); // 800ms de délai
    }


    // --- Rotation du logo ---
    const logo = document.getElementById('logo');
    if(logo) {
        logo.addEventListener('click', () => {
            logo.classList.toggle('rotate');
            setTimeout(() => logo.classList.remove('rotate'), 500);
        });
    }

    // --- Menu déroulant au clic (Desktop/Mobile) ---
    const dropdownClickLink = document.querySelector('.dropdown-click > a');
    if(dropdownClickLink) {
        dropdownClickLink.addEventListener('click', function(e) {
            e.preventDefault();
            // Trouve le div .dropdown-content-click qui suit
            let content = this.nextElementSibling;
            // Bascule l'affichage
            if (content.style.display === 'block') {
                content.style.display = 'none';
            } else {
                content.style.display = 'block';
            }
        });
    }

    // --- SOUMISSION FORMULAIRE "Plan" ---
    const planForm = document.getElementById('plan-form');
    if (planForm) {
        planForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupère les styles cochés
            const styles = Array.from(document.querySelectorAll('input[id^="style-"]:checked'))
                                .map(cb => cb.nextElementSibling.textContent).join(', ') || 'Aucun spécifié';

            let message = `=== DÉTAILS DE LA COMMANDE ===\n\n`;
            message += `📐 Surface terrain: ${document.getElementById('surface').value} m²\n`;
            message += `🏗️ Travaux: ${document.getElementById('travaux').value}`;
            if (document.getElementById('travaux-autre').value) message += ` (${document.getElementById('travaux-autre').value})`;
            message += `\n🏠 Type: ${document.getElementById('type-maison').value}`;
            if (document.getElementById('type-maison-autre').value) message += ` (${document.getElementById('type-maison-autre').value})`;
            message += `\n🚪 Pièces/niveau: ${document.getElementById('pieces').value}\n`;
            message += `🎨 Style: ${styles}\n\n`;
            message += `=== CONTACT CLIENT ===\n`;
            message += `👤 Nom: ${document.getElementById('nom').value}\n`;
            message += `📞 Tel: ${document.getElementById('tel').value}\n`;
            message += `📧 Email: ${document.getElementById('email').value || 'Non renseigné'}\n\n`;
            message += `⚠️ NOTE IMPORTANTE : L'image du terrain doit être jointe manuellement par le client dans ce message.`;

            envoyerCommande("Nouvelle Commande de Plan - D&B Co.", message);
        });
    }

    // --- SOUMISSION FORMULAIRE "Devis" ---
    const devisForm = document.getElementById('devis-form');
    if (devisForm) {
        devisForm.addEventListener('submit', function(e){
            e.preventDefault();
            let message = `Bonjour,\n\nJe souhaite obtenir un devis pour mon projet.\n\n`;
            message += `👉 VEUILLEZ TROUVER MES PLANS EN PIÈCE JOINTE DE CE MESSAGE.\n\n`;
            message += `Merci.`;
            
            envoyerCommande("Demande de Devis (Plans à joindre) - D&B Co.", message);
        });
    }

    // --- SOUMISSION FORMULAIRES "Travaux Publics" ---
    const setupTravauxForm = (formId, title) => {
        const form = document.getElementById(formId);
        if(form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                // Récupère les labels des checkboxes cochées
                const inputs = Array.from(this.querySelectorAll('input[type="checkbox"]:checked'))
                                    .map(cb => ' - ' + cb.nextElementSibling.textContent).join('\n');
                const autreText = this.querySelector('input[type="text"][id$="-autre"]').value;
                const dureeText = this.querySelector('input[id^="duree-"]').value;

                let message = `=== PROJET TRAVAUX PUBLICS : ${title.toUpperCase()} ===\n\n`;
                message += `✅ Services demandés :\n${inputs || ' - Aucun service spécifique coché'}\n\n`;
                if (autreText) message += `📝 Autres précisions : ${autreText}\n\n`;
                message += `⏱️ Durée estimée souhaitée : ${dureeText}`;

                envoyerCommande(`Demande Travaux Publics (${title}) - D&B Co.`, message);
            });
        }
    }
    // Initialisation des trois formulaires TP
    setupTravauxForm('vrd-form', 'VRD');
    setupTravauxForm('hydraulique-form', 'Hydraulique');
    setupTravauxForm('assainissement-form', 'Assainissement');


    // --- Bouton Payer ---
    const btnPayer = document.getElementById('btn-payer');
    if(btnPayer) {
        btnPayer.addEventListener('click', function() {
            document.getElementById('logos-paiement').style.display = 'block';
            alert("Pour payer, veuillez ouvrir votre application Orange Money et effectuer le transfert au numéro indiqué (non configuré dans cet exemple).");
            // Note : L'ouverture automatique d'une app bancaire est complexe et nécessite des API spécifiques.
        });
    }
    
    // --- Gestion du Panier (Modal) ---
    const modal = document.getElementById('panier-modal');
    const btnPanier = document.getElementById('btn-panier');
    const spanClose = document.querySelector('.close-button');
    const recapContent = document.getElementById('recap-content');

    if (btnPanier && modal && recapContent) {
        btnPanier.onclick = function() {
            let recap = "--- ETAT ACTUEL DU FORMULAIRE ---\n(Ce n'est pas un vrai panier persistant)\n\n";

            // Check formulaire plan
            const surfaceVal = document.getElementById('surface').value;
            if (surfaceVal) {
                recap += `[PLAN EN COURS DE SAISIE]\nSurface: ${surfaceVal} m²\nClient: ${document.getElementById('nom').value}\n\n`;
            } else {
                 recap += "[Aucune commande de plan en cours]\n\n";
            }

            recapContent.textContent = recap;
            modal.style.display = 'block';
        }

        spanClose.onclick = () => modal.style.display = 'none';
        window.onclick = (event) => {
            if (event.target == modal) modal.style.display = 'none';
        }
    }
});

// --- Fonction globale pour les onglets (doit être en dehors du DOMContentLoaded pour l'attribut onclick du HTML) ---
function openTab(tabName, event) {
    // Masquer tous les contenus
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));

    // Désactiver tous les boutons
    const buttons = document.querySelectorAll('.tab-button');
    buttons.forEach(button => button.classList.remove('active'));

    // Activer le contenu et le bouton courant
    document.getElementById(tabName + '-form').classList.add('active');
    event.currentTarget.classList.add('active');
}
