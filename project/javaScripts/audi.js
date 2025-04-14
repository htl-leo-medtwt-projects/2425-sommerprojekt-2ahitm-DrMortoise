(function createCardStack() {
  const cardsHTML = `
      <div id="cards">
          <div class="card active">
              <img src="../images/Audir8/Kartenstapel_imgs/img01.png" alt="Bild 1">
              <ul>
                  <li>Deutschland: 200€</li>
                  <li>USA: $250</li>
                  <li>Japan: ¥30,000</li>
                  <li>Großbritannien: £180</li>
              </ul>
          </div>
          <div class="card">
              <img src="../images/Audir8/Kartenstapel_imgs/img02.png" alt="Bild 2">
              <ul>
                  <li>Deutschland: 300€</li>
                  <li>USA: $350</li>
                  <li>Japan: ¥40,000</li>
                  <li>Großbritannien: £280</li>
              </ul>
          </div>
          <div class="card">
              <img src="../images/Audir8/Kartenstapel_imgs/img03.png" alt="Bild 3">
              <ul>
                  <li>Deutschland: 400€</li>
                  <li>USA: $450</li>
                  <li>Japan: ¥50,000</li>
                  <li>Großbritannien: £380</li>
              </ul>
          </div>
          <div class="card">
              <img src="../images/Audir8/Kartenstapel_imgs/img04.png" alt="Bild 4">
              <ul>
                  <li>Deutschland: 500€</li>
                  <li>USA: $550</li>
                  <li>Japan: ¥60,000</li>
                  <li>Großbritannien: £480</li>
              </ul>
          </div>
          <div class="card">
              <img src="../images/Audir8/Kartenstapel_imgs/img05.png" alt="Bild 5">
              <ul>
                  <li>Deutschland: 600€</li>
                  <li>USA: $650</li>
                  <li>Japan: ¥70,000</li>
                  <li>Großbritannien: £580</li>
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