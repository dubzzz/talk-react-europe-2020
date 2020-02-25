import React from "react";
import Divider from "./components/Divider";
import SocialNetwork from "./components/SocialNetwork";

import MeImage from "../images/me_photo.jpg";
import PigmentLogo from "../images/pigment.png";
import GitHubLogo from "../images/github-white.png";
import TwitterLogo from "../images/twitter.png";

export default function WhoAmI() {
  return (
    <div>
      <div>
        <img
          src={MeImage}
          alt="Me"
          style={{ borderRadius: "50%", height: 128 }}
        />
      </div>
      <h2>Nicolas DUBIEN</h2>
      <Divider />
      <img
        src={PigmentLogo}
        alt="Pigment Logo"
        style={{
          filter: "invert(1)",
          height: 64,
          border: "none",
          background: "none",
          margin: 0,
          boxShadow: "none",
        }}
      />
      <Divider />
      <SocialNetwork
        src={GitHubLogo}
        color="#ffffff"
        nickname="dubzzz"
      />
      <SocialNetwork
        src={TwitterLogo}
        color="#1da1f2"
        nickname="ndubien"
      />
    </div>
  );
}
