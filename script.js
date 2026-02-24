document.addEventListener('DOMContentLoaded', function() {
    const whatsappNumber = "2250757254662"; 
    const emailDestination = "drawandbuildingco@gmail.com";
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const loader = document.getElementById('loader');

    // Menu Mobile
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('is-active');
        });
    }

    // Fermeture menu au clic lien
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('is-active');
        });
    });

    // Envoi avec Loader
    function envoyerCommande(titre, corpsTexte) {
        if (loader) loader.style.display = 'flex';

        const whatsappMessage = `*${titre}*\n\n${corpsTexte}`;
        window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`, '_blank');

        setTimeout(() => {
            window.location.href = `mailto:${emailDestination}?subject=${encodeURIComponent(titre)}&body=${encodeURIComponent(corpsTexte)}`;
            setTimeout(() => { if (loader) loader.style.display = 'none'; }, 1000);
        }, 800); 
    }

    // Logo Rotation
    const logo = document.getElementById('logo');
    if(logo) {
        logo.addEventListener('click', () => {
            logo.classList.toggle('rotate');
            setTimeout(() => logo.classList.remove('rotate'), 500);
        });
    }

    // Formulaires (Exemple Plan)
    const planForm = document.getElementById('plan-form');
    if (planForm) {
        planForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let message = `📐 Surface: ${document.getElementById('surface').value} m²\n👤 Nom: ${document.getElementById('nom').value}`;
            envoyerCommande("Nouvelle Commande de Plan", message);
        });
    }
    
    // [Ajoutez ici vos autres gestionnaires de formulaires Devis et Travaux Publics]
});

function openTab(tabName, event) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
    document.getElementById(tabName + '-form').classList.add('active');
    event.currentTarget.classList.add('active');
}
