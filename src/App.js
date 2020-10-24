import "./app.css";
import Button from "./components/Button";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Meme from "./components/Meme";
import Main from "./components/Main";
import { createElement, styled } from "./utils/elements";

// const PrimaryButton = styled(Button, "bg-primary");

function App() {
  const headerElement = Header();

  const mainElement = Main();
  mainElement.append(Meme("I've always won, and I'm going to continue to win. And that's the way it is."));

  const footerElement = Footer();
  const points = createElement("span", {
    innerText: "0",
    className: "footer--points",
  });
  footerElement.append(points);




  const container = createElement("div", {
    className: "container",
    children: [headerElement, mainElement, footerElement],
  });
  return container;
}

export default App;
