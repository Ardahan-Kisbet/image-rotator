import React, { useEffect, useState, useRef } from "react";
import "../styles/ImagePanel.css";

// context.getImageData returns ImageData which is one-dimensional array
// containing raw pixel data with RGBA format
// ImageData
//  .width
//  .height
//  .data : Uint8ClampedArray --> each pixel is represented by four one-byte values in RGBA format
//                                data goes left to right then downward throughtout the array
// https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas

// to read ImageData
//    var myImageData = ctx.getImageData(left, top, width, height);

// to write ImageData
//    ctx.putImageData(myImageData, dx, dy);

// to loop
//    (var i = 0; i < data.length; i += 4)

const util = {
  Instance: null,
  Init: (canvasRef) => {
    util.Instance = canvasRef;
    util.Clear();
  },
  ReDraw: (loadedImage) => {
    util.Clear();
    if (loadedImage) {
      const ctx = util.Instance.getContext("2d");
      ctx.drawImage(
        loadedImage,
        0,
        0,
        util.Instance.width,
        util.Instance.height
      );

      // trying some changes over image data
      // for test purposes
      let tempImageData = ctx.getImageData(
        0,
        0,
        util.Instance.width,
        util.Instance.height
      );
      let data = tempImageData.data;
      for (var i = 0; i < data.length; i += 4) {
        data[i] = 255 - data[i]; // red
        data[i + 1] = 255 - data[i + 1]; // green
        data[i + 2] = 255 - data[i + 2]; // blue
      }
      ctx.putImageData(tempImageData, 0, 0);
      console.log(
        ctx.getImageData(0, 0, util.Instance.width, util.Instance.height)
      );
    }
    // Else: defensive - something went wrong
  },
  Clear: () => {
    // clear canvas
    util.Instance.getContext("2d").clearRect(
      0,
      0,
      util.Instance.width,
      util.Instance.height
    );
  },
  Rotate: () => {},
};

function ImagePanel(props) {
  const [outlined, setOutlined] = useState(true);
  // we have to use a ref, which is a reference to the actual canvas DOM element.
  const canvasRef = useRef(null);

  // keep an eye on outlined property for border style of our canvas
  useEffect(() => {
    setOutlined(props.Outlined);
  }, [props.Outlined]);

  useEffect(() => {
    // Initialize Canvas Util Instance, this will be called only once
    util.Init(canvasRef.current);
  }, []);

  useEffect(() => {
    // Re-draw our newly loaded image
    util.ReDraw(props.LoadedImage);
  }, [props.LoadedImage]);

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

export default ImagePanel;
