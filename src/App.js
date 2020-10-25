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
import { getRandomQuote, getAllTags } from "./utils/api";

import { createElement, styled } from "./utils/elements";

// const PrimaryButton = styled(Button, "bg-primary");

function App() {
  // configuration default
  let gameInfo = {};
  let playerName = "Pete";
  const placeholder =
    "I've always won, and I'm going to continue to win. And that's the way it is.";

  // Main
  const mainElement = Main();

  // default when open site - give name by user
  const loginForm = Loginform(
    Button({
      className: "btn btn--login",
      innerText: "Play ►",
      onclick: () => {
        if (input.value === "") {
          gameEngine();
        } else {
          playerName = input.value;
          gameEngine();
        }
      },
    })
  );
  mainElement.append(loginForm);

  // Game Engine
  function gameEngine(answerPlayer = -1) {
    // the player played the game
    if (answerPlayer !== -1) {

      // there is no right answer
      if (gameInfo.correctAnswer.length === 0) {
        const meme = Meme(
          `${playerName}! Right or Wrong? Never mind.`,
          `+ 0 points`
        );
        mainElement.append(meme);
        gameInfo = getQuestionInfo(playerName);
        generateGameField();
        return;
      }

      // the player choose the right one
      if (gameInfo.answers[answerPlayer].includes(gameInfo.correctAnswer)) {
        const meme = Meme(`${playerName}! You nailed it!`, `+ 1 points`);
        mainElement.append(meme);
        storeScore(playerName, 1);
      }

      // the player choose the wrong one
      const meme = Meme(`${playerName}! You are fired`, `loose all points`);
      mainElement.append(meme);
      storeScore(playerName, 1);
      
    } else {
      // Placeholder during loading new content
      mainElement.innerHTML = "";
      const meme = Meme(placeholder, "Donald Trump");
      mainElement.append(meme);
    }

    gameInfo = getQuestionInfo(playerName);
    generateGameField();
  }

  // Footer
  const footerElement = Footer();
  const points = createElement("span", {
    innerText: "0",
    className: "footer--points",
  });
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
          onclick: gameEngine(0),
        }),
        Button({
          innerText: gameInfo.answers[1],
          className: "btn btn-two",
          onclick: gameEngine(1),
        }),
        Button({
          innerText: gameInfo.answers[2],
          className: "btn btn-three",
          onclick: gameEngine(2),
        }),
      ],
    });
    points.innerText = gameInfo.score;
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

// helper function
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

// get game infos for the round
async function getQuestionInfo(playerName) {
  const quote = await getRandomQuote();
  const tags = await getAllTags();
  const playerScore = getScore(playerName);
  const answers = [];
  let correctAnswer = quote.tags[0];

  if (correctAnswer !== "") {
    answers.push(correctAnswer);
  }

  let indexOld = tags.indexOf(correctAnswer);

  while (answers.length < 3) {
    const index = Math.floor(Math.random() * (tags.length + 1));
    if (index !== indexOld) {
      answers.push(tags[index]);
      indexOld = index;
    }
  }
  return {
    quote: quote.quote,
    score: playerScore,
    answers: shuffle(answers),
    correctAnswer: correctAnswer,
  };
}
