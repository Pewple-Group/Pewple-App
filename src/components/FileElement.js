import React from "react";
import "./FileElement.css";
import PdfIcon from "../assets/pdf.svg";
import MoreIcon from "../assets/more.svg";
import { Dropdown } from "semantic-ui-react";
import PictureIcon from "../assets/picture.svg";
import DocumentIcon from "../assets/documents.svg";
import VideoIcon from "../assets/video.svg";
import ProgramIcon from "../assets/coding.svg";
import ExeIcon from "../assets/exe.svg";
import UnknownIcon from "../assets/question-mark.svg";
import { useHistory } from "react-router";
function FileElement({ fileUrl, fileName, fileType, fileId, deleteFile }) {
  const history = useHistory();
  const fileOption = [
    {
      text: "Download",
      value: "Download",
    },
    {
      text: "Delete",
      value: "Delete",
    },
  ];

  return (
    <div className="FileElement">
      <div className="dropdown">
        <img className="dropbtn" src={MoreIcon} alt="" />
        <div class="dropdown-content">
          <a href={fileUrl} target="_blank">
            Open
          </a>

          <a onClick={() => deleteFile(fileId, fileName)}>Delete</a>
        </div>
      </div>
      <div className="File_Img">
        <img
          src={
            fileType === "application/pdf"
              ? PdfIcon
              : ["image/png", "image/jpeg", "image/svg", "image/gif"].includes(
                  fileType
                )
              ? PictureIcon
              : [
                  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                  "application/msword",
                ].includes(fileType)
              ? DocumentIcon
              : ["video/mp4", "video/webm"].includes(fileType)
              ? VideoIcon
              : [
                  "text/x-java",
                  "text/x-csrc",
                  "text/javascript",
                  "text/scss",
                  "text/sass",
                  "text/css",
                  "text/html",
                ].includes(fileType)
              ? ProgramIcon
              : fileType === "application/x-ms-dos-executable"
              ? ExeIcon
              : UnknownIcon
          }
          alt=""
        />
      </div>
      <div className="File_name">
        <p>{fileName}</p>
      </div>
    </div>
  );
}

export default FileElement;
