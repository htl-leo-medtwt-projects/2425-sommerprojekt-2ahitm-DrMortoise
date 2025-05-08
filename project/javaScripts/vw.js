AOS.init();

const bigImage = document.getElementById('bigImage');
    const previewImages = document.getElementById('previewImages').children;
    const images = [
      '../images/VWKäfer/SlideshowImages/VWSlideshowImage01.png',
      '../images/VWKäfer/SlideshowImages/VWSlideshowImage02.png',
      '../images/VWKäfer/SlideshowImages/VWSlideshowImage03.png',
      '../images/VWKäfer/SlideshowImages/VWSlideshowImage04.png',
      '../images/VWKäfer/SlideshowImages/VWSlideshowImage05.png'
    ];
    let currentIndex = 0;

    function updateSlideshow(index) {
      bigImage.src = images[index];
      bigImage.classList.add('down-animation');
      setTimeout(() => bigImage.classList.remove('down-animation'), 500);

      for (let i = 0; i < previewImages.length; i++) {
        const previewIndex = (index + 1 + i) % images.length;
        previewImages[i].src = images[previewIndex];
        previewImages[i].style.transform = `scale(${1 - i * 0.2})`;
        previewImages[i].style.opacity = `${1 - i * 0.3}`;
      }
    }

    document.getElementById('prevButton').addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      updateSlideshow(currentIndex);
    });

    document.getElementById('nextButton').addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % images.length;
      updateSlideshow(currentIndex);
    });

    updateSlideshow(currentIndex);

//guessing Game

// Quiz-Array mit Fragen, Antworten und Slider-Werten generiert mit CHATGPT
const questions = [
    {
      question: "Wie viele VW Käfer wurden weltweit verkauft?",
      options: ["Über 21 Millionen", "Über 15 Millionen", "Über 10 Millionen", "Über 5 Millionen"],
      answer: "Über 21 Millionen",
      sliderRange: [1000000, 25000000],
      correctAnswerValue: 21000000
    },
    {
      question: "In welchem Jahr begann die Serienproduktion des VW Käfers?",
      options: ["1938", "1945", "1950", "1935"],
      answer: "1938",
      sliderRange: [1900, 2000],
      correctAnswerValue: 1938
    },
    {
      question: "Wie wurde der VW Käfer in den USA umgangssprachlich genannt?",
      options: ["Beetle", "Bug", "Volkswagen", "Käfer"],
      answer: "Bug",
      sliderRange: null,
      correctAnswerValue: null
    },
    {
      question: "Welche Motorleistung hatte der VW Käfer in den 60er Jahren?",
      options: ["34 PS", "40 PS", "50 PS", "28 PS"],
      answer: "34 PS",
      sliderRange: [20, 60],
      correctAnswerValue: 34
    },
    {
      question: "Wie wurde der VW Käfer in Mexiko umgangssprachlich genannt?",
      options: ["Vocho", "Coche", "Fusca", "Carro"],
      answer: "Vocho",
      sliderRange: null,
      correctAnswerValue: null
    },
    {
      question: "Welche Farbe war beim VW Käfer am beliebtesten?",
      options: ["Schwarz", "Weiß", "Rot", "Blau"],
      answer: "Weiß",
      sliderRange: null,
      correctAnswerValue: null
    },
    {
      question: "Wie lange dauerte die Entwicklung des ersten VW Käfers?",
      options: ["5 Jahre", "10 Jahre", "3 Jahre", "8 Jahre"],
      answer: "10 Jahre",
      sliderRange: [1, 15],
      correctAnswerValue: 10
    },
    {
      question: "In welchem Jahr wurde der VW Käfer das meistverkaufte Auto der Welt?",
      options: ["1972", "1968", "1970", "1980"],
      answer: "1972",
      sliderRange: [1950, 2000],
      correctAnswerValue: 1972
    },
    {
      question: "Wie viele Generationen des VW Käfers gibt es?",
      options: ["3", "2", "4", "1"],
      answer: "3",
      sliderRange: [1, 5],
      correctAnswerValue: 3
    },
    {
      question: "Welcher Designer war verantwortlich für das ikonische Design des Käfers?",
      options: ["Ferdinand Porsche", "Giorgetto Giugiaro", "Paul Jaray", "Walter de Silva"],
      answer: "Ferdinand Porsche",
      sliderRange: null,
      correctAnswerValue: null
    }
];

