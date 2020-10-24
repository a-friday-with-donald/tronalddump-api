import { createElement } from "../utils/elements";
import "./Modal.css";

export default function Modal () {
    const modal = createElement("div",{
        className: "modal-content",
        children:
        [
            
            createElement("ol",{
                className: "modal--list",
                children:
                [
                    createElement("li",{
                        innerText: "Choose a name."
                    }),
                    createElement("li",{
                        innerText: "We give you quote of Donald Trump randomly."
                    }),
                    createElement("li",{
                        innerText: "Choose who or what is he talking about."
                    }),
                    createElement("li",{
                        innerText: "Donald Trump tells you if you are right or wrong."
                    }),
                    createElement("li",{
                        innerText: "If you are right, you got one point."
                    }),
                    createElement("li",{
                        innerText: "If you are wrong, you loose everything."
                    }),
                    createElement("li",{
                        innerText: "And sometimes there is no right or wrong."
                    }),
                ]
            })
        ]
    })
    return modal
}