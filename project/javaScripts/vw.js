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
      bigImage.classList.add('stretch-animation');
      setTimeout(() => bigImage.classList.remove('stretch-animation'), 500);

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

//questions array generated with chatGPT

const questions = [
  {
      question: "In welchem Jahr wurde der erste VW Käfer produziert?",
      options: ["1938", "1945", "1950", "1960"],
      answer: "1938"
  },
  {
      question: "Wie lautet die interne VW-Bezeichnung für den Käfer?",
      options: ["Typ 1", "Typ 2", "Typ 3", "Typ 4"],
      answer: "Typ 1"
  },
  {
      question: "Wie viele Käfer wurden weltweit ungefähr verkauft?",
      options: ["Über 21 Millionen", "Über 10 Millionen", "Über 5 Millionen", "Über 30 Millionen"],
      answer: "Über 21 Millionen"
  },
  {
      question: "Welche Motorposition hatte der VW Käfer?",
      options: ["Heckmotor", "Frontmotor", "Mittelmotor", "Hybridmotor"],
      answer: "Heckmotor"
  },
  {
      question: "Welcher berühmte Regisseur fuhr einen VW Käfer?",
      options: ["Steven Spielberg", "Alfred Hitchcock", "George Lucas", "Quentin Tarantino"],
      answer: "Alfred Hitchcock"
  },
  {
      question: "Wie nannte man den Käfer in den USA?",
      options: ["Bug", "Beetle", "Beagle", "Buzz"],
      answer: "Beetle"
  },
  // ... more questions possible
];

let currentQuestionIndex = 0;
let scoreCorrect = 0;
let scoreWrong = 0;
const totalQuestions = 5;

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

function loadQuestion() {
  const current = questions[currentQuestionIndex];
  document.getElementById("question").innerText = current.question;

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

function checkAnswer(selectedOption, clickedBox) {
  const correctAnswer = questions[currentQuestionIndex].answer;
  const boxes = [box1, box2, box3, box4];

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

  setTimeout(() => {
      currentQuestionIndex++;
      if (currentQuestionIndex < totalQuestions) {
          loadQuestion();
      } else {
          endQuiz();
      }
  }, 1500);
}

function endQuiz() {
  const questionDiv = document.getElementById("question");
  const guessingBoxes = document.getElementById("guessingBoxes");

  const percentage = Math.round((scoreCorrect / totalQuestions) * 100);

  questionDiv.innerText = `Quiz beendet! (${percentage}% richtig beantwortet)`;
  guessingBoxes.style.display = "none";
}

questions.sort(() => Math.random() - 0.5);
window.onload = loadQuestion;
