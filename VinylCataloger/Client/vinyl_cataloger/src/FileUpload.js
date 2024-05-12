import React from "react";
import { useState } from "react";
import axios from "axios";

export default function FileUpload() {
  const [file, setFile] = useState();
  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };
  const handleUpload = () => {
    const formdata = new FormData();
    formdata.append("image", file);
    axios
      .post("http://localhost:8081/upload", formdata)
      .then((res) => {
        if (res.data.Status === "Success") {
          console.log("Succeded");
        } else {
          console.log("Failed");
        }
      })
      .catch((err) => console.log(err));
  };
}
