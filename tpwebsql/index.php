<?php
$conn = new mysqli("localhost", "root", "", "user_db");

if ($conn->connect_error) {
    die("Connexion échouée: " . $conn->connect_error);
}

// Supprimer un utilisateur
if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST['action']) && $_POST['action'] === 'supprimer') {
    $id = $_POST['id'];
    $conn->query("DELETE FROM users WHERE id = $id");
}

// Récupérer tous les utilisateurs
$result = $conn->query("SELECT * FROM users");
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Liste des utilisateurs</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"> <!-- Bibliothèque d'animations CSS -->
    <link rel="stylesheet" href="css.css"> <!-- Feuille de style personnalisée -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
</head>
<body>
    <h2>Liste des utilisateurs</h2>

    <table border="1" cellpadding="8">
        <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Email</th>
            <th>Actions</th>
        </tr>
        <?php while($row = $result->fetch_assoc()): ?>
        <tr>
            <td><?= htmlspecialchars($row['nom']) ?></td>
            <td><?= htmlspecialchars($row['prenom']) ?></td>
            <td><?= htmlspecialchars($row['email']) ?></td>
            <td>
                <!-- Bouton Supprimer -->
                <form method="post" style="display:inline;">
                    <input type="hidden" name="id" value="<?= $row['id'] ?>">
                    <input type="hidden" name="action" value="supprimer">
                    <button type="submit">Supprimer</button>
                </form>

                <!-- Bouton Modifier -->
                <form method="get" action="modifier.php" style="display:inline;">
                    <input type="hidden" name="id" value="<?= $row['id'] ?>">
                    <button type="submit">Modifier</button>
                </form>
            </td>
        </tr>
        <?php endwhile; ?>
    </table>

    <hr>

    <!-- Bouton pour rediriger vers la page d'ajout d'utilisateur -->
    <a href="ajouter.php"><button>Ajouter un utilisateur</button></a>
    <script src="https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"></script> <!-- Bibliothèque pour les particules animées -->
    <script src="java.js"></script> <!-- Fichier JavaScript personnalisé -->

</body>
</html>
