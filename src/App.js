import "./app.css";
import Button from "./components/Button";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Loginform from "./components/Login";
import Meme from "./components/Meme";
import Main from "./components/Main";
import Modal from "./components/Modal";
import { createElement, styled } from "./utils/elements";

// const PrimaryButton = styled(Button, "bg-primary");

function App() {
  // player info
  let player = null;

  // Header
  const headerElement = Header();

  // Main
  const mainElement = Main();

  // default when open site - give name by user
  const loginForm = Loginform(
    Button({
      className: "btn--login",
      innerText: "Play ►",
      onclick: () => {
        contentPlacement(input.value);
      },
    })
  );
  mainElement.append(loginForm);

  // Placeholder during loading new content
  const meme = Meme(
    "I've always won, and I'm going to continue to win. And that's the way it is."
  );

  // start game after login
  function contentPlacement(playerName) {
    if (playerName === "") {
      playerName = "anonymous";
    }
    player = playerName;

    mainElement.innerHTML = "";
    mainElement.append(meme);

    // generate game info for first round
    // const gameInfo = getGameInfo();
    // generateGameField(gameInfo);
  }

  // Game Engine

  // getGameInfo()

  // generateGameField(gameInfo)

  // reading players response

  // reaction Donald Trump on players input

  // Footer
  const footerElement = Footer();
  const points = createElement("span", {
    innerText: "0",
    className: "footer--points",
  });
  footerElement.append(points);

  // Game Instructions

  const modal = createElement("div", {
    className: "modalContainer",
    children: [
      createElement("h2", {
        className: "modal-head",
        innerText: "Game instructions",
      }),
      Button({
        className: "btn-close",
        innerText: "X",
        onclick: () => {
          document.querySelector(".modalContainer").classList.toggle("hidden");
        },
      }),
      Modal(),
    ],
  });

  // export site completed
  const container = createElement("div", {
    className: "container",
    children: [headerElement, mainElement, footerElement, modal],
  });

  return container;
}

export default App;
