window.goBack = function () {
  window.location.href = "main.html";
};

document.addEventListener("DOMContentLoaded", () => {
  // Darkmode aktivieren/deaktivieren
  const toggle = document.getElementById("darkmode-toggle");
  if (toggle) {
    if (localStorage.getItem("darkmode") === "true") {
      document.body.classList.add("darkmode");
      toggle.checked = true;
    }

    toggle.addEventListener("change", () => {
      document.body.classList.toggle("darkmode");
      localStorage.setItem("darkmode", toggle.checked);
    });
  }

  // Spielstand zurücksetzen
  const resetBtn = document.getElementById("reset-game");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      const confirmation = confirm(
        "Willst du das Spiel wirklich zurücksetzen? Alle gespeicherten Daten gehen verloren."
      );
      if (confirmation) {
        localStorage.clear();
        location.reload();
      }
    });
  }

  // Sprache ändern
  const radios = document.querySelectorAll("input[name='sprache']");
  const savedLang = localStorage.getItem("sprache") || "de";

  async function fetchLanguageData(lang) {
    const response = await fetch(`languages/${lang}.json`);
    if (!response.ok) {
      throw new Error(`Sprachdatei ${lang}.json konnte nicht geladen werden.`);
    }
    return response.json();
  }

  function updateContent(langData) {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (langData[key]) el.textContent = langData[key];
    });
  }

  async function setLanguage(lang) {
    try {
      const data = await fetchLanguageData(lang);
      updateContent(data);
    } catch (err) {
      console.error("Fehler beim Laden der Sprachdatei:", err);
    }
  }

  // Sprache beim Start setzen
  setLanguage(savedLang);

  // Radios synchronisieren und Eventlistener
  if (radios.length) {
    radios.forEach((radio) => {
      if (radio.value === savedLang) radio.checked = true;
      radio.addEventListener("change", async () => {
        localStorage.setItem("sprache", radio.value);
        await setLanguage(radio.value);
      });
    });
  }
});
