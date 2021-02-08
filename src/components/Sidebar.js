import React, { useState, useRef, useEffect } from "react";
import "styles/Sidebar.css";

// 5 MegaByte Limit
const FILE_SIZE_LIMIT_MB = 5 * 1024;

function Sidebar(props) {
  const [fileName, setFileName] = useState(props.defaultFile.name);
  const [width, setWidth] = useState(props.defaultFile.width);
  const [height, setHeight] = useState(props.defaultFile.height);
  const [angle, setAngle] = useState(0);
  // we have to use a ref, which is a reference to the actual canvas DOM element.
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // Initialize Canvas State, this will be called only once
    setCanvas(canvasRef.current);
  }, []);

  const triggerFileUpload = () => {
    // reset previous file value to enable loading same file again and again
    document.getElementById("imageLoader").value = null;

    // trigger input file to open file browser
    document.getElementById("imageLoader").click();
  };

  const tryToLoadImage = (raw) => {
    // Safety Checks on File Load

    // apparently not all browsers yet supports FileReader
    if (!window.FileReader) {
      alert("This browser does not support FileReader.");
      return;
    }

    if (!raw && raw.target.files.length === 0) {
      // no file is selected, do nothing
      console.log("no file is selected, do nothing");
      return;
    }

    let file = raw.target.files[0];

    if (!file.type.match("image.*")) {
      alert("Only images are supported!");
      return;
    }

    if (file.size / 1024 > FILE_SIZE_LIMIT_MB) {
      alert("Maximum allowed size: " + FILE_SIZE_LIMIT_MB / 1024 + " MB");
      return;
    }

    // then we have a valid image, load it!
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (evt) {
      if (evt.target.readyState === FileReader.DONE) {
        load(evt.target.result);
        setFileName(file.name);
      }
    };
  };

  // to load given file source as image
  const load = (source) => {
    if (source) {
      let img = new Image();
      img.src = source;
      img.onload = function () {
        // rearrange canvas size according to loaded image
        canvas.width = img.width;
        canvas.height = img.height;

        // send loaded image's data file to upper component
        canvas.getContext("2d").drawImage(img, 0, 0);
        const imageData = canvas
          .getContext("2d")
          .getImageData(0, 0, canvas.width, canvas.height);
        props.loadImageData(imageData);

        // set data for file information area
        setWidth(img.width);
        setHeight(img.height);
      };
    }
    // Else: invalid source, do nothing
  };

  const btnApplyOnClick = () => {
    props.tryRotate(angle);
  };

  // set default image on initialization
  if (!initialized && canvas) {
    load(process.env.PUBLIC_URL + "/default.png");
    setInitialized(true);
  }

  return (
    <div className="sidebar">
      <div className="sideBarSectionTop">
        <input
          id="uploadImageButton"
          className="btn btn-blue btn-large"
          type="button"
          value="Upload Image"
          onClick={triggerFileUpload}
        />
        <input
          id="imageLoader"
          type="file"
          accept="image/*"
          onChange={tryToLoadImage}
          hidden
        />
        <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
      </div>

      <div className="horizontalBreak"></div>

      <div className="sideBarSectionMiddle">
        <div>
          <span>
            <b>File: </b>
          </span>
          <span>{fileName}</span>
        </div>
        <div>
          <span>
            <b>Width:</b>
          </span>
          <span>{width}</span>
        </div>
        <div>
          <span>
            <b>Height:</b>
          </span>
          <span>{height}</span>
        </div>
        <div>
          <span>
            <b>Rotate:</b>
          </span>
          <span>
            <input
              id="inputAngle"
              type="text"
              maxLength="4"
              size="2"
              onChange={(e) => setAngle(e.target.value)}
            />
            <input
              type="button"
              className="btn btn-blue btn-small"
              value="Apply"
              onClick={btnApplyOnClick}
            />
          </span>
        </div>
        <div className="hoverPointer">
          {/* htmlFor instead of for thanks to React! */}
          <label htmlFor="outlineCheckbox">Outlined</label>
          <input
            type="checkbox"
            id="outlineCheckbox"
            checked={props.outlined}
            onChange={(e) => props.setOutlined(e.target.checked)}
          />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
