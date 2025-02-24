let workTittle = document.getElementById('work');
let breakTittle = document.getElementById('break');
let minutesDisplay = document.getElementById('minutes');
let secondsDisplay = document.getElementById('seconds');
let startButton = document.getElementById('start');
let resetButton = document.getElementById('reset');
let pauseButton = document.getElementById('pause');

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
    minutesDisplay.innerHTML = mins.toString().padStart(2, '0');
    secondsDisplay.innerHTML = secs.toString().padStart(2, '0');
}

// Fonction qui démarre le minuteur
function start() {
    startButton.style.display = "none"; // Cache le bouton start
    pauseButton.style.display = "block"; // Affiche le bouton pause
    resetButton.style.display = "block"; // Affiche le bouton reset

    if (!isPaused) {
        minutes = workTime; // Initialise le minuteur avec le temps de travail
        seconds = 0;
    }

    interval = setInterval(timerFunction, 1000); // Démarre le minuteur avec un intervalle de 1 seconde
}

// Fonction qui gère le décompte du minuteur
function timerFunction() {
    if (seconds === 0) {
        if (minutes === 0) {
            clearInterval(interval); // Stoppe le minuteur
            showNotification("Temps de travail terminé ! Cliquez pour commencer la pause.");
            audio = playSound();

            sessionCount++; // 🔥 On incrémente ici pour bien détecter la 4ème session

            if (sessionCount % 4 === 0) {
                console.log("💤 Pause longue !");
                startBreak(longBreakTime); // ⏳ Lancer une pause longue toutes les 4 sessions
            } else {
                console.log("🛑 Pause courte !");
                startBreak(shortBreakTime); // Pause courte sinon
            }
            return;
        } else {
            minutes--;
            seconds = 59;
        }
    } else {
        seconds--;
    }
    updateDisplay(minutes, seconds);
}



// Fonction pour démarrer la pause
function startBreak(breakTime) {
    console.log(`Démarrage d'une pause de ${breakTime} minutes`); // 🔍 Debugging

    workTittle.classList.remove('active');
    breakTittle.classList.add('active');

    minutes = breakTime;
    seconds = 0;

    clearInterval(interval); // 🔥 S'assurer qu'aucun autre intervalle ne tourne
    interval = setInterval(breakTimer, 1000);
}


// Fonction qui gère le décompte pendant la pause
function breakTimer() {
    if (seconds === 0) {
        if (minutes === 0) {
            clearInterval(interval); // Stoppe le minuteur de pause
            
            workTittle.classList.add('active');
            breakTittle.classList.remove('active');

            startButton.style.display = "block";
            pauseButton.style.display = "none";
            resetButton.style.display = "none";

            minutes = workTime;
            seconds = 0;
            updateDisplay(minutes, seconds);

            // 🛑 Ne pas réinitialiser `sessionCount` ici ! Sinon, la pause longue ne marche jamais
            return;
        } else {
            minutes--;
            seconds = 59;
        }
    } else {
        seconds--;
    }
    updateDisplay(minutes, seconds);
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
function addTask() {
    const input = document.getElementById("todo-input");
    const task = input.value.trim();
    
    if (task !== "") {
        const list = document.getElementById("todo-list");
        const listItem = document.createElement("li");
        listItem.textContent = task;
        
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.onclick = function() {
            list.removeChild(listItem);
        };
        
        listItem.appendChild(deleteButton);
        list.appendChild(listItem);
        input.value = "";
    }
}
// Vérifier si les notifications sont autorisées
function showNotification(message) {
    if (Notification.permission === "granted") {
        new Notification("Pomodoro Timer", { body: message, icon: "timer-icon.png" });
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                new Notification("Pomodoro Timer", { body: message, icon: "timer-icon.png" });
            }
        });
    }
}

// Jouer un son
function playSound() {
    let audio = new Audio("Morning Alarm.mp3"); // Assure-toi d'avoir un fichier "notification.mp3"
    audio.play();
}

// Modifier la fonction `timerFunction()`
let audio; // Déclaration globale pour l'objet audio

function timerFunction() {
    if (seconds === 0) {
        if (minutes === 0) {
            sessionCount++; // Incrémente le compteur de sessions
            clearInterval(interval); // Arrête le minuteur
            
            // 🔔 Afficher la notification et jouer le son
            showNotification("Temps de travail terminé ! Cliquez pour commencer la pause.");
            audio = playSound(); // Jouer le son et stocker l'objet audio

            // Vérifier si le bouton existe déjà pour éviter les doublons
            if (!document.getElementById("stop-sound")) {
                let stopSoundButton = document.createElement("button");
                stopSoundButton.textContent = "Arrêter le son et commencer la pause";
                stopSoundButton.id = "stop-sound";
                stopSoundButton.style.position = "fixed";
                stopSoundButton.style.top = "50%";
                stopSoundButton.style.left = "50%";
                stopSoundButton.style.transform = "translate(-50%, -50%)";
                stopSoundButton.style.padding = "10px 20px";
                stopSoundButton.style.fontSize = "16px";
                stopSoundButton.style.backgroundColor = "#ff5555";
                stopSoundButton.style.color = "white";
                stopSoundButton.style.border = "none";
                stopSoundButton.style.cursor = "pointer";
                stopSoundButton.style.zIndex = "1000";

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

                document.body.appendChild(stopSoundButton);
            }
        } else {
            minutes--;
            seconds = 59;
        }
    } else {
        seconds--;
    }
    updateDisplay(minutes, seconds);
}

// Modifier la fonction playSound() pour retourner l'objet audio
function playSound() {
    let sound = new Audio("Morning Alarm.mp3");
    sound.loop = true; // Faire boucler le son jusqu'à l'arrêt manuel
    sound.play();
    return sound;
}

    updateDisplay(minutes, seconds);

