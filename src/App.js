import "./app.css";
import Button from "./components/Button";
import Header from "./components/Header";
import { createElement, styled } from "./utils/elements";

import { getScore, storeScore, deletePlayer } from "./utils/localStorage";

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

  const score = storeScore(1, 10);

  console.log(`Player 1, saved score: ${score}`);

  console.log(`test if data is in storage: ${getScore(1)}`);

  const final= deletePlayer(1);
  console.log(`delete player 1, successful: ${final}`);




  return container;
}

export default App;
