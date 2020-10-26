import "./header.css";
import logoSrc from "../assets/tronald-dump-logo-01.svg";
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
            innerText: "Tronald Dump",
          }),
        ],
      }),
      createElement("div", {
        className: "head-button-container",
        children: [
          Button({
            className: "btn btn--Head-Disabled",
            innerText: "Leaderboard",
          }),
          Button({
            className: "btn btn--Head",
            innerText: "Instructions",
            onclick: () => {
              document
                .querySelector(".modalContainer")
                .classList.toggle("hidden");
            },
          }),
        ],
      }),
    ],
  });

  return header;
}

export default Header;
