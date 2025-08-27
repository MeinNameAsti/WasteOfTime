function goBack() {
  window.location.href = "main.html";
}

const profilName = document.getElementById("word");
const editBtn = document.getElementById("edit-btn-name");
const editBtnPicture = document.getElementById("edit-btn-picture");
const overlay = document.getElementById("image-overlay");
const mainImage = document.getElementById("main-image");

const gespeicherterName = localStorage.getItem("profilName");
if (gespeicherterName) {
  profilName.textContent = gespeicherterName;
}

const gespeichertesBild = localStorage.getItem("profilBild");
if (gespeichertesBild) {
  mainImage.src = gespeichertesBild;
}

//Name bearbeiten
editBtn.addEventListener("click", () => {
  const oldValue = profilName.textContent;

  // Eingabefeld erstellen
  const input = document.createElement("input");
  input.type = "text";
  input.value = oldValue;

  profilName.replaceChildren(input);
  input.focus();

  function saveChange() {
    input.removeEventListener("blur", saveChange);
    input.removeEventListener("keydown", keyHandler);

    const newValue = input.value.trim();
    if (newValue !== oldValue) {
      const confirmChange = confirm(
        `Soll dein Name zu "${newValue}" geändert werden?`
      );
      if (confirmChange) {
        profilName.textContent = newValue;
        localStorage.setItem("profilName", newValue);
      } else {
        profilName.textContent = oldValue;
      }
    } else {
      profilName.textContent = oldValue;
    }
  }

  function keyHandler(e) {
    if (e.key === "Enter") {
      saveChange();
    }
  }

  input.addEventListener("blur", saveChange);
  input.addEventListener("keydown", keyHandler);
});

// Klick auf Bleistift → Overlay anzeigen
editBtnPicture.addEventListener("click", () => {
  overlay.style.display = "flex";
});

// Klick auf Bild im Overlay
overlay.querySelectorAll("img").forEach((optionImg) => {
  optionImg.addEventListener("click", () => {
    const confirmChange = confirm("Willst du wirklich das Bild ändern?");
    if (confirmChange) {
      mainImage.src = optionImg.src;
      localStorage.setItem("profilBild", optionImg.src);
    }
    overlay.style.display = "none";
  });
});

// Klick außerhalb der Auswahl → Overlay schließen
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) {
    overlay.style.display = "none";
  }
});
