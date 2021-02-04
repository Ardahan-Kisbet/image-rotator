import React, { useEffect, useState } from "react";
import "../style/Image.css";

function Image(props) {
  const [outlined, setOutlined] = useState(true);

  useEffect(() => {
    setOutlined(props.Outlined);
  }, [props.Outlined]);

  return (
    <div className="imageContainer">
      <img
        src="favicon.png"
        alt=""
        style={{ border: outlined ? "2px solid red" : "none" }}
      />
      <div id="renderTime">Render Time: HH:MM:SS</div>
    </div>
  );
}

export default Image;
