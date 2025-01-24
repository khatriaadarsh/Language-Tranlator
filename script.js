let textInput = document.querySelector("#inputText");
let textOutput = document.querySelector("#outputText");
let languageSelector = document.querySelector("#targlanguage");
let translateBtn = document.querySelector("#translateBtn");
let sourceLang = "en"; // Replace with the source language code

translateBtn.disabled = true;

textInput.addEventListener("input", () => {
  if (textInput.value !== "" && languageSelector.value !== "") {
    translateBtn.classList.remove("disabled");
    translateBtn.disabled = false;

  } else {
    translateBtn.classList.add("disabled");
    translateBtn.disabled = true;
  }
});

async function translateText(inputText, sourceLang, targetLang) {
  let langPair = `${sourceLang}|${targetLang}`;
  const url = "https://www.apertium.org/apy/translate"; // Replace with the correct API endpoint URL
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      q: inputText,
      langpair: langPair,
    }),
  });

  let data = await response.json();
  if (response.ok) {
    textOutput.value = data.responseData.translatedText;
  } else {
    textOutput.value = "Error translating text. Please try again.";
  }
}
