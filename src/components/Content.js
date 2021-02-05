import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import ImagePanel from "./ImagePanel";
import "../styles/Content.css";

function Content() {
  const [outlined, setOutlined] = useState(true);
  const [loadedImage, setLoadedImage] = useState(null);

  // On init give default image as image source
  useEffect(() => {
    const image = new Image();
    image.onload = () => {
      setLoadedImage(image);
    };
    image.src = process.env.PUBLIC_URL + "/default.png";
  }, []);

  return (
    <div className="content">
      {/* this component will set loaded image */}
      <Sidebar LoadImage={setLoadedImage}></Sidebar>

      {/* this component will use loaded image */}
      <ImagePanel LoadedImage={loadedImage} Outlined={outlined}></ImagePanel>
    </div>
  );
}

export default Content;
