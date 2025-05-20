<?php
$conn = new mysqli("localhost", "root", "", "user_db");

if ($conn->connect_error) {
    die("Connexion échouée: " . $conn->connect_error);
}

// Récupérer l'ID de l'utilisateur à modifier
$id = $_GET['id'] ?? null;

if ($id) {
    // Récupérer les informations actuelles de l'utilisateur
    $result = $conn->query("SELECT * FROM users WHERE id = $id");
    $user = $result->fetch_assoc();

    if (!$user) {
        die("Utilisateur non trouvé.");
    }

    // Modifier l'utilisateur
    if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST['action']) && $_POST['action'] === 'modifier') {
        $nom = $_POST['nom'];
        $prenom = $_POST['prenom'];
        $email = $_POST['email'];

        $conn->query("UPDATE users SET nom='$nom', prenom='$prenom', email='$email' WHERE id=$id");

        header("Location: index.php");
        exit();
    }
} else {
    die("Aucun utilisateur spécifié.");
}
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Modifier l'utilisateur</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"> <!-- Bibliothèque d'animations CSS -->
    <link rel="stylesheet" href="css.css"> <!-- Feuille de style personnalisée -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
</head>
<body>
    <h2>Modifier un utilisateur</h2>

    <form method="post">
        <input type="hidden" name="action" value="modifier">

        <label>Nom:</label>
        <input type="text" name="nom" value="<?= htmlspecialchars($user['nom']) ?>" required><br><br>

        <label>Prénom:</label>
        <input type="text" name="prenom" value="<?= htmlspecialchars($user['prenom']) ?>" required><br><br>

        <label>Email:</label>
        <input type="email" name="email" value="<?= htmlspecialchars($user['email']) ?>" required><br><br>

        <button type="submit">Modifier</button>
    </form>

    <a href="index.php"><button>Retour à la liste</button></a>
    <script src="https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"></script> <!-- Bibliothèque pour les particules animées -->
    <script src="java.js"></script> <!-- Fichier JavaScript personnalisé -->
</body>
</html>
