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

function kaufen(itemName) {
  alert(`Du hast "${itemName}" gekauft! 🛍️`);
}