let currentQuestionIndex = 0;
let scoreCorrect = 0;
let scoreWrong = 0;
let sliderScore = 0;
const totalQuestions = 5;

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

function loadQuestion() {
  const current = questions[currentQuestionIndex];
  document.getElementById("question").innerText = current.question;

  const guessingBoxes = document.getElementById("guessingBoxes");
  const sliderDiv = document.getElementById("sliderDiv");

  if (current.sliderRange) {
    guessingBoxes.style.display = "none";
    sliderDiv.style.display = "block";

    const slider = document.getElementById("slider");
    const sliderValue = document.getElementById("sliderValue");

    slider.min = current.sliderRange[0];
    slider.max = current.sliderRange[1];
    slider.value = Math.floor((slider.min + slider.max) / 2);
    sliderValue.innerText = `Ihre Schätzung: ${slider.value}`;

    slider.oninput = () => {
      sliderValue.innerText = `Ihre Schätzung: ${slider.value}`;
    };

    document.getElementById("submitSlider").onclick = () => {
      checkSliderAnswer(parseInt(slider.value));
    };
  } else {
    guessingBoxes.style.display = "block";
    sliderDiv.style.display = "none";

    const shuffledOptions = shuffleArray([...current.options]);
    const boxes = [
      document.getElementById("box1"),
      document.getElementById("box2"),
      document.getElementById("box3"),
      document.getElementById("box4")
    ];

    shuffledOptions.forEach((option, index) => {
      const box = boxes[index];
      box.innerText = option;
      box.style.backgroundColor = "#fff10a";
      box.onclick = () => checkAnswer(option, box);
    });
  }
}

function checkAnswer(selectedOption, clickedBox) {
  const correctAnswer = questions[currentQuestionIndex].answer;
  const boxes = [
    document.getElementById("box1"),
    document.getElementById("box2"),
    document.getElementById("box3"),
    document.getElementById("box4")
  ];

  boxes.forEach(box => box.onclick = null);

  if (selectedOption === correctAnswer) {
    clickedBox.style.backgroundColor = "green";
    scoreCorrect++;
  } else {
    clickedBox.style.backgroundColor = "red";
    scoreWrong++;
    boxes.forEach(box => {
      if (box.innerText === correctAnswer) {
        box.style.backgroundColor = "green";
      }
    });
  }

  setTimeout(nextQuestion, 800);
}

function checkSliderAnswer(selectedValue) {
  const correctValue = questions[currentQuestionIndex].correctAnswerValue;
  const range = questions[currentQuestionIndex].sliderRange;

  const percentage = 100 - (Math.abs(correctValue - selectedValue) / (range[1] - range[0]) * 100);
  sliderScore += Math.max(0, Math.round(percentage));

  document.getElementById("sliderFeedback").innerText = `Nähe: ${Math.round(percentage)}%`;

  setTimeout(nextQuestion, 1500);
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < totalQuestions) {
    loadQuestion();
  } else {
    endQuiz();
  }
}

function endQuiz() {
  const questionDiv = document.getElementById("question");
  const guessingBoxes = document.getElementById("guessingBoxes");
  const sliderDiv = document.getElementById("sliderDiv");

  const percentage = Math.round((scoreCorrect / totalQuestions) * 100);
  const totalSliderScore = Math.round(sliderScore / totalQuestions);

  questionDiv.innerText = `Quiz beendet! (${percentage}% richtige Antworten, Slider-Gesamtbewertung: ${totalSliderScore}%)`;
  guessingBoxes.style.display = "none";
  sliderDiv.style.display = "none";
}

questions.sort(() => Math.random() - 0.5);
window.onload = loadQuestion;