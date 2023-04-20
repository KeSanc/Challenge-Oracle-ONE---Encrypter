// Declaramos una función llamada main
function main() {
  // Obtenemos los elementos del DOM con los que vamos a trabajar
  const message = document.getElementById("encryption__input");
  const encryptBtn = document.getElementById("encryption__button");
  const decryptBtn = document.getElementById("decryption__button");

  const result = document.getElementById("encryption__output");
  // Definimos un objeto que contiene las claves que se van a utilizar en la encriptación
  const keys = {
    a: "ai",
    e: "enter",
    i: "imes",
    o: "ober",
    u: "ufat",
  };

  // Método para encriptar
  function encrypt() {
    const letters = message.value.toLowerCase();
    const encryptMessage = letters
      .split("")
      .map((char) => keys[char] || char)
      .join("");

    result.textContent = encryptMessage;
  }

  //Método para desencriptar
  function decrypt() {
    const letters = message.value.toLowerCase();

    const encryptMessage = letters
      .match(/(ai|enter|imes|ober|ufat|\s|\S)/g)
      .map(
        (char) => Object.keys(keys).find((key) => keys[key] === char) || char
      )
      .join("");
    result.textContent = encryptMessage;
  }

  // Asociamos la función encrypt al evento click del botón de encriptación
  encryptBtn.addEventListener("click", encrypt);
  decryptBtn.addEventListener("click", decrypt);
}

// Esperamos a que el DOM cargue para ejecutar la función main
document.addEventListener("DOMContentLoaded", () => {
  main();
});
