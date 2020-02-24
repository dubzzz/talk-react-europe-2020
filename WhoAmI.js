import React from "react";
import MeImage from "./images/me_photo.jpg";
import PigmentLogo from "./images/pigment.png";
import GitHubLogo from "./images/github-white.png";
import TwitterLogo from "./images/twitter.png";

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
      <div>
        <h2>Nicolas DUBIEN</h2>
        <div style={{ marginTop: 48 }}></div>
        <div>
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
        </div>
        <div style={{ marginTop: 48 }}></div>
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
    </div>
  );
}

function SocialNetwork({ src, color, nickname }) {
  return (
    <div
      style={{
        color: color,
        display: "flex",
        flexDirection: "row",
        alignItems: "baseline",
      }}
    >
      <div
        style={{
          display: "flex",
          height: "48px",
          width: "48px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={src}
          alt="Logo"
          style={{
            height: 32,
            border: "none",
            background: "none",
            margin: 0,
          }}
        />
      </div>
      <div style={{ marginLeft: "8px" }}>{nickname}</div>
    </div>
  );
}
