import React, { useEffect, useState, useRef } from "react";
import "styles/ImagePanel.css";
import { rotate } from "scripts/imageRotation";

// ImagePanel is designed to work with ImageData Object as separated from other concerns

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
  Canvas: null,
  BackupData: null,
  Init: (canvasRef) => {
    util.Canvas = canvasRef;
    util.Clear();
  },
  ReDraw: (imageData) => {
    // imageData is an ImageData Object with three members; width, height, data
    if (imageData) {
      util.BackupData = imageData;
      util.Clear();
      util.Canvas.width = imageData.width;
      util.Canvas.height = imageData.height;
      const ctx = util.Canvas.getContext("2d");
      ctx.putImageData(imageData, 0, 0);
    }
    // Else: defensive - not expected to execute in normal run
  },
  Rotate: (angle, setRenderTime, setRotateAngle) => {
    // to prevent repetitive rotation over already rotated image
    // we will recall our originaly loaded image data on each request
    const ctx = util.Canvas.getContext("2d");
    let data;
    if (util.BackupData) {
      data = util.BackupData;
    } else {
      data = ctx.getImageData(0, 0, util.Canvas.width, util.Canvas.height);
    }

    const start = performance.now();
    let end = start;
    try {
      let result = rotate(data, angle);
      end = performance.now();
      util.Clear();
      util.Canvas.width = result.width;
      util.Canvas.height = result.height;
      // last two parameters are paddings (start point(x,y) of image), give them as 0
      ctx.putImageData(result, 0, 0);
      setRenderTime(parseFloat(end - start).toFixed(3));
      setRotateAngle(angle);
    } catch (err) {
      alert(err.message);
    }
  },
  Clear: () => {
    // clear canvas
    util.Canvas.getContext("2d").clearRect(
      0,
      0,
      util.Canvas.width,
      util.Canvas.height
    );
  },
  Recall: () => {
    // recall our originaly loaded file, render canvas
    if (util.BackupData) {
      util.ReDraw(util.BackupData);
    }
  },
};

function ImagePanel(props) {
  const [outlined, setOutlined] = useState(true);
  const [renderTime, setRenderTime] = useState(0);
  const [rotateAngle, setRotateAngle] = useState(0);
  // we have to use a ref, which is a reference to the actual canvas DOM element.
  const canvasRef = useRef(null);

  useEffect(() => {
    // Initialize Util.Canvas, this will be called only once
    util.Init(canvasRef.current);
  }, []);

  // keep an eye on outlined property for border style of our canvas
  useEffect(() => {
    setOutlined(props.outlined);
  }, [props.outlined]);

  // Re-draw our newly loaded image
  useEffect(() => {
    util.ReDraw(props.loadedImageData);
  }, [props.loadedImageData]);

  useEffect(() => {
    if (!props.rotated) {
      util.Rotate(props.rotateAngle, setRenderTime, setRotateAngle);
      props.setRotated(true);
    }
    // Else: angle received as invalid, do nothing
  }, [props]);

  return (
    <div className="imageContainer">
      <canvas
        id="myCanvas"
        ref={canvasRef}
        style={{ border: outlined ? "2px solid red" : "none" }}
      />
      <div id="renderTime">Rendered in: {renderTime} miliseconds</div>
      <div id="roateDegree">Rotated: {rotateAngle} degree</div>
    </div>
  );
}

export default ImagePanel;
