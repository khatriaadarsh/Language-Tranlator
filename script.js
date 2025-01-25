let sourceLanguage = document.querySelector("#sourceLanguage");
let targetLanguage = document.querySelector("#targetLanguage");
let translateBtn = document.querySelector("#translateBtn");

translateBtn.addEventListener("click", async () => {
  let textInput = document.querySelector("#inputText");
  let textOutput = document.querySelector("#outputText");

  if (!textInput.value.trim()) {
    textOutput.textContent = "Please enter text to translate.";
    return;
  }

  if (!targetLanguage.value.trim()) {
    textOutput.textContent = "Please select a target language.";
    return;
  }

  const apiKey = "YOUR_ACTUAL_GOOGLE_CLOUD_API_KEY"; // Replace with your actual API key
  const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        q: textInput.value,
        source: sourceLanguage.value, // Source language code (e.g., 'en' for English)
        target: targetLanguage.value, // Target language code (e.g., 'es' for Spanish)
      }),
    });
    if (!response.ok) {
      textOutput.textContent = "Translation failed!";
      return;
    }
    const data = await response.json();
    if (
      data &&
      data.data &&
      data.data.translations &&
      data.data.translations.length > 0
    ) {
      textOutput.textContent = data.data.translations[0].translatedText;
    } else {
      textOutput.textContent = "Translation failed!";
    }
  } catch (error) {
    textOutput.textContent = "An error occurred during translation!";
    console.error("Error:", error);
  }
});
