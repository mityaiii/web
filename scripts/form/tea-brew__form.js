document.addEventListener('DOMContentLoaded', () => {
  const teaNameInput = document.getElementById('teaName');
  const teaBrewingFeatureInput = document.getElementById("teaBrewingFeature");
  const teaBrewingFeaturesElement = document.getElementById("teaBrewingFeatures");
  const addFeatureButton = document.getElementById("addFeatureButton");
  const clearButton = document.getElementById("clearButton");

  const resultContainer = document.getElementById("result-container");
  const offerReciept = document.getElementById("offerRecieptButton");
  const languageSelect = document.getElementById("language");

  let brewingFeatures = [];

  const savedTeaName = localStorage.getItem("teaName");
  const savedBrewingFeatures = JSON.parse(localStorage.getItem("brewingFeatures") || "[]");

  if (savedTeaName) {
    teaNameInput.value = savedTeaName;
  }

  if (typeof savedBrewingFeatures === 'object' && savedBrewingFeatures.length !== 0) {
    brewingFeatures = savedBrewingFeatures;
    addReciept();
  }

  addFeatureButton.addEventListener('click', event => {
    event.preventDefault();
    const feature = teaBrewingFeatureInput.value.trim();

    if (feature) {
      brewingFeatures.push(feature);
      displayBrewingFeature(feature);
      teaBrewingFeatureInput.value = "";
    }
  });

  clearButton.addEventListener('click', event => {
    event.preventDefault();
    clearAll();
  });

  offerReciept.addEventListener('click', event => {
    event.preventDefault();
    addReciept();
  })

  function displayBrewingFeature (feature) {
    if (!feature) {
      return;
    }

    const listItem = document.createElement("li");
    const label = document.createElement("label");
    label.textContent = feature;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        label.classList.add('strikethrough');
      } else {
        label.classList.remove('strikethrough');
      }
    });

    listItem.appendChild(label);
    listItem.appendChild(checkbox);

    teaBrewingFeaturesElement.appendChild(listItem);
  }

  function clearAll() {
    teaBrewingFeaturesElement.innerHTML = "";
    teaBrewingFeatureInput.value = "";
    teaNameInput.value = "";
    brewingFeatures = [];
    brewingFeatures.forEach(value => {
      displayBrewingFeature(value);
    })

    localStorage.removeItem("teaName");
    localStorage.removeItem("brewingFeatures");
  }

  function translate(text, lang) {
    const translations = {
      "Рецепт": {
        "ru": "Рецепт",
        "en": "Recipe",
      },
    };

    return translations[text][lang];
  }

  function addReciept() {
    const language = languageSelect.value;
    const teaName = teaNameInput.value;

    console.log(teaName);

    localStorage.setItem("teaName", teaName);
    localStorage.setItem("brewingFeatures", JSON.stringify(brewingFeatures));

    resultContainer.innerHTML = `<h3>${translate('Рецепт', language)}: ${teaName}</h3>`;
    const list = document.createElement("ul");

    brewingFeatures.forEach((feature) => {
      const listItem = document.createElement("li");
      listItem.textContent = feature;
      list.appendChild(listItem);
    });

    resultContainer.appendChild(list);
  }
})
