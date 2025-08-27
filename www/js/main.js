let timer = 0;
let interval = null;
// Hole alten Wert aus dem localStorage oder 0, wenn keiner vorhanden
let totalWastedTime = parseInt(localStorage.getItem("wastedTime")) || 0;

const timerDisplay = document.getElementById("timer");
const commentDisplay = document.getElementById("comment");
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const resetBtn = document.getElementById("reset");
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
    30: "30 Sekunden? Okey, Entspannung ist wichtig",
    60: "1 Minute! Weiter so",
    180: "3 Minuten nichts, du hättest in der Zeit den Müll raus bringen können",
    480: "8 Minuten konsequent",
    900: "15 Minuten schon, was mache ich hier eigentlich",
    1800: "Halbe Stunde. Das ist nicht nur Zeitvertreib",
    2700: "In 45 Minuten hätte man einen Kuchen backen können. Oder ein Puzzle anfangen. Du nicht.",
    3600: "Eine Stunde. Andere gehen joggen und du sitzt hier...",
    5400: "1,5 Stunden! Du bist doch komplett raus",
    7200: "2 Stunden! Willst du nicht langsam ein Zertifikat für Nichtstun?",
    10800: "Drei Stunden. Manche Menschen schlafen weniger.",
    14400: "4 Stunden. Willkommen im Club der aktiven Inaktivität.",
    21600: "6 Stunden. Soll ich jemanden rufen?",
    28800: "8 Stunden. Ein voller Arbeitstag. Für nichts.",
    43200:
      "12 Stunden... Du hast es ernsthaft durchgezogen. Ich bin beeindruckt. Und etwas besorgt.",
    64800: "18 Stunden.. Ja, was soll ich noch sagen?!",
    86400: "24 Stunden? Glückwunsch!",
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

const itemNames = ["Sanduhr", "Praktikant"];
const inventory = document.getElementById("inventory");

function updateInventory() {
  itemNames.forEach((name) => {
    const count = parseInt(localStorage.getItem(name)) || 0;
    const itemLine = document.createElement("div");
    const btnUseItem = document.createElement("button");
    btnUseItem.textContent = "verwenden";
    btnUseItem.onclick = () => alert("Item verwendet");
    itemLine.textContent = `${name}: ${count} Stück`;
    itemLine.appendChild(btnUseItem);
    inventory.appendChild(itemLine);
  });
}

updateInventory();
