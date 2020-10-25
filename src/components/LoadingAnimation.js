import "./loadingAnimation.css";
import { createElement } from "../utils/elements";

function LoadingAnimation() {
  return createElement("div", {
    id: "loader",
  });
}

export default LoadingAnimation;
