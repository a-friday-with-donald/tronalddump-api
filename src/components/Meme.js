import { createElement, styled } from "../utils/elements";
import "./Meme.css";

export default function Meme(quote, tag) {
  const meme = createElement("div", {
    children: [
      createElement("div", {
        innerText: quote,
        className: "meme",
      }),
      createElement("p", {
        className: "meme--author",
        innerText: tag,
      }),
    ],
  });

  return meme;
}
