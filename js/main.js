// Declaramos una función llamada main
function main() {
  // Obtenemos los elementos del DOM con los que vamos a trabajar
  const message = document.getElementById("encryption__input");
  const encryptBtn = document.getElementById("encryption__button");
  const decryptBtn = document.getElementById("decryption__button");
  const result = document.getElementById("encryption__output");
  const history = document.getElementById("history");
  const historyContent = document.getElementById("history__content");
  const filterOptions = document.getElementsByName("filterOption");
  const messageList = historyContent.childNodes;
  // Definimos un objeto que contiene las claves que se van a utilizar en la encriptación
  const keys = {
    a: "ai",
    e: "enter",
    i: "imes",
    o: "ober",
    u: "ufat",
  };

  // Método para almacenar historial de desencriptado y encriptado
  function save(result) {
    const lockIcon = save.caller.name == "encrypt" ? "lock.svg" : "unlock.svg";
    const html = `
      <div class="history__text">
        <p class="history__message">${result}</p>
      </div>
      <img class="history__icon-lock" src="images/${lockIcon}" alt="lock icon">
    `;
    const newSection = document.createElement("section");
    newSection.className = "history__item";
    newSection.dataset.type =
      save.caller.name == "encrypt" ? "encrypted" : "decrypted";
    newSection.innerHTML = html;
    history.classList.add("history--exist");
    historyContent.prepend(newSection);
    updateHistory();
  }

  //Método para filtrar mensajes
  function updateHistory() {
    if (messageList) {
      const selectedFilter = document.querySelector(
        'input[name="filterOption"]:checked'
      ).value;
      for (const message of messageList) {
        if (message && message.dataset) {
          const messageType = message.dataset.type;
          const isVisible =
            selectedFilter === "all" || messageType === selectedFilter;
          message.classList.toggle("hide", !isVisible);
          message.classList.toggle("show", isVisible);
        }
      }
    }
  }

  // Método para encriptar
  function encrypt() {
    const letters = message.value.toLowerCase();
    if (letters) {
      const encryptMessage = letters
        .split("")
        .map((char) => keys[char] || char)
        .join("");

      result.textContent = encryptMessage;
      save(encryptMessage);
    }
  }

  //Método para desencriptar
  function decrypt() {
    const letters = message.value.toLowerCase();
    if (letters) {
      const decryptMessage = letters
        .match(/(ai|enter|imes|ober|ufat|\s|\S)/g)
        .map(
          (char) => Object.keys(keys).find((key) => keys[key] === char) || char
        )
        .join("");
      result.textContent = decryptMessage;
      save(decryptMessage);
    }
  }

  //Método para copiar al portapapeles
  function copyToClipboard(e) {
    if (!e.target.classList.contains("history__content")) {
      const message = e.target
        .closest(".history__item")
        .querySelector(".history__message").textContent;
      navigator.clipboard
        .writeText(message)
        .then(() => {
          alert("Texto copiado al portapapeles");
        })
        .catch((error) => {
          console.error("Error al copiar el texto: ", error);
        });
    }
  }

  //Método para invocar event listeners
  function runEvents() {
    encryptBtn.addEventListener("click", encrypt);
    decryptBtn.addEventListener("click", decrypt);

    for (const input of filterOptions) {
      input.addEventListener("click", updateHistory);
    }

    historyContent.addEventListener("click", (e) => copyToClipboard(e));
  }

  runEvents();
}

// Esperamos a que el DOM cargue para ejecutar la función main
document.addEventListener("DOMContentLoaded", () => {
  main();
});
