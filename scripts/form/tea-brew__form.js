document.addEventListener('DOMContentLoaded', () => {
  const teaNameInput = document.getElementById('teaName');
  const teaBrewingFeatureInput = document.getElementById("teaBrewingFeature");
  const teaBrewingFeatureElements = document.getElementById("teaBrewingFeatures");
  const addFeatureButton = document.getElementById("addFeatureButton");
  const clearButton = document.getElementById("clearButton");

  const resultContainer = document.getElementById("result-container");
  const offerReciept = document.getElementById("offerRecieptButton");
  const languageSelect = document.getElementById("language");

  teaBrewingFeatureInput.addEventListener('change', event => {
    localStorage.setItem("teaBrewingFeature", event.target.value.trim());
  });

  teaNameInput.addEventListener('change', event => {
    localStorage.setItem("teaName", event.target.value.trim());
  });

  languageSelect.addEventListener('change', event => {
    localStorage.setItem("recieptLanguage", event.target.value.trim());
  });

  function getBrewingFeatures() {
    const brewingFeatures = [];
    for (let item of teaBrewingFeatureElements.children) {
      const label = item.querySelector('label');
  
      const featureInfo = {
        value: item.textContent,
        classList: Array.from(label.classList),
      };
    
      brewingFeatures.push(featureInfo);
    }
    
    return brewingFeatures;
  }
  
  addFeatureButton.addEventListener('click', event => {
    event.preventDefault();
    const feature = teaBrewingFeatureInput.value.trim();
    localStorage.removeItem("teaBrewingFeature");

    if (feature) {
      displayBrewingFeature(feature);

      localStorage.setItem("brewingFeatures", JSON.stringify(getBrewingFeatures()));
      teaBrewingFeatureInput.value = "";
    }
  });

  clearButton.addEventListener('click', event => {
    event.preventDefault();
    clearAll();
  });

  offerReciept.addEventListener('click', event => {
    event.preventDefault();
    localStorage.removeItem("teaName");
    localStorage.removeItem("recieptLanguage");
    localStorage.removeItem("teaBrewingFeature");
    localStorage.removeItem("brewingFeatures");

    const language = languageSelect.value;
    const teaName = teaNameInput.value;
    const brewingFeatures = getBrewingFeatures();

    const reciept = {
      teaName: teaName,
      language: language,
      brewingFeatures: brewingFeatures,
    }

    localStorage.setItem("reciept", JSON.stringify(reciept));
    addReciept(language, teaName, brewingFeatures);
  })

  function displayBrewingFeature (feature, classList = "") {
    if (!feature) {
      return;
    }

    const listItem = document.createElement("li");
    const label = document.createElement("label");
    const uniqueId = `feature-${Date.now()}`;
    label.setAttribute('for', uniqueId);
    label.textContent = feature;
    label.classList = classList;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        label.classList.add('strikethrough');

      } else {
        label.classList.remove('strikethrough');
      }
      
      localStorage.setItem("brewingFeatures", JSON.stringify(getBrewingFeatures()));
    });

    listItem.appendChild(label);
    listItem.appendChild(checkbox);

    teaBrewingFeatureElements.appendChild(listItem);
  }

  function clearAll() {
    teaBrewingFeatureElements.innerHTML = "";
    teaBrewingFeatureInput.value = "";
    teaNameInput.value = "";
    resultContainer.innerHTML = ""; 

    localStorage.removeItem("teaName");
    localStorage.removeItem("teaBrewingFeature");
    localStorage.removeItem("recieptLanguage")
    localStorage.removeItem("brewingFeatures");
    localStorage.removeItem("reciept");
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

  function restoreValue() {
    const savedTeaName = localStorage.getItem("teaName");
    const savedRecieptLanguage = localStorage.getItem("recieptLanguage");
    const savedTeaBrewingFeature = localStorage.getItem("teaBrewingFeature");
    const savedBrewingFeatures = JSON.parse(localStorage.getItem("brewingFeatures") || "[]");
    const savedReciept = JSON.parse(localStorage.getItem("reciept") || "{}");

    if (savedTeaName) {
      teaNameInput.value = savedTeaName;
    }

    if (savedRecieptLanguage) {
      languageSelect.value = savedRecieptLanguage;
    }

    if (savedTeaBrewingFeature) {
      teaBrewingFeatureInput.value = savedTeaBrewingFeature;
    }
  
    savedBrewingFeatures.forEach(item => {
      displayBrewingFeature(item.value, item.classList);
    });

    if (Object.keys(savedReciept).length !== 0) {
      addReciept(savedReciept.language, savedReciept.teaName, savedReciept.brewingFeatures);
    }
  }

  function addReciept(language, teaName, brewingFeatures) {
    resultContainer.innerHTML = `<h3>${translate("Рецепт", language)}: ${teaName}</h3>`;
    const recieptItems = document.createElement("ul");

    brewingFeatures.forEach(item => {
      if (!item.classList.includes("strikethrough")) {
        const listItem = document.createElement("li");
        listItem.textContent = item.value;
        recieptItems.appendChild(listItem);
      }
    });

    resultContainer.appendChild(recieptItems);
  }

  restoreValue();
})
