import React from "react";
import "../Home/style.scss";
import { Link } from "react-router-dom";
import ErrorImage from "./images/error-image-photo-icon.webp";

const ShopCart = ({ data }) => {

  return (
    <Link to={`${data.documentId}`} className="CartItems_row_col">
      <div className="CartItems_row_col_img">
        <img
          alt="product"
          src={data?.imgUrl?.url ? `${data.imgUrl.url}` : ErrorImage}
        />
      </div>
      <h3>{data.productName}</h3>
      <div className="CartItems_row_col_rates">
        <div className="CartItems_row_col_rates_stars">
          <div className="CartItems_row_col_rates_stars_item">
            <svg
              width="19"
              height="17"
              viewBox="0 0 19 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.24494 0.255005L11.8641 5.89491L18.0374 6.6431L13.4829 10.8769L14.679 16.9793L9.24494 13.956L3.8109 16.9793L5.00697 10.8769L0.452479 6.6431L6.62573 5.89491L9.24494 0.255005Z"
                fill="#FFC633"
              />
            </svg>
          </div>
          <div className="CartItems_row_col_rates_stars_item">
            <svg
              width="19"
              height="17"
              viewBox="0 0 19 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.24494 0.255005L11.8641 5.89491L18.0374 6.6431L13.4829 10.8769L14.679 16.9793L9.24494 13.956L3.8109 16.9793L5.00697 10.8769L0.452479 6.6431L6.62573 5.89491L9.24494 0.255005Z"
                fill="#FFC633"
              />
            </svg>
          </div>
          <div className="CartItems_row_col_rates_stars_item">
            <svg
              width="19"
              height="17"
              viewBox="0 0 19 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.24494 0.255005L11.8641 5.89491L18.0374 6.6431L13.4829 10.8769L14.679 16.9793L9.24494 13.956L3.8109 16.9793L5.00697 10.8769L0.452479 6.6431L6.62573 5.89491L9.24494 0.255005Z"
                fill="#FFC633"
              />
            </svg>
          </div>
          <div className="CartItems_row_col_rates_stars_item">
            <svg
              width="19"
              height="17"
              viewBox="0 0 19 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.24494 0.255005L11.8641 5.89491L18.0374 6.6431L13.4829 10.8769L14.679 16.9793L9.24494 13.956L3.8109 16.9793L5.00697 10.8769L0.452479 6.6431L6.62573 5.89491L9.24494 0.255005Z"
                fill="#FFC633"
              />
            </svg>
          </div>
          <div className="CartItems_row_col_rates_stars_item">
            <svg
              width="19"
              height="17"
              viewBox="0 0 19 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.24494 0.255005L11.8641 5.89491L18.0374 6.6431L13.4829 10.8769L14.679 16.9793L9.24494 13.956L3.8109 16.9793L5.00697 10.8769L0.452479 6.6431L6.62573 5.89491L9.24494 0.255005Z"
                fill="#FFC633"
              />
            </svg>
          </div>
        </div>
        <div className="CartItems_row_col_rates_count">
          {data.rateNumber}/<span>5</span>
        </div>
      </div>
      <div className="ProductDetail_cartDetail_title_prices">
        <h2>${data.cost}</h2>
        {data?.oldPrice ? <h4>${data.oldPrice}</h4> : ""}
        {data?.discount ? <h5>-{data.discount}%</h5> : ""}
      </div>
    </Link>
  );
};

export default ShopCart;
