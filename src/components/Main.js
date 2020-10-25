import "./main.css";
import { createElement } from "../utils/elements";

function Main() {
  const quote = createElement("p", {
    innerText:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua.",
  });

  const quoteContainer = createElement("div", {
    className: "memeTextContainer",
    children: [quote],
  });

  const selection1 = createElement("button", {
    className: "selection",
    innerText: "Donald Trump",
  });

  const selection2 = createElement("button", {
    className: "selection",
    innerText: "Donald Trump",
  });

  const selection3 = createElement("button", {
    className: "selection",
    innerText: "Donald Trump",
  });

  const selectionContainer = createElement("div", {
    className: "selectionContainer",
    children: [selection1, selection2, selection3],
  });

  const main = createElement("main", {
    className: "main",
    children: [quoteContainer, selectionContainer],
  });

  return main;
}

export default Main;
