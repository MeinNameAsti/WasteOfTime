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

// Sprache speichern und laden
const radios = document.querySelectorAll("input[name='sprache']");

// Sprachdatei laden
async function fetchLanguageData(lang) {
  const response = await fetch(`languages/${lang}.json`);
  if (!response.ok) {
    throw new Error(`Sprachdatei ${lang}.json konnte nicht geladen werden.`);
  }
  return response.json();
}

// Inhalte aktualisieren
function updateContent(langData) {
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    if (langData[key]) {
      element.textContent = langData[key];
    }
  });
}

// Sprache setzen (lädt JSON + aktualisiert Seite)
async function setLanguage(lang) {
  try {
    const data = await fetchLanguageData(lang);
    updateContent(data);
  } catch (error) {
    console.error("Fehler beim Laden der Sprachdatei:", error);
  }
}

// Beim Seitenstart gespeicherte Sprache laden
const savedLang = localStorage.getItem("sprache") || "de";
setLanguage(savedLang);

// Radio Buttons synchronisieren + Eventlistener
radios.forEach((radio) => {
  if (radio.value === savedLang) {
    radio.checked = true;
  }

  radio.addEventListener("change", async () => {
    localStorage.setItem("sprache", radio.value);
    await setLanguage(radio.value);
  });
});

// 🔄 Spielstand zurücksetzen
document.getElementById("reset-game").addEventListener("click", () => {
  const confirmation = confirm(
    "Willst du das Spiel wirklich zurücksetzen? Alle gespeicherten Daten gehen verloren."
  );
  if (confirmation) {
    localStorage.clear();
    location.reload(); // Seite neu laden
  }
});
