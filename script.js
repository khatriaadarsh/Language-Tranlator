let textInput = document.querySelector(".input-box");

let textOutput = document.querySelector(".output-box");
let lauguageSelector = document.querySelector(".language-list");
let translateBtn = document.querySelector(".translate-btn");

translateBtn.classList.add("disabled");
textInput.addEventListener("input", () => {
  if (textInput.value.trim() === "" && lauguageSelector.value === "en") {
    translateBtn.classList.add("disabled");
  } else {
    translateBtn.classList.remove("disabled");

    fetch("https://translatorsapi.p.rapidapi.com/translate", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "YOUR_API_KEY",
        "X-RapidAPI-Host": "translatorsapi.p.rapidapi.com",
      },
      body: JSON.stringify({
        text: textInput.value,
        to: lauguageSelector.value,
        from: textInput.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data.translated_text));
  }
});

// function getTranslationURL(text) {
//   return serverURL + "?" + "text=" + text;
// }

// function errorHandler(error) {
//   console.log("Error occurred: ", error);
//   alert("Something went wrong. Please try again later.");
// }
