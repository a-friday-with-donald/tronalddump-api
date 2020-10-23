import "./app.css";
import Button from "./components/Button";
import Header from "./components/Header";
import Main from "./components/main";
import { createElement, styled } from "./utils/elements";

const PrimaryButton = styled(Button, "bg-primary");

function App() {
  const header = Header();

  const mainElement = Main();

  const container = createElement("div", {
    className: "container",
    children: [header, mainElement],
  });
  return container;
}

export default App;
