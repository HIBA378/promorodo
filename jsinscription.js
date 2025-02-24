document.getElementById("signup-form").addEventListener("submit", function(event) {
    event.preventDefault();

    let isValid = true;

    // Réinitialisation des messages d'erreur et des bordures
    document.querySelectorAll('.error-message').forEach(function(element) {
        element.textContent = '';
    });

    document.querySelectorAll('input, select').forEach(function(input) {
        input.classList.remove('error-border');
    });

    // Validation du prénom
    let firstName = document.getElementById("first-name").value;
    if (!/^[A-Za-zÀ-ÿ]+$/.test(firstName)) {
        isValid = false;
        document.getElementById("first-name-error").textContent = "Le prénom est invalide.";
        document.getElementById("first-name").classList.add('error-border');
    }

    // Validation du nom
    let lastName = document.getElementById("last-name").value;
    if (!/^[A-Za-zÀ-ÿ]+$/.test(lastName)) {
        isValid = false;
        document.getElementById("last-name-error").textContent = "Le nom est invalide.";
        document.getElementById("last-name").classList.add('error-border');
    }

    // Validation de l'email
    let email = document.getElementById("email").value;
    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email)) {
        isValid = false;
        document.getElementById("email-error").textContent = "L'email est invalide.";
        document.getElementById("email").classList.add('error-border');
    }

    // Validation du mot de passe
    let password = document.getElementById("password").value;
    if (password.length < 6) {
        isValid = false;
        document.getElementById("password-error").textContent = "Le mot de passe doit contenir au moins 6 caractères.";
        document.getElementById("password").classList.add('error-border');
    }

    // Validation du téléphone
    let phone = document.getElementById("phone").value;
    if (!/^\d{10}$/.test(phone)) {
        isValid = false;
        document.getElementById("phone-error").textContent = "Le numéro de téléphone est invalide.";
        document.getElementById("phone").classList.add('error-border');
    }

    // Validation du genre
    let gender = document.getElementById("gender").value;
    if (gender === "") {
        isValid = false;
        document.getElementById("gender-error").textContent = "Veuillez sélectionner un genre.";
        document.getElementById("gender").classList.add('error-border');
    }

    // Validation de la date de naissance
    let dob = document.getElementById("dob").value;
    if (!dob) {
        isValid = false;
        document.getElementById("dob-error").textContent = "Veuillez entrer votre date de naissance.";
        document.getElementById("dob").classList.add('error-border');
    }

    // Validation de l'image (photo)
    let picture = document.getElementById("picture").value;
    if (!picture) {
        isValid = false;
        document.getElementById("picture-error").textContent = "Veuillez télécharger une photo.";
        document.getElementById("picture").classList.add('error-border');
    }

    if (isValid) {
        // Si tout est valide, afficher le pop-up de bienvenue
        document.getElementById("welcome-name").textContent = firstName;
        document.getElementById("welcome-popup").style.display = "flex";
    }
});

// Fermer le pop-up
document.getElementById("close-popup").addEventListener("click", function() {
    document.getElementById("welcome-popup").style.display = "none";
});
