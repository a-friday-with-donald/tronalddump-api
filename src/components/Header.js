import "./Header.css";
import logoSrc from "../assets/meme_logo.png";
import { createElement } from "../utils/elements";

function Header() {
  const logoIcon = createElement("img", {
    src: logoSrc,
    alt: "Logo",
  });

  const appName = createElement("h1", {
    innerHTML: "<b>MEME</b>GENERATOR",
  });

  const logoLink = createElement("a", {
    href: "null",
    className: "logoContainer",
    children: [logoIcon, appName],
  });

  const linkLeaderBoard = createElement("a", {
    href: "null",
    innerText: "leaderboards",
  });

  const linkSignInUp = createElement("a", {
    href: "null",
    innerText: "sign in / sign up",
  });

  const navLinkContainer = createElement("div", {
    children: [linkLeaderBoard, linkSignInUp],
  });

  const nav = createElement("nav", {
    children: [logoLink, navLinkContainer],
  });

  const header = createElement("header", {
    className: "header",
    children: [nav],
  });

  return header;
}

export default Header;
