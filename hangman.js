const Categories = [
  {
    name: "League of Legends",
    words: [
      "Balance= The act of Riot trying to make the game feel fairer through buffs, nerfs, and other changes.",
      "Baron Nashor= A neutral monster that spawns at either 19:45 or 19:55 depending on if Rift",
      "Blind pick= An early pick in champ select. It’s “blind” because you leave your champion open to be counter-picked.",
      "Blue buff= Refers to Crest of Insight, the temporary buff you receive when killing the Blue Sentinel or an enemy who had the buff.",
      "Bounty= A gold reward for killing a player who has a gold lead due to getting kills or a farm lead.",
      "Buff= An ability that empowers you or your ally, usually through increasing stats.",
      "Burst= To deal a large amount of damage instantly with an attack or an ability.",
      "Champion pool= A rotation of champions that a player uses to climb and/or is known for playing.",
      "Cheese= To use an unconventional and/or unpredictable strategy to win.",
      "Crowd control= Also known as “CC”.",
      "Counter pick= A champion pick that is chosen to create a favorable matchup against an already picked enemy champion.",
      "Creeps= Lane minions or jungle monsters (usually refers to smaller monsters).",
      "Creep Score= The number of minions, monsters, and other things (such as wards) that a player has killed.",
      "Dive= To look to kill an opponent while they are in range of their turret.",
      "Double buff= When a player simultaneously has blue buff and red buff.",
      "Early game= Refers to the first 10-15 minutes of a match when the Top, Mid, and Bot",
      "Elder Drake= A more powerful dragon that spawns after 35 minutes (5 minutes after last dragon is slain).",
      "Farm= The act of last-hitting a minion or jungle monster to collect gold and experience.",
      "Facecheck= To enter a bush or fog of war without vision.",
      "Fed= When a champion is ahead in gold, levels, and/or kills so that they are much stronger than the enemy team.",
    ],
  },
];

const MAX_LIVES = 5;

const startBox = document.querySelector("#start-box");
const playText = document.querySelector("#play-text");
const startButton = document.querySelector("#start-button");

const playField = document.querySelector("#play-field");
const alphabetSection = document.querySelector("#alphabet-section");
const alphabetContainer = document.querySelector("#alphabet-container");
const inputsContainer = document.querySelector("#inputs-container");
const hint = document.querySelector("#hint");

const infoBox = document.querySelector("#info-box");
const chosenCategory = document.querySelector("#chosen-category");
const livesCounter = document.querySelector("#lives-counter");
const giveUpBlock = document.querySelector("#give-up-block");
const giveUpButton = document.querySelector("#give-up");

let giveUpBlockContainer = giveUpBlock.parentElement;

let currCategory = null;

let currWord = null;
let currWordNoSpace = null;
let remainingChars = null;
let guessedChars = [];

let currHint = null;

let currInputs = [];

let currLives = MAX_LIVES;

let state = "initial";
let gameOver = false;

setUiState();
createAlphabetButtons();

startButton.onclick = beginGame;
giveUpButton.onclick = giveUp;

function setEmlsVisible(visible, invisible) {
  if (visible) {
    for (let elm of visible) {
      elm.classList.remove("is-hidden");
    }
  }
  if (invisible) {
    for (let elm of invisible) {
      elm.classList.add("is-hidden");
    }
  }
}

//updates the interface based on the current state
function setUiState(newState) {
  newState = newState || state;
  switch (newState) {
    //user has not yet started the game
    case "initial":
      playText.innerText = "Press Play to begin";
      setEmlsVisible([startBox], [playField]);
      break;
    //user has started the game, and is now playing
    case "is_playing":
      setEmlsVisible([playField, infoBox, alphabetContainer], [startBox]);
      startButton.innerText = "Play again!";
      giveUpBlock.remove();
      setTimeout(() => {
        if (state === "is_playing") {
          giveUpBlockContainer.append(giveUpBlock);
        }
      }, 3000);
      break;
    //user has guessed the word corrently and won
    case "has_won":
      playText.innerText = "Congratz, you won!!!";
      setTextColor(playText, "has-text-success");
      setEmlsVisible([startBox], [alphabetContainer, infoBox]);
      break;
    //user pressed the give up button
    case "has_given_up":
      playText.innerText = "You never had it in you. Better luck next time!";
      setTextColor(playText, "has-text-warning");
      setEmlsVisible([startBox], [infoBox, alphabetContainer]);
      break;
    //user lost all his lives and lost
    case "has_lost":
      playText.innerText = "You lose. Improve yourself!";
      setTextColor(playText, "has-text-danger");
      setEmlsVisible([startBox], [infoBox, alphabetContainer]);
      break;
    default:
      console.log("undefined state", newState);
      break;
  }
  state = newState;
}

