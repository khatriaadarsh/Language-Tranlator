let sourceLanguage = document.querySelector("#sourceLanguage");
let targetLanguage = document.querySelector("#targetLanguage");
let translateBtn = document.querySelector("#translateBtn");
let textInput = document.querySelector("#inputText");
let textOutput = document.querySelector("#outputText");

translateBtn.addEventListener("click", async () => {
  translateBtn.disabled = true;
  translateBtn.textContent = "Translating...";
  if (!textInput.value.trim()) {
    textOutput.textContent = "Please enter some text to translate.";
    return;
  }

  if (sourceLanguage.value === targetLanguage.value) {
    textOutput.textContent = "Source and Target language cannot be the same.";
    return;
  }

  const apiKey = "yourDeepLApiKey"; // Replace with your actual DeepL API key
  const url = `https://api-free.deepl.com/v2/translate`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: textInput.value,
        target_lang: targetLanguage.value.toUpperCase(), // Target language (e.g., 'EN')
        source_lang: sourceLanguage.value.toUpperCase() || null, // Source language or null for auto-detection
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      textOutput.textContent = `Translation failed: ${errorData.message}`;
      console.error("Error details:", errorData.message);
      return;
    }
    const data = await response.json();
    if (data && data.translations && data.translations.length > 0) {
      textOutput.textContent = data.translations[0].text;
    } else {
      textOutput.textContent = "Translation failed!";
    }
  } catch (error) {
    textOutput.textContent = "An error occurred during translation!";
    console.error("Error:", error);
  } finally {
    translateBtn.disabled = false;
    translateBtn.textContent = "Translate";
  }
});
