(function createCardStack() {
  const cardsHTML = `
      <div id="cards">
          <div class="card active">
              <img src="../images/Audir8/Kartenstapel_imgs/img01.png" alt="Bild 1">
              <ul>
                  <li>Deutschland: 224.445€</li>
                  <li>USA: $224,995</li>
                  <li>Japan: ¥25,800,000</li>
                  <li>Großbritannien: £189,990</li>
              </ul>
          </div>
          <div class="card">
              <img src="../images/Audir8/Kartenstapel_imgs/img02.png" alt="Bild 2">
              <ul>
                  <li>Deutschland: 277.632€</li>
                  <li>USA: $277,995</li>
                  <li>Japan: ¥31,000,000</li>
                  <li>Großbritannien: £231,500</li>
              </ul>
          </div>
          <div class="card">
              <img src="../images/Audir8/Kartenstapel_imgs/img03.png" alt="Bild 3">
              <ul>
                  <li>Deutschland: 303.346€</li>
                  <li>USA: $303,990</li>
                  <li>Japan: ¥33,500,000</li>
                  <li>Großbritannien: £249,000</li>
              </ul>
          </div>
          <div class="card">
              <img src="../images/Audir8/Kartenstapel_imgs/img04.png" alt="Bild 4">
              <ul>
                  <li>Deutschland: 224.445€</li>
                  <li>USA: $224,995</li>
                  <li>Japan: ¥25,800,000</li>
                  <li>Großbritannien: £189,990</li>
              </ul>
          </div>
          <div class="card">
              <img src="../images/Audir8/Kartenstapel_imgs/img05.png" alt="Bild 5">
              <ul>
                  <li>Deutschland: 277.632€</li>
                  <li>USA: $277,995</li>
                  <li>Japan: ¥31,000,000</li>
                  <li>Großbritannien: £231,500</li>
              </ul>
          </div>
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