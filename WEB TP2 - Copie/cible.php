<!DOCTYPE html> <!-- Déclaration du type de document HTML5 -->
<html lang="fr"> <!-- Début du document HTML avec langue française -->
<head> <!-- En-tête du document -->
    <meta charset="UTF-8"> <!-- Encodage des caractères en UTF-8 -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0"> <!-- Configuration pour le responsive design -->
    <title>Confirmation Premium</title> <!-- Titre de la page affiché dans l'onglet -->
    
    <!-- Liens vers les feuilles de style externes -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"> <!-- Bibliothèque d'animations -->
    <link rel="stylesheet" href="CSS.css"> <!-- Feuille de style personnalisée -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"> <!-- Icônes Font Awesome -->
</head>
<body> <!-- Corps du document -->
    <div class="particles-container" id="particles-js"></div> <!-- Conteneur pour l'animation de particules en fond -->
    
    <!-- Bouton de retour vers la page d'accueil -->
    <a href="master .html" class="back-button animate__animated animate__fadeInLeft">
        <i class="fas fa-arrow-left"></i> <!-- Icône de flèche gauche -->
        <span>Retour à l'accueil</span> <!-- Texte du bouton -->
    </a>

<!-- Style CSS intégré pour le bouton de retour et les animations -->
<style>
    /* Style pour le bouton de retour */
    .back-button {
        position: fixed; /* Position fixe pour rester visible au scroll */
        top: 30px; /* Position depuis le haut */
        left: 30px; /* Position depuis la gauche */
        display: flex; /* Disposition flexbox */
        align-items: center; /* Alignement vertical au centre */
        color: white; /* Couleur du texte */
        text-decoration: none; /* Pas de soulignement */
        font-size: 1.1rem; /* Taille de police */
        font-weight: 500; /* Poids de la police */
        z-index: 100; /* Ordre d'affichage (au-dessus des autres éléments) */
        background: rgba(255, 255, 255, 0.1); /* Fond semi-transparent */
        backdrop-filter: blur(10px); /* Effet de flou derrière le bouton */
        padding: 10px 20px; /* Espacement interne */
        border-radius: 50px; /* Coins arrondis */
        transition: all 0.3s ease; /* Animation de transition */
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1); /* Ombre portée */
        border: 1px solid rgba(255, 255, 255, 0.2); /* Bordure semi-transparente */
    }

    .back-button i {
        margin-right: 8px; /* Marge à droite de l'icône */
        transition: transform 0.3s ease; /* Animation de transformation */
    }

    /* Effet au survol du bouton */
    .back-button:hover {
        background: rgba(255, 255, 255, 0.2); /* Fond plus visible */
        transform: translateX(-5px); /* Déplacement vers la gauche */
    }

    /* Animation de l'icône au survol */
    .back-button:hover i {
        transform: translateX(-3px); /* Déplacement de l'icône */
    }

    /* Animation de transition de page */
    .page-transition-out {
        animation: pageOut 0.8s ease forwards; /* Animation nommée */
    }

    /* Définition de l'animation */
    @keyframes pageOut {
        from { opacity: 1; transform: translateY(0); } /* État initial */
        to { opacity: 0; transform: translateY(50px); } /* État final */
    }
</style>

<!-- JavaScript pour gérer le clic sur le bouton de retour -->
<script>
    // Exécuté quand le DOM est chargé
    document.addEventListener('DOMContentLoaded', function() {
        const backButton = document.querySelector('.back-button'); // Sélection du bouton
        if (backButton) {
            backButton.addEventListener('click', function(e) { // Écouteur d'événement
                e.preventDefault(); // Empêche le comportement par défaut
                document.body.classList.add('page-transition-out'); // Ajoute l'animation
                setTimeout(() => { // Délai avant redirection
                    window.location.href = this.getAttribute('href'); // Redirection
                }, 800); // 800ms = durée de l'animation
            });
        }
    });
</script>
    
    <!-- Conteneur principal de confirmation -->
    <div class="confirmation-container animate__animated animate__zoomIn">
        <div class="confirmation-header">
            <!-- Animation de coche de validation -->
            <div class="checkmark animate__animated animate__bounceIn">
                <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                    <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/> <!-- Cercle de fond -->
                    <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/> <!-- Trait de coche -->
                </svg>
            </div>
            <h1 class="animate__animated animate__fadeInDown">Inscription Confirmée!</h1> <!-- Titre -->
            <p class="animate__animated animate__fadeIn animate__delay-1s">Merci de nous avoir rejoint</p> <!-- Message -->
        </div>
        
        <!-- Conteneur des données utilisateur -->
        <div class="user-data-container animate__animated animate__fadeInUp animate__delay-1s">
            <div class="user-data-card">
            <?php
// Activation du rapport d'erreurs complet (E_ALL) pour le débogage
// Cela affichera tous les types d'erreurs PHP (avertissements, notices, etc.)
error_reporting(E_ALL);

// Configuration pour afficher les erreurs directement dans la page web
// Utile pendant le développement, mais à désactiver en production
ini_set('display_errors', 1);

