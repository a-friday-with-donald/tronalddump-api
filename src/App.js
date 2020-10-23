import "./app.css";
import Button from "./components/Button";
import Header from "./components/Header";
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

  async function game() {
    const quote = await getRandomQuote();
    const tags = await getAllTags();
    const answers = [];

    if (quote.tags !== "") {
      answers.push(quote.tags[0]);
    }

    let indexOld = tags.indexOf(quote.tags[0]);

    while (answers.length < 3) {
      const index = Math.floor(Math.random() * (tags.length + 1));
      if (index !== indexOld) {
        answers.push(tags[index]);
        indexOld = index;
      }
    }
  }
  game();
  return container;
}

export default App;
