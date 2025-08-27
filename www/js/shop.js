window.addEventListener("DOMContentLoaded", () => {
  const display = document.getElementById("wastedTime");
  if (!display) {
    console.error("Element mit ID 'profilWastedTime' nicht gefunden.");
    return;
  }

  const savedTime = parseInt(localStorage.getItem("wastedTime")) || 0;
  const minutes = String(Math.floor(savedTime / 60)).padStart(2, "0");
  const seconds = String(savedTime % 60).padStart(2, "0");

  display.textContent = `${minutes}:${seconds}`;
});

function goBack() {
  window.location.href = "main.html";
}
window.goBack = goBack;

function buyConverter() {
  let totalWastedTime = parseInt(localStorage.getItem("wastedTime")) || 0;
  let coins = parseInt(localStorage.getItem("coins")) || 0;
  if (totalWastedTime < 15) {
    alert(`Nicht genug 'Zeit'`);
  } else {
    totalWastedTime -= 15;
    coins += 5;
    localStorage.setItem("wastedTime", totalWastedTime);
    localStorage.setItem("coins", coins);
    updateWastedTime(totalWastedTime);
    updateCoins(coins);
  }
}
window.buyConverter = buyConverter;

function buyItemTimer(itemName = "Sanduhr") {
  let coins = parseInt(localStorage.getItem("coins")) || 0;
  if (coins < 100) {
    alert(`Nicht genug Münzen für Sanduhr`);
  } else {
    coins -= 100;
    localStorage.setItem("coins", coins);

    let itemCount = parseInt(localStorage.getItem(itemName)) || 0;
    itemCount++;
    localStorage.setItem(itemName, itemCount);

    updateCoins(coins);
  }
  updateInventory();
}
window.buyItemTimer = buyItemTimer;

function buyItemIntern(itemName = "Praktikant") {
  let coins = parseInt(localStorage.getItem("coins")) || 0;
  if (coins < 100) {
    alert(`Nicht genug Münzen für Praktikant`);
  } else {
    coins -= 100;
    localStorage.setItem("coins", coins);

    let itemCount = parseInt(localStorage.getItem(itemName)) || 0;
    itemCount++;
    localStorage.setItem(itemName, itemCount);

    updateCoins(coins);
  }
  updateInventory();
}
window.buyItemInter = buyItemIntern;

function updateCoins(coins) {
  const coinsDisplay = document.getElementById("coins");
  if (!coinsDisplay) return;
  coinsDisplay.textContent = coins;
}
window.updateCoins = updateCoins;
