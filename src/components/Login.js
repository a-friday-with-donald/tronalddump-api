import { createElement, styled } from "../utils/elements";
import Button from "./Button";
import "./Login.css";

export default function Loginform({ onsubmit }) {
  const input = createElement("input", {
    className: "login-input",
    type: "text",
    id: "input",
    required: true,
    placeholder: "Enter your name",
  });

  const submitBtn = createElement("button", {
    type: "submit",
    className: "btn btn--login",
    innerText: "Play ►",
  });

  const form = createElement("form", {
    className: "login",
    onsubmit: (event) => {
      event.preventDefault();
      onsubmit(input.value);
    },
    children: [input, submitBtn],
  });

  return form;
}
