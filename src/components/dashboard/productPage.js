import React, { useState } from "react";
import { axiosWithoutAuth } from "../configurations/axiosConfig";
import ProductCard from "../materialUI/productCard";

export default function ProductPage(props) {
  const [productData, setProductData] = useState(false);
  const id = props.match.params.id;

  if (!productData) {
    axiosWithoutAuth()
      .get(`/shops/products/${id}`)
      .then((res) => {
        setProductData(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      {/* <a href={`/shop/${productData.id}/create_product`}>Create Product</a> */}
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {/* {productData &&
          productData.products.map((product) => {
            return <ProductCard product={product} />;
          })} */}
      </div>
    </div>
  );
}
