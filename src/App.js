import "./app.css";
import Button from "./components/Button";
import Header from "./components/Header";

import Footer from "./components/Footer";
import Loginform from "./components/Login";
import Meme from "./components/Meme";
import Main from "./components/Main";
import Modal from "./components/Modal";

import { getScore } from "./utils/localStorage/getScore";
import { storeScore } from "./utils/localStorage/storeScore";
import { getRandomQuote, getAllTags } from "./utils/api";

import { createElement, styled } from "./utils/elements";

// const PrimaryButton = styled(Button, "bg-primary");

function App() {
  // player info
  let player = null;
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
        contentPlacement(input.value);
      },
    })
  );
  mainElement.append(loginForm);

  
  // start game after login
  function contentPlacement(playerName) {
    if (playerName === "") {
      playerName = "Pete";
    }
    player = playerName;
    
    // Placeholder during loading new content
    const meme = Meme(placeholder, "Donald Trump");

    mainElement.innerHTML = "";
    mainElement.append(meme);

    // generate game info for first round
    // const gameInfo = getGameInfo();
    generateGameField();
  }

  // Game Engine

  // getGameInfo()

  // generateGameField(gameInfo)
  function generateGameField() {
    mainElement.innerHTML = "";
    const meme = Meme(placeholder);
    const buttonContainer = createElement("div", {
      className: "buttonContainer",
      children: 
      [
        Button({
          innerText: "Fake 1",
          className: "btn btn-one"
        }),
        Button({
          innerText: "Fake 2",
          className: "btn btn-two"
        }),
        Button({
          innerText: "Fake 3",
          className: "btn btn-three"
        }),
      ]
    })
    
    mainElement.append(meme, buttonContainer);
  };

  // reading players response

  // reaction Donald Trump on players input

  // Footer
  const footerElement = Footer();
  const points = createElement("span", {
    innerText: "0",
    className: "footer--points",
  });
  footerElement.append(points);

  // export site completed
  const container = createElement("div", {
    className: "container",
    children: [Header(), mainElement, footerElement, Modal()],
  });

  const playerName = "Horst";

  function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }

  async function game(playerName) {
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

  const gameData = game(playerName);

  function gameResult(gameData, index) {
    if (gameData.correctAnswer.length === 0) {
      storeScore(playerName, 2);
      console.log("You nailed it!!!");
    }
    if (gameData.answers[index].includes(gameData.correctAnswer)) {
      storeScore(playerName, 1);
    }
    game(playerName);
  }
  return container;
}

export default App;
