import "./app.css";
import Button from "./components/Button";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Loginform from "./components/Login";
import Meme from "./components/Meme";
import Main from "./components/Main";
import { createElement, styled } from "./utils/elements";

// const PrimaryButton = styled(Button, "bg-primary");

function App() {
  // Header
  const headerElement = Header();

  // Main
  const mainElement = Main();

  // default when open site - give name by user
  const loginForm = Loginform();
  const loginBtn = Button({
    className: "btn--login",
    innerText: "Play ►"
  });
  loginForm.append(loginBtn);
  mainElement.append(loginForm);

  // const meme = Meme("I've always won, and I'm going to continue to win. And that's the way it is.");
  // mainElement.append(meme);

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
    children: [headerElement, mainElement, footerElement],
  });

  return container;
}

export default App;
