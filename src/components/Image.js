import React, { useEffect, useState, useRef } from "react";
import "../style/Image.css";

function Image(props) {
  const [outlined, setOutlined] = useState(true);
  // we have to use a ref, which is a reference to the actual canvas DOM element.
  const canvasRef = useRef(null);

  // keep an eye on outlined property for border style of our canvas
  useEffect(() => {
    setOutlined(props.Outlined);
  }, [props.Outlined]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // let img = document.getElementById("default");
    // ctx.drawImage(img, 10, 10);

    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.rect(5, 5, 30, 30);
    ctx.fill();
  });

  return (
    <div className="imageContainer">
      <canvas
        id="myCanvas"
        ref={canvasRef}
        style={{ border: outlined ? "2px solid red" : "none" }}
      />
      <div id="renderTime">Render Time: HH:MM:SS</div>
    </div>
  );
}

export default Image;
