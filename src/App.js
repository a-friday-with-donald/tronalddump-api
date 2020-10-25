import "./app.css";
import Button from "./components/Button";
import Header from "./components/Header";

import Footer from "./components/Footer";
import Loginform from "./components/Login";
import Meme from "./components/Meme";
import Main from "./components/Main";
import Modal from "./components/Modal";

import getScore from "./utils/localStorage/getScore";
import storeScore from "./utils/localStorage/storeScore";
import deletePlayer from "./utils/localStorage/deletePlayer";
import { getRandomQuote, getAllTags } from "./utils/api";

import { createElement } from "./utils/elements";


function App() {
  // configuration default
  let gameInfo = null;
  let playerName = null;
  const placeholder =
    "I've always won, and I'm going to continue to win. And that's the way it is.";

  // Main
  const mainElement = Main();

  // default when open site - give name by user
  const loginForm = Loginform({
    onsubmit: (event) => {
      playerName = event;
      // Placeholder during loading new content
      mainElement.innerHTML = "";
      const meme = Meme(placeholder, "Donald Trump");
      mainElement.append(meme);
      gameEngine();
    },
  });
  mainElement.append(loginForm);

  // Game Engine
  async function gameEngine(answerPlayer = -1) {
    // the player played the game
    if (answerPlayer !== -1) {
      // there is no right answer
      if (gameInfo.correctAnswer === -1) {
        mainElement.innerHTML = "";
        const meme = Meme(
          `${playerName}! Right or Wrong? Never mind.`,
          `+ 0 points`
        );
        mainElement.append(meme);
      }

      // the player choose the right one
      if (gameInfo.answers[answerPlayer].includes(gameInfo.correctAnswer)) {
        mainElement.innerHTML = "";
        const meme = Meme(`${playerName}! You nailed it!`, `+ 1 points`);
        mainElement.append(meme);
        storeScore(playerName, 1);
      }

      // the player choose the wrong one
      if (!gameInfo.answers[answerPlayer].includes(gameInfo.correctAnswer)) {
        mainElement.innerHTML = "";
        const meme = Meme(`${playerName}! You are fired`, `loose all points`);
        mainElement.append(meme);
        points.innerText = deletePlayer(playerName);
      }
    }

    gameInfo = await getQuestionInfo(playerName);
    points.innerText = gameInfo.score;
    setTimeout(() => {
      generateGameField();
    }, 2500);
  }

  // Footer
  const footerElement = Footer();
  const points = createElement("span", {
    className: "footer--points",
  });
  if (gameInfo) {
    points.innerText = gameInfo.score;
  } else {
    points.innerText = "0";
  }
  footerElement.append(points);

  // build the game board on screen
  function generateGameField() {
    const meme = Meme(gameInfo.quote);
    const buttonContainer = createElement("div", {
      className: "buttonContainer",
      children: [
        Button({
          innerText: gameInfo.answers[0],
          className: "btn btn-one",
          onclick: () => gameEngine(0),
        }),
        Button({
          innerText: gameInfo.answers[1],
          className: "btn btn-two",
          onclick: () => gameEngine(1),
        }),
        Button({
          innerText: gameInfo.answers[2],
          className: "btn btn-three",
          onclick: () => gameEngine(2),
        }),
      ],
    });
    mainElement.innerHTML = "";
    mainElement.append(meme, buttonContainer);
  }

  // export site completed
  const container = createElement("div", {
    className: "container",
    children: [Header(), mainElement, footerElement, Modal()],
  });

  return container;
}

export default App;

// get game infos for the round
async function getQuestionInfo(playerName) {
  const quote = await getRandomQuote();
  const answers = await getAllTags();
  const playerScore = getScore(playerName);

  const answerPool = answers.filter(Boolean);
  let choices = [];
  let rightAnswer = quote.rightAnswer;
  let indexAlreadyAdded = null;

  const isValid = Boolean(rightAnswer);

  if (isValid) {
    choices.push(rightAnswer);
    indexAlreadyAdded = answerPool.indexOf(rightAnswer);
  } else {
    rightAnswer = -1;
  }

  while (choices.length < 3) {
    let index = Math.floor(Math.random() * answerPool.length);
    if (index !== indexAlreadyAdded) {
      choices.push(answerPool[index]);
      indexAlreadyAdded = index;
    }
  }

  // mixin the array
  const mixedChoices = choices.sort(() => Math.random() - 0.5);

  return {
    quote: quote.quote,
    score: playerScore,
    answers: mixedChoices,
    correctAnswer: rightAnswer,
  };
}
