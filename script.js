let textInput = document.querySelector(".input-box");
let textOutput = document.querySelector(".output-box");
let languageSelector = document.querySelector(".language-list");
let translateBtn = document.querySelector(".translate-btn");

translateBtn.classList.add("disabled");

translateBtn.addEventListener("click", () => {
  if (!translateBtn.classList.contains("disabled")) {
    translateText(textInput, languageSelector);
  }
});
textInput.addEventListener("input", () => {
  if (textInput.value.trim() === "") {
    translateBtn.classList.add("disabled");
  } else {
    translateBtn.classList.remove("disabled");
  }
});
async function translateText(inputText, languageSelector) {
  const url = "https://www.apertium.org/apy/translate"; // Replace with the correct API endpoint URL
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      q: inputText.value,
      langpair: "en|es",
    }),
  });

  let data = await response.json();
  if (data.responseStatus === 200) {
    textOutput.value = data.responseData.translatedText;
  } else {
    textOutput.value = "Error translating text. Please try again.";
  }
}
