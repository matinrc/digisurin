"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
export default function page({ prid }) {
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    var formdata = new FormData();

    formdata.append("image", image);
    formdata.append("prid", prid);
    try {
      const response = await axios.post("/api/uploadawsimage", formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {prid}
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      <button onClick={handleSubmit}>Upload</button>
    </div>
  );
}
