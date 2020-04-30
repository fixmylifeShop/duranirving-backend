import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../configurations/axiosConfig";

export default function CreateShopForm(props) {
  const [shopInfo, setShopInfo] = useState(false);
  const [file, setFile] = useState(false);

  const handleChange = (e) => {
    setShopInfo({
      ...shopInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    if (file) {
      data.append("file", file);
    }
    data.append("store_url", shopInfo.store_url);
    // data.append("user_id", 3);
    data.append("store_name", shopInfo.store_name);

    axiosWithAuth()
      .post("/shops/", data)
      .then((res) => {
        console.log(res.data);
        props.history.push(`shops/${res.data.id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFile = (e) => {
    e.preventDefault();
    const image = e.target.files[0];
    setFile(image);
    if (image) {
      const fileType = image["type"];
      const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
      if (validImageTypes.includes(fileType)) {
        // setError("");
        setFile(image);
        console.log(file);
      } else {
        console.log("error");
        // setError("error please upload a image file");
      }
    }
  };
  console.log(shopInfo);
  return (
    <div>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit}
      >
        <input
          name="store_name"
          placeholder="Name of Shop"
          onChange={handleChange}
        />
        <input
          name="store_url"
          placeholder="Shop url"
          onChange={handleChange}
        />
        <input type="file" onChange={handleFile} />
        <button>Submit</button>
      </form>
    </div>
  );
}
