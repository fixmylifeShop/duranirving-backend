import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../configurations/axiosConfig";
import ShopCard from "../materialUI/shopCard";
export default function HomePage() {
  const [userShops, setUserShops] = useState(false);

  const getReq = () => {
    if (!userShops) {
      axiosWithAuth()
        .get("/shops/logged/user")
        .then((res) => {
          setUserShops(res.data);
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    getReq();
  });

  console.log(userShops);
  return (
    <div>
      home
      <form>
        <button onClick={() => localStorage.removeItem("token")}>logout</button>
      </form>
      {userShops &&
        userShops.map((shop) => {
          return <ShopCard shop={shop} />;
        })}
    </div>
  );
}
