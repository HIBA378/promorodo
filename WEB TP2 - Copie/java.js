// Attend que le DOM soit complètement chargé avant d'exécuter le code
document.addEventListener('DOMContentLoaded', function() {

    // =============================================
    // 1. INITIALISATION DES PARTICULES (BACKGROUND)
    // =============================================
    particlesJS('particles-js', {
        particles: {
            number: { 
                value: 80,               // Nombre de particules
                density: { 
                    enable: true,         // Active la densité
                    value_area: 800       // Zone de répartition
                } 
            },
            color: { value: "#4cc9f0" }, // Couleur des particules
            shape: { type: "circle" },    // Forme (rond)
            opacity: { 
                value: 0.5,               // Opacité de base
                random: true              // Variation aléatoire
            },
            size: { 
                value: 3,                 // Taille de base
                random: true              // Variation aléatoire
            },
            line_linked: { 
                enable: true,             // Active les liens entre particules
                distance: 150,            // Distance max entre particules liées
                color: "#4cc9f0",         // Couleur des liens
                opacity: 0.4,            // Opacité des liens
                width: 1                  // Épaisseur des liens
            },
            move: { 
                enable: true,             // Active le mouvement
                speed: 2,                 // Vitesse
                direction: "none",        // Pas de direction privilégiée
                random: true,             // Mouvement aléatoire
                straight: false,          // Pas de déplacement linéaire
                out_mode: "out"           // Comportement en bordure
            }
        },
        interactivity: {
            detect_on: "canvas",          // Zone interactive
            events: {
                onhover: { 
                    enable: true,         // Effet au survol
                    mode: "repulse"      // Répulsion des particules
                },
                onclick: { 
                    enable: true,        // Effet au clic
                    mode: "push"        // Ajout de particules
                }
            }
        }
    });

    // =============================================
    // 2. ANIMATION DES CHAMPS DE FORMULAIRE
    // =============================================
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach((group, index) => {
        // Initialisation de l'état invisible
        group.style.opacity = '0';
        group.style.transform = 'translateY(20px)';
        // Transition avec délai progressif
        group.style.transition = `all 0.5s ease ${index * 0.1}s`;
        
        // Animation après un léger délai
        setTimeout(() => {
            group.style.opacity = '1';
            group.style.transform = 'translateY(0)';
        }, 100);
    });

    // =============================================
    // 3. EFFET DE VAGUE SUR LE BOUTON DE SOUMISSION
    // =============================================
    const submitBtn = document.querySelector('.submit-btn');
    if (submitBtn) {
        // Effet au survol
        submitBtn.addEventListener('mouseenter', function() {
            this.querySelectorAll('.submit-btn-border').forEach(border => {
                border.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            });
        });
        
        // Retour à l'état initial
        submitBtn.addEventListener('mouseleave', function() {
            this.querySelectorAll('.submit-btn-border').forEach(border => {
                border.style.transition = 'all 0.3s ease';
            });
        });
    }

     // =============================================
    // MODIFICATIONS POUR L'UPLOAD DE PHOTO
    // =============================================

    // 1. Prévisualisation de la photo avant upload
    const photoInput = document.getElementById('photo');
    if (photoInput) {
        photoInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                // Vérification du type de fichier
                if (!file.type.match('image.*')) {
                    animateError(photoInput, 'Seules les images sont autorisées');
                    return;
                }

                // Vérification de la taille (max 2MB)
                if (file.size > 2 * 1024 * 1024) {
                    animateError(photoInput, 'La photo doit faire moins de 2MB');
                    return;
                }

                // Création de la prévisualisation
                const reader = new FileReader();
                reader.onload = function(event) {
                    // Supprime l'ancienne prévisualisation si elle existe
                    const oldPreview = document.getElementById('photo-preview');
                    if (oldPreview) {
                        oldPreview.remove();
                    }

                    // Crée un élément img pour la prévisualisation
                    const preview = document.createElement('img');
                    preview.id = 'photo-preview';
                    preview.src = event.target.result;
                    preview.style.maxWidth = '100px';
                    preview.style.maxHeight = '100px';
                    preview.style.borderRadius = '50%';
                    preview.style.marginTop = '10px';
                    preview.style.objectFit = 'cover';

                    // Ajoute la prévisualisation après le champ
                    photoInput.parentNode.appendChild(preview);
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // 2. Modification de la validation du formulaire
    const form = document.getElementById('premiumForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            let isValid = true;
            
            // Validation du nom
            const nom = document.getElementById('nom');
            if (nom.value.trim() === '') {
                animateError(nom, 'Le nom est requis');
                isValid = false;
            }
            
            // Validation de l'email
            const email = document.getElementById('email');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value)) {
                animateError(email, 'Veuillez entrer un email valide');
                isValid = false;
            }
            
            // Validation de la photo
            const photo = document.getElementById('photo');
            if (photo && photo.files.length === 0) {
                animateError(photo, 'Une photo de profil est requise');
                isValid = false;
            }
            
            if (!isValid) {
                e.preventDefault();
                animateShake(form);
            } else {
                // Animation de succès avant soumission
                showLoadingAnimation();
            }
        });
    }

    // 3. Fonction pour afficher une animation de chargement
    function showLoadingAnimation() {
        const submitBtn = document.querySelector('.submit-btn');
        if (submitBtn) {
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
            submitBtn.disabled = true;
        }
    }

    // 4. Affichage de la photo sur la page de confirmation
    if (window.location.pathname.includes('confirmation.php')) {
        const photoUrl = new URLSearchParams(window.location.search).get('photo');
        if (photoUrl) {
            const photoContainer = document.createElement('div');
            photoContainer.className = 'user-photo-container';
            
            const img = document.createElement('img');
            img.src = photoUrl;
            img.alt = 'Photo de profil';
            img.className = 'user-photo';
            
            photoContainer.appendChild(img);
            
            // Trouve où insérer la photo (après les autres données)
            const dataItems = document.querySelector('.user-data-card');
            if (dataItems) {
                const photoItem = document.createElement('div');
                photoItem.className = 'data-item animate__animated animate__fadeInRight photo-item';
                photoItem.style.setProperty('--delay', '1.2s');
                
                const icon = document.createElement('i');
                icon.className = 'fas fa-camera';
                
                const div = document.createElement('div');
                const label = document.createElement('span');
                label.className = 'data-label';
                label.textContent = 'Photo de profil';
                
                div.appendChild(label);
                div.appendChild(photoContainer);
                
                photoItem.appendChild(icon);
                photoItem.appendChild(div);
                
                dataItems.appendChild(photoItem);
            }
        }
    }
});
    // =============================================
    // 5. FONCTION D'ANIMATION D'ERREUR
    // =============================================
    function animateError(input, message) {
        const formGroup = input.parentElement;
        
        // Crée un élément d'erreur
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.color = 'var(--error-color)';
        errorDiv.style.position = 'absolute';
        errorDiv.style.bottom = '-20px';
        errorDiv.style.left = '45px';
        errorDiv.style.fontSize = '12px';
        errorDiv.style.opacity = '0';
        errorDiv.style.transform = 'translateY(10px)';
        errorDiv.style.transition = 'all 0.3s ease';
        
        // Supprime les anciens messages d'erreur
        const existingError = formGroup.querySelector('.error-message');
        if (existingError) {
            formGroup.removeChild(existingError);
        }
        
        // Ajoute le nouveau message
        formGroup.appendChild(errorDiv);
        
        // Anime l'apparition
        setTimeout(() => {
            errorDiv.style.opacity = '1';
            errorDiv.style.transform = 'translateY(0)';
        }, 10);
        
        // Change la couleur de la bordure
        input.style.borderBottomColor = 'var(--error-color)';
        formGroup.querySelector('.underline').style.backgroundColor = 'var(--error-color)';
        
        // Animation de vibration
        input.style.animation = 'shake 0.5s';
        setTimeout(() => {
            input.style.animation = '';
        }, 500);
        
        // Réinitialisation lors de la saisie
        input.addEventListener('input', function() {
            input.style.borderBottomColor = 'var(--primary-color)';
            formGroup.querySelector('.underline').style.backgroundColor = 'var(--primary-color)';
            if (errorDiv.parentNode === formGroup) {
                errorDiv.style.opacity = '0';
                setTimeout(() => {
                    formGroup.removeChild(errorDiv);
                }, 300);
            }
        });
    }
    
    // =============================================
    // 6. ANIMATION DE SECOUSSES (SHAKE)
    // =============================================
    function animateShake(element) {
        element.style.animation = 'shake 0.5s';
        setTimeout(() => {
            element.style.animation = '';
        }, 500);
    }
    
    // =============================================
    // 7. AJOUT DYNAMIQUE DE L'ANIMATION SHAKE
    // =============================================
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(style);

    // =============================================
    // 8. ANIMATION DES ÉLÉMENTS DE CONFIRMATION
    // =============================================
    if (document.querySelector('.data-item')) {
        const dataItems = document.querySelectorAll('.data-item');
        dataItems.forEach(item => {
            // Récupère le délai personnalisé (CSS variable)
            const delay = getComputedStyle(item).getPropertyValue('--delay') || '0s';
            item.style.animationDelay = delay;
        });
    }



    