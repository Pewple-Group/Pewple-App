import React from "react";
import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
import "./FileManager.css";
function FileManager() {
  return (
    <div className="file-manager">
      <Sidebar />
      <div className="main-container">
        <NavBar />
      </div>
    </div>
  );
}

export default FileManager;
