import React, { useEffect, useState } from "react";
import axios from "axios";
import ShopCart from "./ShopCart";

const Shop = () => {
  const [ItemsData, setItemsData] = useState([]);
  const ApiKey = "http://localhost:1337/api/shops?populate=*";

  useEffect(() => {
    axios
      .get(ApiKey)
      .then((res) => {
        setItemsData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(ItemsData);

  return (
    <div className="shop">
      {ItemsData.map((item) => (
        <ShopCart data={item} key={item.id} />
      ))}
    </div>
  );
};

export default Shop;
