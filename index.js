let words = [
  {
    word: "programming",
    description: "Similar to Coding",
  },
  {
    word: "computer",
    description: "Device to Compute",
  },
  {
    word: "science",
    description: "Branch of Study",
  },
  {
    word: "laravel",
    description: "Php Framework",
  },
  {
    word: "react",
    description: "Javascript Library",
  },
  {
    word: "angular",
    description: "Javascript Framework",
  },
  {
    word: "vue",
    description: "Javascript Framework",
  },
  {
    word: "django",
    description: "Python Framework",
  },
  {
    word: "pygame",
    description: "Python Framework",
  },
  {
    word: "flask",
    description: "Python Framework",
  },
];

// selector variables
const keyboardContainer = document.querySelector(".keyboard-container");
const lifeContainer = document.querySelector(".life-container");
const wordContainer = document.querySelector(".word-container");
const hint = document.querySelector(".hint");
const overlay = document.querySelector(".overlay");
const result = document.querySelector(".result");
const reset = document.getElementById("reset");
const wrongGuessContainer = document.querySelector(".wrong-guess");

const Platform = document.getElementById("Platform");
const Arms = document.getElementById("Arms");
const Legs = document.getElementById("Legs");
const Face = document.getElementById("Face");
const Torso = document.getElementById("Torso");
const Rope = document.getElementById("Rope");
const Body = document.getElementById("Body");

Arms.style.display="none";
Legs.style.display="none";
Face.style.display="none";
Torso.style.display = "none";
Rope.style.display = "none";

// end of selector variables
//public variables
let lives = 5;
let word = "";
let guessed = [];
let wrongGuess = [];
let user_guess = "";
let lives_array = [true, true, true, true, true];
// lifeContainer.innerHTML = lives;

reset.addEventListener("click", resetGame);

function resetGame() {
  window.location.reload();
}

function random_word() {
  let temp = words[Math.floor(Math.random() * words.length)];
  word = temp.word;
  hint.innerHTML = temp.description;
}
random_word();

function create_life() {
  for (let i = 0; i < lives_array.length; i++) {
    life = document.createElement("i");
    life.classList.add("material-icons");
    life.classList.add("life");
    life.setAttribute("data", i);
    lifeContainer.appendChild(life);
    life.innerHTML = "favorite";
  }
}

function update_life() {
  let lives_left = document.querySelectorAll("i");
  for(let i =0 ;i<lives_array.length;i++){
    if(!lives_array[i])
      lives_left.forEach(life=>{
        if(life.getAttribute('data') == i)
          life.innerHTML = "favorite_border";
      })

  }
  

  
}

create_life();

function guessedWord() {
  user_guess = word
    .split("")
    .map((letter) => (guessed.indexOf(letter) >= 0 ? letter : "  _  "))
    .join("");
  wordContainer.innerHTML = user_guess;
}

function generate_letters() {
  let letters = "abcdefghijklmnopqrstuvwxyz".split("").map(
    (letter) =>
      `
    <button class="letter-button non-disabled" id="${letter}" onClick = "guess('${letter}')">${letter}</button>
    `
  );
  keyboardContainer.innerHTML = letters.join("");
}

function guess(letter) {
  guessed.indexOf(letter) == -1 ? guessed.push(letter) : null;
  let thisLetter = document.getElementById(letter);

  thisLetter.setAttribute("disabled", true);
  thisLetter.classList.add("disabled");
  thisLetter.classList.remove("non-disabled");

  if (word.indexOf(letter) >= 0) {
    guessedWord();
    checkGameWon();
  } else if (word.indexOf(letter) == -1) {
    wrongGuess.push(letter);
    fillWrongGuess();
    update_life_array(lives);
    lives--;
    display_man();
    update_life();
    gameLost();
  }
  console.log(lives);
}

function update_life_array(lives) {
  lives_array[lives-1] = false;
}

function checkGameWon() {
  console.log(user_guess);
  if (user_guess === word) gameOver(true);
}
function gameLost() {
  if (lives == 0) gameOver(false);
}

generate_letters();
guessedWord();

function gameOver(status) {
  let message = status ? `You Won! The Word was <br> <span class="capitalize">"${word}</span>"` : `You Loose!  The Word was <br> <span class="capitalize">"${word}</span>"`;
  console.log(message);
  result.innerHTML = message;
  overlay.style.visibility = "visible";
}

function fillWrongGuess(){
  wrongGuessContainer.innerHTML = wrongGuess.join(' ')
}

function display_man(){
  switch(lives){
    case 5:
      Arms.style.display="none";
      Legs.style.display="none";
      Face.style.display="none";
      Torso.style.display = "none";
      Rope.style.display = "none";
      break;
    case 4:
      Rope.style.display="block";
      break;
    case 3:
      Face.style.display = "block";
      break;
    case 2:
      Torso.style.display="block";
      break;
    case 1:
      Arms.style.display="block";
      break;
    case 0:
      Legs.style.display = "block";
      Body.classList.add('man-die');
      break;
  }
}