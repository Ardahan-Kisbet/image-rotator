import React, { useState } from "react";
import Sidebar from "./Sidebar";
import ImagePanel from "./ImagePanel";
import "../styles/Content.css";

const defaultFileInfo = { name: "default.png", width: 440, height: 250 };

function Content() {
  const [outlined, setOutlined] = useState(true);
  const [loadedImageData, setLoadedImageData] = useState(null);
  const [rotateAngle, setRotateAngle] = useState(null);
  const [rotated, setRotated] = useState(true);

  // callback for rotate angle setting
  const tryRotate = (angle) => {
    let parsed = parseInt(angle);
    if (!isNaN(parsed) && Number.isInteger(parsed)) {
      setRotateAngle(parsed);
      // reset rotated status so that image panel can handle rotation even if same angle is given
      // so if we are not allowed to rotate over same angle then remove [rotated] state usage completely
      setRotated(false);
    } else {
      alert("Given angle is not a valid number!");
    }
  };

  return (
    <div className="content">
      {/* this component will set loaded image */}
      <Sidebar
        loadImageData={setLoadedImageData}
        defaultFile={defaultFileInfo}
        tryRotate={tryRotate}
        setOutlined={setOutlined}
        outlined={outlined}
      ></Sidebar>

      {/* this component will use loaded image */}
      <ImagePanel
        loadedImageData={loadedImageData}
        outlined={outlined}
        rotateAngle={rotateAngle}
        rotated={rotated}
        setRotated={setRotated}
      ></ImagePanel>
    </div>
  );
}

export default Content;
