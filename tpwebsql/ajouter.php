<?php
$conn = new mysqli("localhost", "root", "", "user_db");

if ($conn->connect_error) {
    die("Connexion échouée: " . $conn->connect_error);
}

// Ajouter un utilisateur
if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST['action']) && $_POST['action'] === 'ajouter') {
    $nom = $_POST['nom'];
    $prenom = $_POST['prenom'];
    $email = $_POST['email'];

    // Insertion dans la base de données
    $conn->query("INSERT INTO users (nom, prenom, email) VALUES ('$nom', '$prenom', '$email')");
    
    // Rediriger vers la page principale après ajout
    header("Location: index.php");
    exit();
}
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ajouter un utilisateur</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"> <!-- Bibliothèque d'animations CSS -->
    <link rel="stylesheet" href="css.css"> <!-- Feuille de style personnalisée -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
</head>
<body>
    <h2>Ajouter un utilisateur</h2>

    <form method="post">
        <input type="hidden" name="action" value="ajouter">

        <label>Nom:</label>
        <input type="text" name="nom" required><br><br>

        <label>Prénom:</label>
        <input type="text" name="prenom" required><br><br>

        <label>Email:</label>
        <input type="email" name="email" required><br><br>

        <button type="submit">Ajouter</button>
    </form>

    <a href="index.php"><button>Retour à la liste</button></a>
    <script src="https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"></script> <!-- Bibliothèque pour les particules animées -->
    <script src="java.js"></script> <!-- Fichier JavaScript personnalisé -->
</body>
</html>
