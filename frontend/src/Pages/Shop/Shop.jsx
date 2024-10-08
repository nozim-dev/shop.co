import React, { useEffect, useState } from "react";
import axios from "axios";
import ShopCart from "./ShopCart";
import { RotatingLines } from "react-loader-spinner";

const Shop = () => {
  const [ItemsData, setItemsData] = useState([]);
  const [isLoad, setIsLoad] = useState(true);
  const ApiKey =
    "https://harmonious-gift-7f42955e82.strapiapp.com/api/shops?populate=*";

  useEffect(() => {
    setTimeout(() => {
      axios
        .get(ApiKey)
        .then((res) => {
          setItemsData(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
      setIsLoad(false);
    }, 1000);
  }, []);

  return (
    <div className="shop_row">
      {isLoad ? (
        <div className="loader">
          <RotatingLines
            visible={true}
            height="32"
            width="32"
            strokeWidth="5"
            strokeColor="gray"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
          />
        </div>
      ) : (
        ItemsData.map((item) => <ShopCart data={item} key={item.id} />)
      )}
    </div>
  );
};

export default Shop;
