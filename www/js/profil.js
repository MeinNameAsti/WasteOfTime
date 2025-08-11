function goBack() {
  window.location.href = "main.html";
}

const profilName = document.getElementById("word");
const editBtn = document.getElementById("edit-btn");

editBtn.addEventListener("click", () => {
  const oldValue = profilName.textContent;

  // Eingabefeld erstellen
  const input = document.createElement("input");
  input.type = "text";
  input.value = oldValue;

  profilName.replaceChildren(input);
  input.focus();

  function saveChange() {
    // Event-Listener nach erstem Aufruf entfernen
    input.removeEventListener("blur", saveChange);
    input.removeEventListener("keydown", keyHandler);

    const newValue = input.value.trim();
    if (newValue !== oldValue) {
      const confirmChange = confirm(
        `Soll dein Name zu "${newValue}" geändert werden?`
      );
      if (confirmChange) {
        profilName.textContent = newValue;
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
