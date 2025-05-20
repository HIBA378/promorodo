<!DOCTYPE html> <!-- Déclaration du type de document comme étant HTML5 -->
<html lang="fr"> <!-- Balise racine du document avec spécification de la langue (français) -->
<head> <!-- Section d'en-tête du document contenant les métadonnées -->
    <meta charset="UTF-8"> <!-- Définition de l'encodage des caractères en UTF-8 -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0"> <!-- Configuration pour le responsive design -->
    <title>Inscription Premium</title> <!-- Titre de la page qui s'affiche dans l'onglet du navigateur -->
    
    <!-- Liens vers les feuilles de style externes -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"> <!-- Bibliothèque d'animations CSS -->
    <link rel="stylesheet" href="CSS.css"> <!-- Feuille de style personnalisée -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"> <!-- Bibliothèque d'icônes Font Awesome -->
</head>
<body> <!-- Corps du document - contenu visible de la page -->
    <div class="particles-container" id="particles-js"></div> <!-- Conteneur pour les particules animées en fond -->
    
    <!-- Conteneur principal du formulaire -->
    <div class="form-container animate__animated animate__zoomIn"> <!-- Animation de zoom à l'apparition -->
        <div class="form-header"> <!-- En-tête du formulaire -->
            <div class="logo animate__animated animate__bounceIn"> <!-- Logo avec animation rebondissante -->
                <i class="fas fa-user-plus"></i> <!-- Icône d'utilisateur avec signe + -->
            </div>
            <h1 class="animate__animated animate__fadeInDown">Inscription Premium</h1> <!-- Titre avec animation de fondu vers le bas -->
            <p class="animate__animated animate__fadeIn animate__delay-1s">Rejoignez notre communauté exclusive</p> <!-- Sous-titre avec animation retardée -->
        </div>
        
        <!-- Formulaire d'inscription -->
        <!-- Modifiez la balise form pour ajouter enctype -->
<form id="premiumForm" action="cible.php" method="post" enctype="multipart/form-data" class="animate__animated animate__fadeInUp animate__delay-1s"><!-- Formulaire avec animation -->
            <!-- Groupe de champ pour le nom complet -->
            <div class="form-group floating-label"> <!-- Conteneur avec label flottant -->
                <input type="text" id="nom" name="nom" required> <!-- Champ de saisie texte obligatoire -->
                <label for="nom">Nom Complet</label> <!-- Libellé du champ -->
                <div class="underline"></div> <!-- Ligne de soulignement décorative -->
                <i class="fas fa-user icon"></i> <!-- Icône d'utilisateur -->
            </div>
            
            <!-- Groupe de champ pour l'email -->
            <div class="form-group floating-label">
                <input type="email" id="email" name="email" required> <!-- Champ de saisie email obligatoire -->
                <label for="email">Email</label>
                <div class="underline"></div>
                <i class="fas fa-envelope icon"></i> <!-- Icône d'enveloppe -->
            </div>
            
            <!-- Groupe de champ pour le téléphone -->
            <div class="form-group floating-label">
                <input type="tel" id="telephone" name="telephone"> <!-- Champ de saisie téléphone -->
                <label for="telephone">Téléphone</label>
                <div class="underline"></div>
                <i class="fas fa-phone icon"></i> <!-- Icône de téléphone -->
            </div>
            
            <!-- Groupe de champ pour la ville (menu déroulant) -->
            <div class="form-group floating-label">
                <select id="ville" name="ville"> <!-- Liste déroulante de sélection -->
                    <option value=""></option> <!-- Option vide par défaut -->
                    <option value="Agadir">Agadir</option> <!-- Option 1 -->
                    <option value="Ouarzazate">Ouarzazate</option> <!-- Option 2 -->
                    <option value="Rabat">Rabat</option> <!-- Option 3 -->
                </select>
                <label for="ville">Ville</label>
                <div class="underline"></div>
                <i class="fas fa-city icon"></i> <!-- Icône de ville -->
            </div>
            <div class="form-group floating-label">
                   <input type="file" id="photo" name="photo" accept="image/*" required>
                           <label for="photo">Photo de profil</label>
                           <div class="underline"></div>
                              <i class="fas fa-camera icon"></i>
</div>
            
            <!-- Case à cocher pour la newsletter -->
            <div class="form-group checkbox-group animate__animated animate__fadeIn animate__delay-2s"> <!-- Animation retardée -->
                <input type="checkbox" id="newsletter" name="newsletter"> <!-- Case à cocher -->
                <label for="newsletter">
                    <span class="checkbox-custom"></span> <!-- Case personnalisée -->
                    S'abonner à la newsletter <!-- Texte de la case -->
                </label>
            </div>
            
            <!-- Bouton de soumission du formulaire -->
            <button type="submit" class="submit-btn"> <!-- Bouton d'envoi -->
                <span>S'inscrire</span> <!-- Texte du bouton -->
                <!-- Bordures décoratives animées -->
                <div class="submit-btn-border"></div>
                <div class="submit-btn-border"></div>
                <div class="submit-btn-border"></div>
                <div class="submit-btn-border"></div>
            </button>
        </form>
    </div>

    <!-- Scripts JavaScript externes -->
    <script src="https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"></script> <!-- Bibliothèque pour les particules animées -->
    <script src="java.js"></script> <!-- Fichier JavaScript personnalisé -->
</body>
</html>