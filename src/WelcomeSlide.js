import React from "react";
import Divider from "./components/Divider";

import ReactEuropeLogo from "../images/react-europe.webp";

export default function WelcomeSlide() {
  return (
    <div>
      <div>
        <img
          src={ReactEuropeLogo}
          alt="React-Europe"
          style={{ height: 128, filter: "invert(1)" }}
        />
      </div>
      <Divider />
      <h1>Detecting the unexpected in Web UI</h1>
      <h2>Nicolas DUBIEN</h2>
    </div>
  );
}
