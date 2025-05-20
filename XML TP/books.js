// Charger le fichier XML en utilisant la fonction fetch
fetch('books1.xml')  // Fait une requête HTTP pour récupérer le fichier XML nommé 'books1.xml'
    .then(response => response.text())  // Convertit la réponse HTTP en texte brut (format XML)
    .then(data => {
        // Crée un analyseur XML pour transformer la chaîne en un document DOM
        const parser = new DOMParser();  // Crée un objet DOMParser pour analyser le texte XML
        const xmlDoc = parser.parseFromString(data, "application/xml");  // Parse le texte en tant que document XML DOM
        const books = xmlDoc.getElementsByTagName("book");  // Récupère tous les éléments <book> du fichier XML

        // Sélectionne l'élément HTML où le tableau sera affiché
        const demo = document.getElementById("booksTable");  // Sélectionne l'élément avec l'ID "booksTable"

        // Fonction pour afficher les livres dans un tableau HTML
        const displayBooks = () => {
            // Initialisation du tableau avec les en-têtes de colonnes
            let tableHTML = `
                <table>
                    <thead>
                        <tr>
                            <th>Titre</th>   <!-- Colonne pour le titre du livre -->
                            <th>Auteur</th>  <!-- Colonne pour l'auteur -->
                            <th>Année</th>   <!-- Colonne pour l'année de publication -->
                            <th>Prix</th>    <!-- Colonne pour le prix -->
                        </tr>
                    </thead>
                    <tbody>
            `;

            // Boucle pour parcourir chaque livre trouvé dans le fichier XML
            Array.from(books).forEach(book => {
                // Récupère les informations du livre en vérifiant leur existence
                const title = book.getElementsByTagName("title")[0]?.textContent || "Inconnu";  // Titre du livre ou "Inconnu" si non défini
                const author = book.getElementsByTagName("author")[0]?.textContent || "Anonyme";  // Auteur ou "Anonyme" si non défini
                const year = book.getElementsByTagName("year")[0]?.textContent || "N/A";  // Année de publication ou "N/A" si non défini
                const price = book.getElementsByTagName("price")[0];  // Récupère l'élément <price>
                const currency = price?.getAttribute("currency") || "dollars";  // Devise ou "dollars" par défaut
                const priceValue = price?.textContent || "N/A";  // Valeur du prix ou "N/A" si non défini

                // Ajoute une ligne de tableau pour chaque livre avec les données extraites
                tableHTML += `
                    <tr>
                        <td>${title}</td>     <!-- Cellule contenant le titre du livre -->
                        <td>${author}</td>    <!-- Cellule contenant le nom de l'auteur -->
                        <td>${year}</td>      <!-- Cellule contenant l'année de publication -->
                        <td>${priceValue} ${currency}</td>  <!-- Cellule avec le prix et la devise -->
                    </tr>
                `;
            });

            // Termine la structure du tableau
            tableHTML += `
                    </tbody>
                </table>
            `;

            // Injecte le tableau complet dans la page HTML
            demo.innerHTML = tableHTML;  // Met à jour l'élément "booksTable" avec le contenu généré
        };

        // Création d'un nouveau livre à ajouter à la collection
        const newBook = xmlDoc.createElement("book");  // Crée un nouvel élément <book>
        newBook.setAttribute("category", "science");  // Attribue une catégorie "science" au livre

        // Création et ajout des sous-éléments (titre, auteur, année, prix) au livre
        const newTitle = xmlDoc.createElement("title");  // Crée un élément <title>
        newTitle.setAttribute("lang", "en");  // Définit l'attribut de langue à "en"
        newTitle.textContent = "A Brief History of Time";  // Texte du titre

        const newAuthor = xmlDoc.createElement("author");  // Crée un élément <author>
        newAuthor.textContent = "Stephen Hawking";  // Texte de l'auteur

        const newYear = xmlDoc.createElement("year");  // Crée un élément <year>
        newYear.textContent = "1988";  // Texte de l'année de publication

        const newPrice = xmlDoc.createElement("price");  // Crée un élément <price>
        newPrice.setAttribute("currency", "dollars");  // Définit la devise en "dollars"
        newPrice.textContent = "15.99";  // Valeur du prix

        // Regroupe tous les éléments créés dans le nouvel élément <book>
        newBook.appendChild(newTitle);
        newBook.appendChild(newAuthor);
        newBook.appendChild(newYear);
        newBook.appendChild(newPrice);

        // Insère le nouveau livre avant le dernier livre existant
        const lastBook = books[books.length - 1];  // Sélectionne le dernier livre de la liste
        lastBook.parentNode.insertBefore(newBook, lastBook);  // Ajoute le nouveau livre juste avant le dernier

        // Modifie le titre du deuxième livre pour le mettre à jour
        const secondBook = books[1];  // Sélectionne le deuxième livre dans la liste
        if (secondBook) {
            const title = secondBook.getElementsByTagName("title")[0];  // Récupère l'élément <title>
            if (title) title.textContent = "Harry Potter - Updated Edition";  // Met à jour le texte du titre
        }

        // Ajouter un attribut de devise "dollars" à tous les prix qui n'en ont pas
        Array.from(books).forEach(book => {
            const price = book.getElementsByTagName("price")[0];  // Récupère l'élément <price> de chaque livre
            if (price && !price.getAttribute("currency")) {  // Vérifie si l'attribut "currency" est manquant
                price.setAttribute("currency", "dollars");  // Ajoute l'attribut "currency" avec la valeur "dollars"
            }
        });

        // Affiche tous les livres après les modifications
        displayBooks();  // Appelle la fonction pour afficher la liste des livres mise à jour
    })
    .catch(error => console.error("Erreur lors du chargement du fichier XML :", error));  // Gère les erreurs de chargement du fichier XML
