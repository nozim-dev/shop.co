import axios from "axios";
import React, { useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useParams } from "react-router-dom";

const ShopItem = () => {
  const params = useParams();
  const [isLoad, setIsLoad] = useState(true);
  const [cartData, setCardData] = useState([]);

  const ApiKey = `https://harmonious-gift-7f42955e82.strapiapp.com/api/shops/${params.shopId}?populate=*`;

  useEffect(() => {
    setTimeout(() => {
      axios
        .get(ApiKey)
        .then((res) => {
          setCardData(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
      setIsLoad(false);
    }, 1000);
  }, []);

  return (
    <>
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
        <div>
            {cartData.productName}
        
        </div>
      )}
    </>
  );
};

export default ShopItem;
