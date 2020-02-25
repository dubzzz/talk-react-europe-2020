import React from "react";

export default function SocialNetwork({
  src,
  color,
  nickname,
}) {
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
