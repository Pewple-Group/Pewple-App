import React, { useRef, useState } from "react";
import { useParams } from "react-router";
import FileList from "../components/FileList";
import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
import db, { auth, storage } from "../firebase";
import "./FileManager.css";
function FileManager({ signOut, user }) {
  const { userId } = useParams();
  let hiddenInputFile = useRef("");
  const [fileUrl, setFileUrl] = useState([]);
  const [imageUrl, setImageUrl] = useState([]);
  const [videoUrl, setVideoUrl] = useState([]);
  const [persentUpload, setPercentUpload] = useState(0);
  const handleClick = (event) => {
    hiddenInputFile.current.click();
  };

  const onFileChange = async (e) => {
    e.preventDefault();

    const file = e.target.files[0];

    const storageRef = storage.ref();
    const fileRef = storageRef.child(file.name);
    const uploadFile = await fileRef.put(file);

    const fileLink = await fileRef.getDownloadURL();
    db.collection("users")
      .doc(auth.currentUser?.uid)
      .collection("FileManager")
      .add({
        file: fileLink,
        fileType: file.type,
        fileName: file.name,
      });
  };

  return (
    <div className="file-manager">
      <Sidebar signOut={signOut} user={user} />
      <div className="main-container">
        <NavBar title="File Manager" CurrentUser={user} />
        <div className="Filemanager-component">
          <div className="addFile">
            <button onClick={handleClick}>Add File</button>
            <input
              accept="image/*,video/*,.pdf,.doc,.docx,.exe,.rtf,.html,.js,.jsx,.c,.py,.css,.sass,.scss,.java"
              type="file"
              multiple={false}
              style={{ display: "none" }}
              ref={hiddenInputFile}
              onChange={(e) => {
                onFileChange(e);
              }}
            />
          </div>
          <FileList userId={userId.slice(1)} />
        </div>
      </div>
    </div>
  );
}

export default FileManager;
