// Déclarations des éléments du DOM et des variables
let workTittle = document.getElementById('work'); // Élément titre de la section travail
let breakTittle = document.getElementById('break'); // Élément titre de la section pause
let minutesDisplay = document.getElementById('minutes'); // Élément affichage des minutes
let secondsDisplay = document.getElementById('seconds'); // Élément affichage des secondes
let startButton = document.getElementById('start'); // Bouton démarrer
let resetButton = document.getElementById('reset'); // Bouton réinitialiser
let pauseButton = document.getElementById('pause'); // Bouton pause

let workTime = 25; // Temps de travail par défaut (25 minutes)
let shortBreakTime = 5; // Temps de pause court par défaut (5 minutes)
let longBreakTime = 15; // Temps de pause long par défaut (15 minutes)
let sessionCount = 0; // Compteur des sessions (pour alterner entre travail et pause)
let minutes = workTime; // Minutes initiales du minuteur
let seconds = 0; // Secondes initiales du minuteur
let interval; // Intervalle du minuteur
let isPaused = false; // Statut du minuteur (s'il est en pause ou non)

window.onload = () => {
    updateDisplay(minutes, seconds); // Mise à jour de l'affichage au chargement
    workTittle.classList.add('active'); // Met en surbrillance la section de travail au démarrage
};

// Fonction pour mettre à jour l'affichage du minuteur
function updateDisplay(mins, secs) {
    minutesDisplay.innerHTML = mins.toString().padStart(2, '0'); // Affiche les minutes avec deux chiffres
    secondsDisplay.innerHTML = secs.toString().padStart(2, '0'); // Affiche les secondes avec deux chiffres
}

// Fonction qui démarre le minuteur
function start() {
    startButton.style.display = "none"; // Cache le bouton start
    pauseButton.style.display = "block"; // Affiche le bouton pause
    resetButton.style.display = "block"; // Affiche le bouton reset

    if (!isPaused) { // Si le minuteur n'est pas en pause
        minutes = workTime; // Initialise le minuteur avec le temps de travail
        seconds = 0; 
    }

    interval = setInterval(timerFunction, 1000); // Démarre le minuteur avec un intervalle de 1 seconde
}

// Fonction qui gère le décompte du minuteur
function timerFunction() {
    if (seconds === 0) { // Si les secondes sont à zéro
        if (minutes === 0) { // Si les minutes sont à zéro
            clearInterval(interval); // Stoppe le minuteur

            showNotification("Temps de travail terminé ! Cliquez pour commencer la pause."); // Affiche la notification
            audio = playSound(); // Joue le son

            sessionCount++; // On incrémente ici pour bien détecter la 4ème session

            if (sessionCount % 4 === 0) { // Si le compteur de session est divisible par 4
                console.log(" Pause longue !");
                startBreak(longBreakTime); // Lancer une pause longue toutes les 4 sessions
            } else {
                console.log(" Pause courte !");
                startBreak(shortBreakTime); // Pause courte sinon
            }
            return; // Sort de la fonction
        } else {
            minutes--; // Décrémente les minutes
            seconds = 59; // Réinitialise les secondes à 59
        }
    } else {
        seconds--; // Décrémente les secondes
    }
    updateDisplay(minutes, seconds); // Met à jour l'affichage
}

// Fonction pour démarrer la pause
function startBreak(breakTime) {
    console.log(`Démarrage d'une pause de ${breakTime} minutes`); // Debugging

    workTittle.classList.remove('active'); // Retire la surbrillance de la section de travail
    breakTittle.classList.add('active'); // Ajoute la surbrillance à la section de pause

    minutes = breakTime; // Initialise les minutes avec le temps de pause
    seconds = 0; 

    clearInterval(interval); // S'assurer qu'aucun autre intervalle ne tourne
    interval = setInterval(breakTimer, 1000); // Démarre le minuteur de pause avec un intervalle de 1 seconde
}

// Fonction qui gère le décompte pendant la pause
function breakTimer() {
    if (seconds === 0) { // Si les secondes sont à zéro
        if (minutes === 0) { // Si les minutes sont à zéro
            clearInterval(interval); // Stoppe le minuteur de pause
            
            workTittle.classList.add('active'); // Ajoute la surbrillance à la section de travail
            breakTittle.classList.remove('active'); // Retire la surbrillance de la section de pause

            startButton.style.display = "block"; // Affiche le bouton start
            pauseButton.style.display = "none"; // Cache le bouton pause
            resetButton.style.display = "none"; // Cache le bouton reset

            minutes = workTime; // Initialise les minutes avec le temps de travail
            seconds = 0; 
            updateDisplay(minutes, seconds); // Met à jour l'affichage

            // Ne pas réinitialiser `sessionCount` ici ! Sinon, la pause longue ne marche jamais
            return;
        } else {
            minutes--; // Décrémente les minutes
            seconds = 59; // Réinitialise les secondes à 59
        }
    } else {
        seconds--; // Décrémente les secondes
    }
    updateDisplay(minutes, seconds); // Met à jour l'affichage
}

// Fonction qui met en pause le minuteur
function pause() {
    clearInterval(interval); // Arrête le minuteur
    isPaused = true; // Définit le statut du minuteur sur "pause"
    startButton.style.display = "block"; // Affiche le bouton start
    pauseButton.style.display = "none"; // Cache le bouton pause
}

