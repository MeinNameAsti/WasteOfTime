let timer = 0;
let interval = null;

const timerDisplay = document.getElementById("timer");
const commentDisplay = document.getElementById("comment");
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const resetBtn = document.getElementById("reset");

startBtn.addEventListener("click", () => {
  if (!interval) {
    interval = setInterval(() => {
      timer++;
      updateDisplay();
      updateComment(timer);
    }, 1000);
  }
});

stopBtn.addEventListener("click", () => {
  clearInterval(interval);
  interval = null;
});

resetBtn.addEventListener("click", () => {
  clearInterval(interval);
  interval = null;
  timer = 0;
  updateDisplay();
  commentDisplay.textContent = "";
});

function updateDisplay() {
  const minutes = String(Math.floor(timer / 60)).padStart(2, "0");
  const seconds = String(timer % 60).padStart(2, "0");
  timerDisplay.textContent = `${minutes}:${seconds}`;
}

function updateComment(seconds) {
  const comments = {
    //Zeiten wurden zum Testen verringert
    5: "30 Sekunden? Okey, Entspannung ist wichtig",
    10: "1 Minute! Weiter so",
    15: "3 Minuten nichts, du hättest in der Zeit den Müll raus bringen können",
    20: "8 Minuten konsequent",
    25: "15 Minuten schon, was mache ich hier eigentlich",
    30: "Habe ich wirklich 20 Minuten NICHTS getan?",
  };
  if (comments[seconds]) {
    commentDisplay.textContent = comments[seconds];
  }
}
