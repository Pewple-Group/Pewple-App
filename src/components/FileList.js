import React, { useEffect, useState } from "react";
import db, { auth, storage } from "../firebase";
import FileElement from "./FileElement";
import "./FileList.css";
function FileList({ userId }) {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const getFiles = async () => {
      const files = await db
        .collection("users")
        .doc(userId)
        .collection("FileManager")
        .onSnapshot((snapshot) => {
          setFiles(snapshot.docs);
        });
    };
    getFiles();
  }, []);

  const deleteFile = (fileId, fileName) => {
    db.collection("users")
      .doc(userId)
      .collection("FileManager")
      .doc(fileId)
      .delete();
  };

  return (
    <div className="Filelist">
      {files.map((file) => (
        <FileElement
          fileName={file.data().fileName}
          fileType={file.data().fileType}
          fileUrl={file.data().file}
          fileId={file.id}
          deleteFile={deleteFile}
        />
      ))}
    </div>
  );
}

export default FileList;
