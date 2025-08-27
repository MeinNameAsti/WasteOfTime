function goBack() {
  window.location.href = "main.html";
}

// Darkmode aktivieren/deaktivieren
const toggle = document.getElementById("darkmode-toggle");

if (localStorage.getItem("darkmode") === "true") {
  document.body.classList.add("darkmode");
  toggle.checked = true;
}

toggle.addEventListener("change", () => {
  document.body.classList.toggle("darkmode");
  localStorage.setItem("darkmode", toggle.checked);
});

// Sprache speichern
const radios = document.querySelectorAll("input[name='sprache']");
radios.forEach((radio) => {
  radio.addEventListener("change", () => {
    localStorage.setItem("sprache", radio.value);
  });

  // Auswahl wiederherstellen
  if (radio.value === localStorage.getItem("sprache")) {
    radio.checked = true;
  }
});

// Spielstand zurücksetzen
document.getElementById("reset-game").addEventListener("click", () => {
  const confirmation = confirm(
    "Willst du das Spiel wirklich zurücksetzen? Alle gespeicherten Daten gehen verloren."
  );
  if (confirmation) {
    localStorage.clear();
    location.reload(); // Seite neu laden
  }
});
