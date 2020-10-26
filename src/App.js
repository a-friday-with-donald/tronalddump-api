import "./app.css";
import Button from "./components/Button";
import Header from "./components/Header";

import Footer from "./components/Footer";
import Loginform from "./components/Login";
import LoadingAnimation from "./components/LoadingAnimation";
import Meme from "./components/Meme";
import Main from "./components/Main";
import Modal from "./components/Modal";

import getScore from "./utils/localStorage/getScore";
import storeScore from "./utils/localStorage/storeScore";
import deletePlayer from "./utils/localStorage/deletePlayer";
import { getRandomQuote, getAllTags } from "./utils/api";

import { createElement } from "./utils/elements";

function App() {
  let gameInfo = null;
  let playerName = null;
  let nextGameInfo = null;
  const loader = LoadingAnimation();
  const placeholder =
    "I've always won, and I'm going to continue to win. And that's the way it is.";

  const mainElement = Main();

  const loginForm = Loginform({
    onsubmit: (event) => {
      playerName = event;
      nextGameInfo = getQuestionInfo(playerName);
      mainElement.innerHTML = "";
      const meme = Meme(placeholder, "Donald Trump");
      mainElement.append(meme, loader);
      gameEngine();
    },
  });
  mainElement.append(loginForm);

  async function gameEngine(answerPlayer = -1) {
    if (answerPlayer !== -1) {
      if (gameInfo.correctAnswer === -1) {
        mainElement.innerHTML = "";
        const meme = Meme(
          `${playerName}! Right or Wrong? Never mind.`,
          `+ 0 points`
        );
        mainElement.append(meme);
      }

      if (gameInfo.answers[answerPlayer].includes(gameInfo.correctAnswer)) {
        mainElement.innerHTML = "";
        const meme = Meme(`${playerName}! You nailed it!`, `+ 1 points`);
        mainElement.append(meme);
        storeScore(playerName, 1);
      }

      if (!gameInfo.answers[answerPlayer].includes(gameInfo.correctAnswer)) {
        mainElement.innerHTML = "";
        const meme = Meme(
          `I knew you're Fake News. I was talking about ${gameInfo.correctAnswer}.`,
          `${playerName}! You are fired and you loose all points ...`
        );
        mainElement.append(meme);
        points.innerText = deletePlayer(playerName);
      }
    }

    gameInfo = await nextGameInfo;
    points.innerText = getScore(playerName);
    nextGameInfo = getQuestionInfo(playerName);
    setTimeout(() => {
      generateGameField();
    }, 2500);
  }

  const footerElement = Footer();
  const points = createElement("span", {
    className: "footer--points",
  });

  gameInfo ? (points.innerText = gameInfo.score) : (points.innerText = "0");

  footerElement.append(points);

  function generateGameField() {
    const meme = Meme(gameInfo.quote);
    const buttonContainer = createElement("div", {
      className: "buttonContainer",
      children: [
        Button({
          innerText: gameInfo.answers[0],
          className: "btn btn--answer",
          onclick: () => gameEngine(0),
        }),
        Button({
          innerText: gameInfo.answers[1],
          className: "btn btn--answer",
          onclick: () => gameEngine(1),
        }),
        Button({
          innerText: gameInfo.answers[2],
          className: "btn btn--answer",
          onclick: () => gameEngine(2),
        }),
      ],
    });
    mainElement.innerHTML = "";
    mainElement.append(meme, buttonContainer);
  }

  const container = createElement("div", {
    className: "container",
    children: [Header(), mainElement, footerElement, Modal()],
  });

  return container;
}

export default App;

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

  const mixedChoices = choices.sort(() => Math.random() - 0.5);

  return {
    quote: quote.quote,
    score: playerScore,
    answers: mixedChoices,
    correctAnswer: rightAnswer,
  };
}
