import { createElement, styled } from "../utils/elements";
import "./Meme.css";

export default function Meme (quote) {
    const meme = createElement("div", {
        className: "meme",
        innerText: quote,
        children:
        [
            createElement("p", {
                className: "meme--author",
                innerText: "Donald Trump"
            })
        ]
    })

    return meme;
}