// Vérifie si la méthode de requête utilisée est POST
// Cela permet de s'assurer que les données proviennent bien d'un formulaire soumis
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    // Récupère et sécurise le nom:
    // - $_POST['nom'] récupère la valeur du champ 'nom' du formulaire
    // - ?? 'Non renseigné' est un opérateur de coalescence null qui fournit une valeur par défaut
    // - htmlspecialchars() convertit les caractères spéciaux en entités HTML pour prévenir les attaques XSS
    $nom = htmlspecialchars($_POST['nom'] ?? 'Non renseigné');
    
    // Récupère et filtre l'email:
    // - filter_var() avec FILTER_SANITIZE_EMAIL supprime les caractères illégaux dans un email
    $email = filter_var($_POST['email'] ?? '', FILTER_SANITIZE_EMAIL);
    
    // Récupère et sécurise le téléphone (même principe que pour le nom)
    $telephone = htmlspecialchars($_POST['telephone'] ?? 'Non renseigné');
    
    // Récupère et sécurise la ville (même principe)
    $ville = htmlspecialchars($_POST['ville'] ?? 'Non renseignée');
    
    // Vérifie si la case newsletter est cochée:
    // - isset() vérifie si la variable existe et n'est pas null
    // - Opérateur ternaire pour afficher "Oui" ou "Non" selon l'état de la case
    $newsletter = isset($_POST['newsletter']) ? 'Oui' : 'Non';
     // Gestion de l'upload de l'image
     $photoPath = '';
     if (isset($_FILES['photo']) && $_FILES['photo']['error'] === UPLOAD_ERR_OK) {
         // Créer un dossier uploads s'il n'existe pas
         if (!file_exists('uploads')) {
             mkdir('uploads', 0777, true);
         }
         
         // Générer un nom de fichier unique
         $extension = pathinfo($_FILES['photo']['name'], PATHINFO_EXTENSION);
         $filename = uniqid() . '.' . $extension;
         $destination = 'uploads/' . $filename;
         
         // Déplacer le fichier uploadé
         if (move_uploaded_file($_FILES['photo']['tmp_name'], $destination)) {
             $photoPath = $destination;
         }
     }
 
} else {
    // Ce bloc s'exécute si la page est accédée directement (sans soumission de formulaire)
    // Affiche un message avec un lien vers le formulaire
    echo "<p>Aucune donnée reçue. <a href='index.html'>Retour au formulaire</a></p>";
    
    // Pourrait aussi inclure un exit() ou die() pour arrêter l'exécution ici
    // exit();
}
?>
                <!-- Affichage des données utilisateur avec animations -->
                <div class="data-item animate__animated animate__fadeInRight" style="--delay: 0.2s">
                   <i class="fas fa-user"></i> <!-- Icône -->
                    <div>
                        <span class="data-label">Nom Complet</span> <!-- Libellé -->
                        <span class="data-value"><?php echo $nom; ?></span> <!-- Valeur -->
                    </div>
                </div>
                
                <div class="data-item animate__animated animate__fadeInRight" style="--delay: 0.4s">
                    <i class="fas fa-envelope"></i>
                    <div>
                        <span class="data-label">Email</span>
                        <span class="data-value"><?php echo $email; ?></span>
                    </div>
                </div>
                
                <div class="data-item animate__animated animate__fadeInRight" style="--delay: 0.6s">
                    <i class="fas fa-phone"></i>
                    <div>
                        <span class="data-label">Téléphone</span>
                        <span class="data-value"><?php echo $telephone; ?></span>
                    </div>
                </div>
                
                <div class="data-item animate__animated animate__fadeInRight" style="--delay: 0.8s">
                    <i class="fas fa-city"></i>
                    <div>
                        <span class="data-label">Ville</span>
                        <span class="data-value"><?php echo $ville; ?></span>
                    </div>
                </div>
                
                <div class="data-item animate__animated animate__fadeInRight" style="--delay: 1s">
                    <i class="fas fa-newspaper"></i>
                    <div>
                        <span class="data-label">Newsletter</span>
                        <span class="data-value"><?php echo $newsletter; ?></span>
                    </div>
                </div>
            </div>
            <div class="data-item animate__animated animate__fadeInRight" style="--delay: 1.2s">
    <i class="fas fa-camera"></i>
    <div>
        <span class="data-label">Photo de profil</span>
        <?php if (!empty($photoPath)): ?>
            <div class="photo-preview">
                <img src="<?php echo $photoPath; ?>" alt="Photo de profil" style="max-width: 150px; max-height: 150px; border-radius: 50%; margin-top: 10px;">
            </div>
        <?php else: ?>
            <span class="data-value">Aucune photo fournie</span>
        <?php endif; ?>
    </div>
</div>
            
            <!-- Bouton pour modifier les informations -->
            <div class="confirmation-actions animate__animated animate__fadeIn animate__delay-1.5s">
                <a href="index.php" class="return-btn">
                    <span>Modifier les informations</span>
                    <i class="fas fa-arrow-right"></i> <!-- Icône de flèche -->
                </a>
            </div>
        </div>
    </div>

    <!-- Scripts JavaScript -->
    <script src="https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"></script> <!-- Bibliothèque particles.js -->
    <script src="java.js"></script> <!-- Fichier JavaScript personnalisé -->
</body>
</html>