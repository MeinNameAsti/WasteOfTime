let timer = 0;
let interval = null;
// Hole alten Wert aus dem localStorage oder 0, wenn keiner vorhanden
let totalWastedTime = parseInt(localStorage.getItem("wastedTime")) || 0;

const timerDisplay = document.getElementById("timer");
const commentDisplay = document.getElementById("comment");
const startBtn = document.getElementById("start"); //hab ich
const stopBtn = document.getElementById("stop"); //hab ich
const resetBtn = document.getElementById("reset"); //hab ich
const wastedTimeDisplay = document.getElementById("wastedTime");
const coinsTimeDisplay = document.getElementById("coins");
const inventoryDisplay = document.getElementById("inventory");

if (startBtn) {
  startBtn.addEventListener("click", () => {
    if (!interval) {
      interval = setInterval(() => {
        timer++;
        updateDisplay();
        updateComment(timer);
      }, 1000);
    }
  });
}

if (stopBtn) {
  stopBtn.addEventListener("click", () => {
    clearInterval(interval);
    interval = null;
  });
}

if (resetBtn) {
  resetBtn.addEventListener("click", () => {
    clearInterval(interval);
    interval = null;
    totalWastedTime += timer; // Zeit vom aktuellen Lauf addieren
    timer = 0;
    updateDisplay(); // Timer zurücksetzen
    updateWastedTime();
    commentDisplay.textContent = "";
    localStorage.setItem("wastedTime", totalWastedTime);
    updateWastedTime(totalWastedTime);
  });
}

function updateDisplay() {
  const minutes = String(Math.floor(timer / 60)).padStart(2, "0");
  const seconds = String(timer % 60).padStart(2, "0");
  timerDisplay.textContent = `${minutes}:${seconds}`;
}

function updateWastedTime() {
  const wastedTimeDisplay = document.getElementById("wastedTime");
  const totalWastedTime = parseInt(localStorage.getItem("wastedTime")) || 0;
  const coins = parseInt(localStorage.getItem("coins")) || 0;
  const minutes = String(Math.floor(totalWastedTime / 60)).padStart(2, "0");
  const seconds = String(totalWastedTime % 60).padStart(2, "0");
  wastedTimeDisplay.textContent = `${minutes}:${seconds}`;
}

function updateComment(seconds) {
  const comments = {
    //Zeiten wurden zum Testen verringert
    5: "30 Sekunden? Okey, Entspannung ist wichtig",
    10: "1 Minute! Weiter so",
    15: "3 Minuten nichts, du hättest in der Zeit den Müll raus bringen können",
    20: "8 Minuten konsequent",
    25: "15 Minuten schon, was mache ich hier eigentlich",
    30: "Halbe Stunde. Das ist nicht nur Zeitvertreib",
    35: "In 45 Minuten hätte man einen Kuchen backen können. Oder ein Puzzle anfangen. Du nicht.",
    40: "Eine Stunde. Andere gehen joggen und du sitzt hier...",
    45: "1,5 Stunden! Du bist doch komplett raus",
    50: "2 Stunden! Willst du nicht langsam ein Zertifikat für Nichtstun?",
    55: "Drei Stunden. Manche Menschen schlafen weniger.",
    60: "4 Stunden. Willkommen im Club der aktiven Inaktivität.",
    65: "6 Stunden. Soll ich jemanden rufen?",
    70: "8 Stunden. Ein voller Arbeitstag. Für nichts.",
    75: "12 Stunden... Du hast es ernsthaft durchgezogen. Ich bin beeindruckt. Und etwas besorgt.",
    80: "18 Stunden.. Ja, was soll ich noch sagen?!",
    85: "24 Stunden? Glückwunsch!",
  };
  if (comments[seconds]) {
    commentDisplay.textContent = comments[seconds];
  }
}

function navigateTo(page) {
  window.location.href = page;
}

updateWastedTime();

window.updateWastedTime = updateWastedTime;
document.addEventListener("DOMContentLoaded", () => {
  const coins = parseInt(localStorage.getItem("coins")) || 0;
  updateCoins(coins);

  const wastedTime = parseInt(localStorage.getItem("wastedTime")) || 0;
  updateWastedTime(wastedTime);
});

function updateInventory() {
  const inventoryDisplay = document.getElementById("inventory");
  inventoryDisplay.textContent = `Item_1`;
}

updateInventory();