// Fonction qui réinitialise le minuteur
function reset() {
    clearInterval(interval); // Arrête le minuteur en cours
    sessionCount = 0; // Réinitialise le compteur de sessions
    isPaused = false; // Définit le statut du minuteur sur "non-paused"
    minutes = workTime; // Réinitialise le temps à celui de travail
    seconds = 0; 
    workTittle.classList.add('active'); // Met en surbrillance la section de travail
    breakTittle.classList.remove('active'); // Retire la surbrillance de la section de pause
    updateDisplay(minutes, seconds); // Met à jour l'affichage
    startButton.style.display = "block"; // Affiche le bouton start
    pauseButton.style.display = "none"; // Cache le bouton pause
    resetButton.style.display = "none"; // Cache le bouton reset
}

// Fonction pour ajouter une tâche
function addTask() {
    const input = document.getElementById("todo-input"); // Champ de saisie
    const task = input.value.trim(); // Récupère et nettoie la tâche

    if (task !== "") { // Si la tâche n'est pas vide
        const list = document.getElementById("todo-list"); // Liste des tâches
        const listItem = document.createElement("li"); // Nouvel élément de liste
        listItem.textContent = task; // Définit le texte de l'élément de liste

        const deleteButton = document.createElement("button"); // Bouton supprimer
        deleteButton.textContent = "Delete"; // Texte du bouton
        deleteButton.onclick = function() { // Définition de l'événement clic
            list.removeChild(listItem); // Supprime l'élément de la liste
        };

        listItem.appendChild(deleteButton); // Ajoute le bouton à l'élément de liste
        list.appendChild(listItem); // Ajoute l'élément de liste à la liste
        input.value = ""; // Vide le champ de saisie
    }
}

// Vérifier si les notifications sont autorisées
function showNotification(message) {
    if (Notification.permission === "granted") { // Si les notifications sont autorisées
        new Notification("Pomodoro Timer", { body: message, icon: "timer-icon.png" }); // Crée et affiche la notification
    } else if (Notification.permission !== "denied") { // Si la permission n'est pas refusée
        Notification.requestPermission().then(permission => { // Demande la permission
            if (permission === "granted") { // Si la permission est accordée
                new Notification("Pomodoro Timer", { body: message, icon: "timer-icon.png" }); // Crée et affiche la notification
            }
        });
    }
}

// Jouer un son
function playSound() {
    let audio = new Audio("Morning Alarm.mp3"); // Crée un nouvel objet audio
    audio.play(); // Joue le son
}

// Modifier la fonction `timerFunction()`
// Modifier la fonction `timerFunction()`
let audio; // Déclaration globale pour l'objet audio

function timerFunction() {
    if (seconds === 0) { // Si les secondes sont à zéro
        if (minutes === 0) { // Si les minutes sont à zéro
            sessionCount++; // Incrémente le compteur de sessions
            clearInterval(interval); // Arrête le minuteur

            // Afficher la notification et jouer le son
            showNotification("Temps de travail terminé ! Cliquez pour commencer la pause.");
            audio = playSound(); // Jouer le son et stocker l'objet audio

            // Vérifier si le bouton existe déjà pour éviter les doublons
            if (!document.getElementById("stop-sound")) { 
                let stopSoundButton = document.createElement("button"); // Crée un nouveau bouton
                stopSoundButton.textContent = "Arrêter le son et commencer la pause"; // Texte du bouton
                stopSoundButton.id = "stop-sound"; // ID du bouton
                stopSoundButton.style.position = "fixed"; // Position fixe du bouton
                stopSoundButton.style.top = "50%"; // Position haute du bouton
                stopSoundButton.style.left = "50%"; // Position gauche du bouton
                stopSoundButton.style.transform = "translate(-50%, -50%)"; // Centrage du bouton
                stopSoundButton.style.padding = "10px 20px"; // Padding du bouton
                stopSoundButton.style.fontSize = "16px"; // Taille de la police
                stopSoundButton.style.backgroundColor = "#ff5555"; // Couleur de fond
                stopSoundButton.style.color = "white"; // Couleur du texte
                stopSoundButton.style.border = "none"; // Sans bordure
                stopSoundButton.style.cursor = "pointer"; // Curseur de la souris
                stopSoundButton.style.zIndex = "1000"; // Niveau d'empilement

                stopSoundButton.onclick = function() {
                    if (audio) { 
                        audio.pause(); // Arrêter le son
                        audio.currentTime = 0; // Remettre le son au début
                    }
                    document.body.removeChild(stopSoundButton); // Supprimer le bouton

                    // Commencer la pause
                    if (sessionCount % 4 === 0) {
                        startBreak(longBreakTime); // Pause longue après 4 sessions
                    } else {
                        startBreak(shortBreakTime); // Pause courte
                    }
                };

                document.body.appendChild(stopSoundButton); // Ajoute le bouton au corps du document
            }
            return; // Sort de la fonction
        } else {
            minutes--; // Décrémente les minutes
            seconds = 59; // Réinitialise les secondes à 59
        }
    } else {
        seconds--; // Décrémente les secondes
    }
    updateDisplay(minutes, seconds); // Met à jour l'affichage
}

// Modifier la fonction playSound() pour retourner l'objet audio
function playSound() {
    let sound = new Audio("Morning Alarm.mp3"); // Crée un nouvel objet audio
    sound.loop = true; // Faire boucler le son jusqu'à l'arrêt manuel
    sound.play(); // Joue le son
    return sound; // Retourne l'objet audio
}

updateDisplay(minutes, seconds); // Met à jour l'affichage
