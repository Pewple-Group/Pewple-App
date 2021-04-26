import React from "react";
import FileList from "../components/FileList";
import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
import "./FileManager.css";
function FileManager() {
  return (
    <div className="file-manager">
      <Sidebar />
      <div className="main-container">
        <NavBar title="File Manager" />
        <div className="Filemanager-component">
          <div className="addFile">
            <button>Add File</button>
          </div>
          <FileList />
        </div>
      </div>
    </div>
  );
}

export default FileManager;
