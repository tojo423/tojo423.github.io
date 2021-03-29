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
      "Damage over time= An ability, attack, or effect which deals damage over time.",
      "Double buff= When a player simultaneously has blue buff and red buff.",
      "Early game= Refers to the first 10-15 minutes of a match when the Top, Mid, and Bot",
      "Elder Drake= A more powerful dragon that spawns after 35 minutes (5 minutes after last dragon is slain).",
      "Farm= The act of last-hitting a minion or jungle monster to collect gold and experience.",
      "Facecheck= To enter a bush or fog of war without vision.",
      "Fed= When a champion is ahead in gold, levels, and/or kills so that they are much stronger than the enemy team.",
    ],
  },
  {
    name: "CS:GO",
    words: [
      "ADS=	Aiming Down Sight, looking down the scope of your weapon.",
      "Aimbot=	A hack that aims at an enemy player for you.",
      "Aimpunch=	The aim movement on a character when they are hit with a bullet when they have no armor.",
      "Auto Shotty=	Nickname for the automatic XM 1014 Shotgun.",
      "Auto Sniper=	Nickname for both the G3SG1 and Scar-20.",
      "Bait=	Using you or someone else to get the attention of an enemy player, OR making players come to you on purpose while using your location to your advantage.",
      "Boost=	Letting a player stand on your head, usually to give them a better angle higher up.",
      "Boosting=	Carrying a player or team so they rank up in competitive matches.",
      "Buffed=	When something has been made better by a game update making it better if you take advantage of it.",
      "Burst= Fire	Shooting bullets in lots of around 3 bullets each time.",
      "Carrying=	Being the most valued player on the mean by making them win without their help.",
      "Choking=	Failing under pressure.",
      "Clutch=	When a person is the last player left on their team and he wins the round. Usually with multiple enemies still alive.",
      "Collateral=	Killing two or more players with a single shot or bullet.",
      "Deagle=	A Desert Eagle.",
      "Dinked=	A bullet hit to the head.",
      "Dualies=	Nickname for the Dual Berettas.",
      "Eco=	Saving money by making little to no purchases to boost the team’s economy for future rounds.",
      "Entry Frag=	When a team is attempting to take over a location and gets the first kill.",
      "Flashbang=	Another name for a flash grenade.",
      "Force Buy=	A team strategy to purchase weapons even if one or more players are poor.",
      "Jump Throw=	An action of jumping and throwing a grenade.",
      "Lag=	A delay. Usually in reference to the server not receiving communication to and from your computer via the internet.",
      "Lit=	Taken heavy damage, usually leaving a player under 10 health.",
      "Molly=	A nickname for the Molotov and Incendiary Grenade.",
      "Nade Stack=	Multiple players through HE grenades at a single spot to kill any enemies in that area.",
      "Nerfed=	When something has been made worse due to an update that gives a disadvantage if you use it.",
      "No-scope=	Shooting a weapon with a scope without looking into it.",
      "Noob=	New player.",
      "One Deag=	Killing a player with one hit to the head with a Desert Eagle.",
      "One Shot=	A kill on the enemy with one bullet to the head.",
      "Pick=	Coming out from an angle and killing one enemy player.",
      "Peek=	Coming out of an angle to see another area of the map. Usually to check for enemy coming.",
      "Pop Flash=	A flash grenade that explodes before the enemy has a chance to look away.",
      "Pre aim=	Having your crosshair at a location enemy players be. Usually on the corner that an enemy player will peek.",
      "Pre fire=	Shotting at a spot as soon as you turn a corner or through smoke without knowing if an enemy player will be there.",
      "Pro= Short term for Professional.",
      "Quickscope=	Scoping in and shooting instantly without using your scope to aim.",
      "Retake=	Taking a position after it’s been lost to the enemy team.",
      "Rotate=	Moving from one object to another on a map.",
      "Save=	An attempt to hide and save the weapon by not dying to enemy players when a player believes they will die in an engagement.",
      "Scout=	The SSG 08 Sniper Rifle.",
      "Scrim=	A practice competitive match between two teams.",
      "Shoulder Peek=	Similar to strafing, but exposing your shoulder quickly around a corner to make the enemy shoot at you and miss.",
      "Smurf=	A person using a secondary account that has a lower competitive rank for easier games.",
      "Spamming=	Shooting non-stop, very inaccurate.",
      "Spinbot=	A cheat used commonly in Counter-Strike: Source that spins the player around consistently making it hard for them to be hit.",
      "Split Push=	Attempting to take a location on the map from multiple angles with your team.",
      "Stack=	Having the majority of players on a team at the same location on the map.",
      "Straffing=	Moving left and right consistantly making it harder for enemy players to hit you.",
      "Swing=	Moving further out when you move to see another part of the map. Used to throw off people who pre-aim corner.",
      "Tagged=	When a player or enemy has taken a small amount of damage.",
      "Toggling=	Turning on hacks.",
      "Triggerbot=	A cheat that shoots your weapon as soon as an enemy player is in your crosshair.",
      "Utility=	Items that are not primary or secondary weapons such as grenades and the zeus.",
      "Wallbang=	Hitting someone with a bullet through a wall.",
    ],
  },
];

const MAX_LIVES = 10;

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

//sounds
const sfxDict = {
  lose: createSfx(soundLink("lose")),
  win: createSfx(soundLink("win")),
  giveup: createSfx(soundLink("giveup")),
  button: createSfx(soundLink("button")),
  incorrect: createSfx(soundLink("incorrect")),
};

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

function soundLink(name) {
  return `https://github.com/tojo423/tojo423.github.io/blob/main/sounds/${name}.wav?raw=true`;
}

function createSfx(src) {
  var sfx = new Audio(src);
  sfx.preload = "auto";
  return sfx;
}

function playSfx(id) {
  console.log("playing sfx", id);
  const sfx = sfxDict[id];
  sfx.currentTime = 0;
  sfx.play();
}

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
      }, 1000);
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
  currWordNoSpace = currWord.replaceAll(" ", "");

  console.log("currWord", currWord);
  console.log("currWordNoSpace", currWordNoSpace);

  remainingChars = [...currWordNoSpace];
  console.log("remainingChars", remainingChars);
  console.log("==========");
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
  playSfx("lose");
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
  playSfx("win");
  setUiState("has_won");
  setInputsColor("is-success");
}

function setInputsColor(colorClass) {
  for (let input of currInputs) {
    input.classList.remove("is-warning", "is-danger", "is-success");
    input.classList.remove();
    if (colorClass) {
      input.classList.add(colorClass);
    }
  }
}

function updateLives() {
  livesCounter.innerText = currLives;
  livesCounter.classList.remove("is-info", "is-warning", "is-danger");
  let colorClass = null;
  if (currLives <= 3) {
    colorClass = "is-danger";
  } else if (currLives <= 6) {
    colorClass = "is-warning";
  } else if (currLives <= 10) {
    colorClass = "is-info";
  }
  livesCounter.classList.add(colorClass);
}

function loseLife() {
  playSfx("incorrect");
  currLives--;
  if (currLives <= 0) {
    currLives = 0;
    loseGame();
  }
  updateLives();
}

function giveUp() {
  playSfx("giveup");
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

    playSfx("button");

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
