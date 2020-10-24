import "./Header.css";
import logoSrc from "../assets/meme_logo.png";
import Button from "./Button";
import { createElement } from "../utils/elements";
import Modal from "./Modal";

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
      createElement("div", {
        className: "modalContainer",
        children: [
          Button({
            className: "btn-close",
            innerText: "X",
            onclick: () => {
              document
                .querySelector(".modalContainer")
                .classList.toggle("hidden");
            },
          }),
          createElement("h2", {
            className: "modal-head",
            innerText: "Game instructions",
          }),
          Modal(),
        ],
      }),
      Button({
        className: "btn btn--Head-Disabled",
        innerText: "Leaderboard",
      }),
      Button({
        className: "btn btn--Head",
        innerText: "Instructions",
        onclick: () => {
          document.querySelector(".modalContainer").classList.toggle("hidden");
        },
      }),
    ],
  });

  return header;
}

export default Header;
