import "./Header.css";
import logoSrc from "../assets/meme_logo.png";
import Button from "./Button";
import { createElement } from "../utils/elements";

function Header() {
  const header = createElement("header", {
    className: "header",
    children: [
      createElement("a", {
        className: "header--link",
        href: "#",
        children: [
          createElement("img", {
            className: "logo--img",
            src: logoSrc,
            alt: "Restart App",
          }),
          createElement("h1", {
            className: "logo-titel",
            innerText: "Tronald Trump",
          }),
        ],
      }),
      Button({
        className: "Head-Disabled",
        innerText: "Leaderboard",
      }),
      Button({
        className: "Head",
        innerText: "Instructions",
      }),
    ],
  });

  return header;
}

export default Header;
