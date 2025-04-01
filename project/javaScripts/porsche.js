document.addEventListener("DOMContentLoaded", function() {
    let currentSlideIndex = 0;
    const slides = [
        "../images/PorscheGT3RS/SlideshowImage01.png",
        "../images/PorscheGT3RS/SlideshowImage02.jpg",
        "../images/PorscheGT3RS/SlideshowImage03.jpg"
    ];

    const mainSlide = document.getElementById("mainSlide");
    const nextSlide = document.getElementById("nextSlide");
    const nextNextSlide = document.getElementById("nextNextSlide");

    function showSlides() {
        mainSlide.src = slides[currentSlideIndex];
        nextSlide.src = slides[(currentSlideIndex + 1) % slides.length];
        nextNextSlide.src = slides[(currentSlideIndex + 2) % slides.length];
        currentSlideIndex = (currentSlideIndex + 1) % slides.length;
    }

    setInterval(showSlides, 5000);
});

const items = [
    {
        "img": "../images/PorscheGT3RS//VoteImages/item01.png",
        "productName": "Porsche Crest Keyring - Black",
        "about": "Ein eleganter und stilvoller Schlüsselanhänger mit dem Porsche-Wappen in Schwarz. Perfekt für jeden Porsche-Liebhaber."
    },
    {
        "img": "../images/PorscheGT3RS//VoteImages/item02.png",
        "productName": "Cap - Essential - Black",
        "about": "Eine alltagstaugliche Kappe in Schwarz, die immer gut aussieht. Ideal für jeden Tag und jede Gelegenheit."
    },
    {
        "img": "../images/PorscheGT3RS//VoteImages/item03.png",
        "productName": "Keyring - 911 Lettering",
        "about": "Ein Schlüsselanhänger mit dem ikonischen 911-Schriftzug. Ein Muss für jeden Porsche-Fan."
    },
    {
        "img": "../images/PorscheGT3RS//VoteImages/item04.png",
        "productName": "Porsche Crest Keyring - Red",
        "about": "Ein eleganter und stilvoller Schlüsselanhänger mit dem Porsche-Wappen in Rot. Perfekt für jeden Porsche-Liebhaber."
    },
    {
        "img": "../images/PorscheGT3RS//VoteImages/item05.png",
        "productName": "Smartwatch Porsche x Garmin® Epix Pro",
        "about": "Eine moderne und stilvolle Smartwatch, entwickelt in Zusammenarbeit mit Garmin®. Perfekt für Technik- und Porsche-Fans."
    },
    {
        "img": "../images/PorscheGT3RS//VoteImages/item06.png",
        "productName": "Keychain 'Brake Disc'",
        "about": "Ein cooler Schlüsselanhänger in Form einer Bremsscheibe, ideal für Autoliebhaber. Ein echter Hingucker."
    },
    {
        "img": "../images/PorscheGT3RS//VoteImages/item07.png",
        "productName": "Sunglasses - MARTINI RACING®",
        "about": "Stilvolle Sonnenbrille mit MARTINI RACING®-Design, perfekt für sonnige Tage. Schützt die Augen und sieht gut aus."
    },
    {
        "img": "../images/PorscheGT3RS//VoteImages/item08.png",
        "productName": "Porsche Tissue Box",
        "about": "Eine elegante Taschentuchbox, die in jedem Raum gut aussieht. Praktisch und stilvoll zugleich."
    },
    {
        "img": "../images/PorscheGT3RS//VoteImages/item09.png",
        "productName": "Keyring - Taycan Lettering",
        "about": "Ein stilvoller Schlüsselanhänger mit dem Taycan-Schriftzug. Ein Muss für jeden Porsche-Fan."
    },
    {
        "img": "../images/PorscheGT3RS//VoteImages/item10.png",
        "productName": "Men's Wallet - Heritage",
        "about": "Ein geräumiges und stilvolles Herrenportemonnaie mit viel Platz. Perfekt für den täglichen Gebrauch."
    }
];

//generated with Chat gpt (this one function)
function getRandomItems(arr, num) {
    const shuffled = arr.sort(() => 0.4 - Math.random());
    return shuffled.slice(0, num);
}

const randomItems = getRandomItems(items, 4);

let voteCount = 0;

randomItems.forEach(item => {
    const productDiv = document.createElement('div');
    productDiv.innerHTML = `
        <img id="voteImages" src="${item.img}" alt="${item.productName}">
        <h2>${item.productName}</h2>
        <p>${item.about}</p>
        <button onclick="voteScala()">Your vote</button>
    `;
    outputVote.appendChild(productDiv);
});

function voteScala() {
    voteCount++;
}