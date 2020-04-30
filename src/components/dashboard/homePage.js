import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../configurations/axiosConfig";
import ShopCard from "../materialUI/shopCard";
import { Route, Switch, Link } from "react-router-dom";

// import HomePage from "../dashboard/homePage";
import ShopPage from "./shopPage";
import ProductPage from "./productPage";

import CreateShopForm from "../forms/createShop";
import CreateProductForm from '../forms/createProduct'

export default function HomePage() {
  const [userShops, setUserShops] = useState(false);

  const getReq = () => {
    if (!userShops) {
      axiosWithAuth()
        .get("/shops/logged/user")
        .then((res) => {
          setUserShops(res.data);
        })
        .catch((err) => {
          localStorage.removeItem("token");
          console.log(err);
        });
    }
  };

  useEffect(() => {
    getReq();
  });

  console.log(userShops);
  return (
    <div>
            <nav>
        <Link to="/">Home</Link>
        <Link to="/create_shop">Create store</Link>
        <form>
          <button onClick={() => localStorage.removeItem("token")}>
            logout
          </button>
        </form>{" "}
      </nav>
      <Switch>
        <Route exact path="/">
          {/* home <Link to="/create_shop">Create store</Link>{" "} */}
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {userShops &&
              userShops.map((shop) => {
                return <ShopCard shop={shop} />;
              })}
          </div>
        </Route>
        <Route path="/create_shop" component={CreateShopForm} />
        <Route  exact path="/shop/:id" component={ShopPage} />
        <Route path="/shop/:id/create_product" component={CreateProductForm} />
        <Route  path="/product/:id" component={ProductPage} />
      </Switch>
    </div>
  );
}
