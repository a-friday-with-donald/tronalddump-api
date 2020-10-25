import { createElement, styled } from "../utils/elements";
import "./Login.css";

export default function Loginform (btn) {
    const form = createElement("form",{
        className: "login",
        children: 
        [
            createElement("input", {
                className: "login-input",
                type: "text",
                id: "input",
                name: "input",
                placeholder: "Enter your name"
            }),
            btn
        ]
    })

    return form;
}