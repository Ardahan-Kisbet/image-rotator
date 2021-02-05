import React from "react";
import "../styles/Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar h-100">
      <div className="sideBarSectionTop">
        <input
          id="uploadImageButton"
          className="button button-blue"
          type="button"
          value="Upload Image"
        />
      </div>

      <div className="horizontalBreak"></div>

      <div className="sideBarSectionMiddle">
        <span>
          <strong>File:</strong>
        </span>
        <span>kitten.jpg</span>
      </div>
    </div>
  );
}

export default Sidebar;