resetGame = () => {};

function setTextColor(elm, colorClass) {
  elm.classList.remove("has-text-danger");
  elm.classList.remove("has-text-warning");
  elm.classList.remove("has-text-success");
  if (colorClass) {
    elm.classList.add(colorClass);
  }
}

function beginGame() {
  console.log("begin game called!");

  setUiState("is_playing");

  currCategory = Categories[Math.floor(Math.random() * Categories.length)];

  const currWordIndex = Math.floor(Math.random() * currCategory.words.length);
  const currWordRaw = currCategory.words[currWordIndex];

  const wordComps = currWordRaw.split("=");
  currWord = wordComps[0].toUpperCase();
  currWordNoSpace = currWord.replace(" ", "");

  remainingChars = [...currWordNoSpace];
  guessedChars = [];

  currHint = wordComps[1].trim();

  createInputs();
  hint.innerText = currHint;

  chosenCategory.innerText = currCategory.name;

  currLives = MAX_LIVES;
  updateLives();

  setInputsColor();

  console.log(currWord, currHint);
}

function loseGame() {
  setUiState("has_lost");
  revealLetters("is-danger");
}

function revealLetters(colorClass) {
  console.log("revealLetters", colorClass);
  for (i = 0; i < currWordNoSpace.length; i++) {
    const guessedLetter = guessedChars[i];
    if (!Boolean(guessedLetter)) {
      const input = currInputs[i];
      input.value = remainingChars[i];
      input.classList.remove("is-warning");
      input.classList.remove("is-danger");
      if (colorClass) {
        input.classList.add(colorClass);
      }
    }
  }
}

function winGame() {
  setUiState("has_won");
  setInputsColor("is-success");
}

function setInputsColor(colorClass) {
  for (let input of currInputs) {
    input.classList.remove("is-warning");
    input.classList.remove("is-danger");
    input.classList.remove("is-success");
    if (colorClass) {
      input.classList.add(colorClass);
    }
  }
}

function updateLives() {
  livesCounter.innerText = currLives;
}

function loseLife() {
  currLives--;
  updateLives();
  if (currLives <= 0) loseGame();
}

function giveUp() {
  setUiState("has_given_up");
  revealLetters("is-warning");
}

function alphabetOnClick(letter) {
  console.log(letter);

  const remainingIndex = remainingChars.indexOf(letter);
  if (remainingIndex !== -1) {
    // character found in remaining array
    remainingChars[remainingIndex] = undefined;
    guessedChars[remainingIndex] = letter;
    currInputs[remainingIndex].value = letter;

    if (remainingChars.filter(Boolean).length === 0) {
      winGame();
    }

    console.log("remainingChars", remainingChars);
    console.log("guessedChars", guessedChars);
  } else {
    loseLife();
  }
}

function createAlphabetButtons() {
  for (i = 65; i <= 90; i++) {
    const letter = String.fromCharCode(i);
    const button = document.createElement("button");
    button.classList.add("button", "m-2");
    button.append(letter);
    button.onclick = () => alphabetOnClick(letter);
    alphabetContainer.append(button);
  }
}

function createInputs() {
  for (input of currInputs) {
    input.remove();
  }
  currInputs = [];

  const words = currWord.split(" ");
  console.log("words", words);
  for (i = 0; i < words.length; i++) {
    const wordContainer = document.createElement("div");
    wordContainer.classList.add("word");
    inputsContainer.append(wordContainer);

    const wordChars = [...words[i]];
    console.log("wordChars", wordChars);
    for (j = 0; j < wordChars.length; j++) {
      const input = document.createElement("input");
      input.classList.add(
        "letter-input",
        "input",
        "has-text-centered",
        "is-uppercase",
        "is-size-5",
        "has-text-weight-semibold",
        "is-half"
      );
      input.readOnly = true;
      input.maxLength = 1;
      input.type = "text";
      input.onfocus = () => input.blur();

      wordContainer.append(input);

      currInputs.push(input);
    }
  }
}
