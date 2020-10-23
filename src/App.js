import "./app.css";
import Button from "./components/Button";
import Header from "./components/Header";
import { getScore } from "./utils/localStorage/getScore";
import { storeScore } from "./utils/localStorage/storeScore";
import { getRandomQuote, getAllTags } from "./utils/api";
import { createElement, styled } from "./utils/elements";

const PrimaryButton = styled(Button, "bg-primary");

function App() {
  const header = Header();

  const main = createElement("main", {
    innerText: "👋",
  });

  const container = createElement("div", {
    children: [
      header,
      main,
      Button({ innerText: "Hello" }),
      PrimaryButton({ innerText: "World" }),
    ],
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
