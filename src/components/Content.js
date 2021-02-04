import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Image from "./Image";

import "../style/Content.css";

function Content() {
  const [outlined, setOutlined] = useState(true);

  return (
    <div className="content">
      <Sidebar></Sidebar>
      <Image Outlined={outlined}></Image>
    </div>
  );
}

export default Content;
