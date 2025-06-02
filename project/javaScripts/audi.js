AOS.init();

(function createCardStack() {
  // Hilfsfunktion: Modell anhand des Preises bestimmen
  function getModelType(price) {
    if (price >= 300000) return "Audi R8 V10 Performance";
    if (price >= 270000) return "Audi R8 V10 Plus";
    return "Audi R8 V10";
  }

  // Karten-Daten mit Preisangaben
  const cardsData = [
    {
      img: "../images/Audir8/Kartenstapel_imgs/img01.png",
      prices: {
        de: 224445,
        us: "$224,995",
        jp: "¥25,800,000",
        uk: "£189,990"
      }
    },
    {
      img: "../images/Audir8/Kartenstapel_imgs/img02.png",
      prices: {
        de: 277632,
        us: "$277,995",
        jp: "¥31,000,000",
        uk: "£231,500"
      }
    },
    {
      img: "../images/Audir8/Kartenstapel_imgs/img03.png",
      prices: {
        de: 303346,
        us: "$303,990",
        jp: "¥33,500,000",
        uk: "£249,000"
      }
    },
    {
      img: "../images/Audir8/Kartenstapel_imgs/img04.png",
      prices: {
        de: 224445,
        us: "$224,995",
        jp: "¥25,800,000",
        uk: "£189,990"
      }
    },
    {
      img: "../images/Audir8/Kartenstapel_imgs/img05.png",
      prices: {
        de: 277632,
        us: "$277,995",
        jp: "¥31,000,000",
        uk: "£231,500"
      }
    }
  ];

//ChatGPT unterstüzung
  const cardsHTML = `
      <div id="cards">
          ${cardsData.map((card, i) => `
              <div class="card${i === 0 ? " active" : ""}">
                  <h1>${getModelType(card.prices.de)}</h1>
                  <img src="${card.img}" alt="Bild ${i + 1}">
                  <ul>
                      <li>Deutschland: ${card.prices.de.toLocaleString("de-DE")}€</li>
                      <li>USA: ${card.prices.us}</li>
                      <li>Japan: ${card.prices.jp}</li>
                      <li>Großbritannien: ${card.prices.uk}</li>
                  </ul>
              </div>
          `).join('')}
      </div>
  `;

  const targetElement = document.getElementById('card-container');
  if (targetElement) targetElement.innerHTML = cardsHTML;

  const cardsContainer = document.getElementById('cards');
  const cards = Array.from(cardsContainer.querySelectorAll('.card'));

  function updateCardIndexes() {
    cards.forEach((card, index) => {
      card.style.zIndex = cards.length - index;
      card.style.transform = `translateY(${index * 10}px)`;
    });
  }

  updateCardIndexes();

  cardsContainer.addEventListener('click', () => {
    if (cards.length === 0) return;

    const frontCard = cards.shift();

    frontCard.style.transform = 'translateX(-120%)';
    frontCard.style.transition = 'transform 0.5s ease-in-out';

    setTimeout(() => {
      frontCard.style.transition = 'transform 0.3s ease-in-out, opacity 0.25s ease-in-out';
      frontCard.style.transform = `translateX(${cards.length * 10}px)`;
      frontCard.style.opacity = '0';

      setTimeout(() => {
        frontCard.style.transition = 'none';
        frontCard.style.opacity = '1';
        cards.push(frontCard);
        cardsContainer.appendChild(frontCard);

        updateCardIndexes();
      }, 300);
    }, 500);
  });
})();

//Performance Calculator

document.getElementById('calculate').addEventListener('click', function () {
  const modelFactor = parseFloat(document.getElementById('model').value);
  const weight = parseFloat(document.getElementById('weight').value);
  const weatherFactor = parseFloat(document.getElementById('weather').value);
  const tireFactor = parseFloat(document.getElementById('tires').value);

  if (isNaN(modelFactor) || isNaN(weight) || isNaN(weatherFactor) || isNaN(tireFactor)) {
      alert("Bitte füllen Sie alle Felder korrekt aus.");
      return;
  }

  const weightEffect = (weight / 10) * 0.01;

  const baseTime = modelFactor;
  const adjustedTime = (baseTime + weightEffect) * weatherFactor * tireFactor;

  const maxSpeedKmH = 200 - (adjustedTime * 10);
  const maxSpeedMS = maxSpeedKmH / 3.6;

  const finalSpeedKmH = Math.max(0, maxSpeedKmH); 
  const finalSpeedMS = Math.max(0, maxSpeedMS);

  document.getElementById('kilometersPerHour').innerHTML = `
      ${finalSpeedKmH.toFixed(1)} <span id="kmH">km/h</span>`;
  document.getElementById('metersPerSecond').innerHTML = `
      ${finalSpeedMS.toFixed(1)} <span id="mS">m/s</span>`;
});

document.getElementById('weight').addEventListener('input', function () {
  document.getElementById('weightValue').textContent = this.value;
});

//Evaluation

document.getElementById("submitFeedbackButton").addEventListener("click", function () {
  const feedbackInput = document.getElementById("feedbackInput").value;
  const feedbackDisplay = document.getElementById("feedbackDisplay");

  if (feedbackInput.trim() !== "") {
      const feedbackMessage = document.createElement("div");
      feedbackMessage.className = "feedback-message";

      const feedbackText = document.createElement("p");
      feedbackText.textContent = feedbackInput;

      feedbackMessage.appendChild(feedbackText);
      feedbackDisplay.appendChild(feedbackMessage);

      saveFeedbackToLocalStorage(feedbackInput);

      document.getElementById("feedbackInput").value = "";
  } else {
      alert("Bitte geben Sie eine Bewertung ein!");
  }
});

function saveFeedbackToLocalStorage(message) {
  let feedbackList = JSON.parse(localStorage.getItem("feedbackMessages")) || [];
  feedbackList.push(message);
  localStorage.setItem("feedbackMessages", JSON.stringify(feedbackList));
}

function loadFeedbackFromLocalStorage() {
  const feedbackDisplay = document.getElementById("feedbackDisplay");
  let feedbackList = JSON.parse(localStorage.getItem("feedbackMessages")) || [];

  feedbackList.forEach(message => {
      const feedbackMessage = document.createElement("div");
      feedbackMessage.className = "feedback-message";

      const feedbackText = document.createElement("p");
      feedbackText.textContent = message;

      feedbackMessage.appendChild(feedbackText);
      feedbackDisplay.appendChild(feedbackMessage);
  });
}

window.addEventListener("load", loadFeedbackFromLocalStorage);