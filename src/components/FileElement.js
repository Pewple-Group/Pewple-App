import React from "react";
import "./FileElement.css";
import PdfIcon from "../assets/pdf.svg";
import MoreIcon from "../assets/more.svg";
import { Dropdown } from "semantic-ui-react";
function FileElement() {
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
      <div className="threedot">
        <Dropdown
          className="threedot_dropdown"
          trigger={<img src={MoreIcon} alt="" />}
          options={fileOption}
          simple
          floating
          item
        />
      </div>
      <div className="File_Img">
        <img src={PdfIcon} alt="" />
      </div>
      <div className="File_name">
        <p>ProductDetails.pdf</p>
      </div>
    </div>
  );
}

export default FileElement;
