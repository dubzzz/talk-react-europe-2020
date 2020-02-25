import React from "react";

import NavigationHellVideo from "../images/navigation-hell.gif";

export default function NavigationHell() {
  const [id, setId] = React.useState(0);
  return (
    <img
      key={id}
      alt="Navigation hell"
      src={NavigationHellVideo}
      // Hack to force the gif to restart
      onClick={() => setId(i => ++i)}
    />
  );
}
