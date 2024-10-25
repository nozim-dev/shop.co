import axios from "axios";
import React, { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import { RotatingLines } from "react-loader-spinner";
import DefaultImage from "../Shop/images/error-image-photo-icon.webp";
const Cart = () => {
  const API_KEY = process.env.REACT_APP_BACKEND;
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState(false);
  const [subTotal, setSubTotal] = useState(0);
  const [discountCost, setDiscountCost] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [OldPriceCost, setOldPriceCost] = useState(0);
  const [resultCost, setResultCost] = useState(0);

  const updateQuantity = (id, increment) => {
    setCartData((prevCartData) =>
      prevCartData.map((item) => {
        if (item.documentId === id) {
          const updatedQuantityCount = item.quantity + (increment ? 1 : -1);
          return updatedQuantityCount <= 0
            ? item
            : { ...item, quantity: updatedQuantityCount };
        }
        return item;
      })
    );

    const item = cartData.find((cartItem) => cartItem.documentId === id);
    if (item) {
      const updatedQuantityCount = item.quantity + (increment ? 1 : -1);
      fetch(`${API_KEY}/api/carts/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          data: { quantity: updatedQuantityCount },
        }),
      });
    }
  };

  function SubtotalFunc() {
    let sum = 0;
    let discCost = 0;
    let disc = [];
    let resultDisc = 0;
    let oldPriceCost = 0;

    cartData.map((cart) => {
      sum += cart.costProduct * cart.quantity;
      discCost += cart.oldPrice
        ? cart.oldPrice * cart.quantity - cart.costProduct * cart.quantity
        : 0;
      disc.push(cart.discount);
      oldPriceCost += cart.oldPrice
        ? cart.oldPrice * cart.quantity
        : cart.costProduct * cart.quantity;

      setDiscountCost(discCost);
      setOldPriceCost(oldPriceCost);
    });
    resultDisc =
      disc.length >= 2 ? disc.reduce((a, b) => (a + b) / 2) : disc[0];

    //  foizlardan foiz chiqarilgan o'rtacha // setDiscount(resultDisc);

    setDiscount(Math.round(discountCost / (OldPriceCost / 100)));

    setResultCost(subTotal + 15);

    setSubTotal(sum);
  }

  async function fetchData() {
    try {
      const resData = await axios.get(`${API_KEY}/api/carts`);
      setCartData(resData.data.data);
    } catch {
      setError(error);
      setLoading(false);
    }
    setLoading(false);
  }

  const DeleteCart = async (id) => {
    try {
      await fetch(`${API_KEY}/api/carts/${id}`, {
        method: "DELETE",
      });
      fetchData();

      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 3000);
    } catch (error) {
      console.log("Fetch error:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (cartData.length) {
      SubtotalFunc();
    } else {
      setSubTotal(0);
      setDiscountCost(0);
      setDiscount(0);
      setOldPriceCost(0);
      setResultCost(0);
    }
  }, [cartData, subTotal, discountCost, discount, OldPriceCost, resultCost]);

  if (loading) {
    return (
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
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="Cart">
      {alert ? (
        <div className="alert">
          <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
            Mahsulot savatchangizdan o'chirildi!
          </Alert>
        </div>
      ) : (
        ""
      )}
      <h1>Your cart</h1>
      <div className="Cart_main">
        <div className="Cart_main_row">
          {cartData.map((item, id) => (
            <div key={id} className="Cart_main_row_col">
              <div className="Cart_main_row_col_img">
                <img
                  src={
                    item?.productUrl ? `${item?.productUrl}` : { DefaultImage }
                  }
                  alt=""
                />
              </div>
              <div className="Cart_main_row_col_text">
                <div className="Cart_main_row_col_text_title">
                  <div className="Cart_main_row_col_text_title_item">
                    <h1>{item?.productName}</h1>
                    <h3>
                      Size: <span>Large</span>
                    </h3>
                    <h3>
                      Color: <span>White</span>
                    </h3>
                  </div>
                  <span onClick={() => DeleteCart(item.documentId)}>
                    <svg
                      width="18"
                      height="20"
                      viewBox="0 0 18 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17.25 3.5H13.5V2.75C13.5 2.15326 13.2629 1.58097 12.841 1.15901C12.419 0.737053 11.8467 0.5 11.25 0.5H6.75C6.15326 0.5 5.58097 0.737053 5.15901 1.15901C4.73705 1.58097 4.5 2.15326 4.5 2.75V3.5H0.75C0.551088 3.5 0.360322 3.57902 0.21967 3.71967C0.0790178 3.86032 0 4.05109 0 4.25C0 4.44891 0.0790178 4.63968 0.21967 4.78033C0.360322 4.92098 0.551088 5 0.75 5H1.5V18.5C1.5 18.8978 1.65804 19.2794 1.93934 19.5607C2.22064 19.842 2.60218 20 3 20H15C15.3978 20 15.7794 19.842 16.0607 19.5607C16.342 19.2794 16.5 18.8978 16.5 18.5V5H17.25C17.4489 5 17.6397 4.92098 17.7803 4.78033C17.921 4.63968 18 4.44891 18 4.25C18 4.05109 17.921 3.86032 17.7803 3.71967C17.6397 3.57902 17.4489 3.5 17.25 3.5ZM7.5 14.75C7.5 14.9489 7.42098 15.1397 7.28033 15.2803C7.13968 15.421 6.94891 15.5 6.75 15.5C6.55109 15.5 6.36032 15.421 6.21967 15.2803C6.07902 15.1397 6 14.9489 6 14.75V8.75C6 8.55109 6.07902 8.36032 6.21967 8.21967C6.36032 8.07902 6.55109 8 6.75 8C6.94891 8 7.13968 8.07902 7.28033 8.21967C7.42098 8.36032 7.5 8.55109 7.5 8.75V14.75ZM12 14.75C12 14.9489 11.921 15.1397 11.7803 15.2803C11.6397 15.421 11.4489 15.5 11.25 15.5C11.0511 15.5 10.8603 15.421 10.7197 15.2803C10.579 15.1397 10.5 14.9489 10.5 14.75V8.75C10.5 8.55109 10.579 8.36032 10.7197 8.21967C10.8603 8.07902 11.0511 8 11.25 8C11.4489 8 11.6397 8.07902 11.7803 8.21967C11.921 8.36032 12 8.55109 12 8.75V14.75ZM12 3.5H6V2.75C6 2.55109 6.07902 2.36032 6.21967 2.21967C6.36032 2.07902 6.55109 2 6.75 2H11.25C11.4489 2 11.6397 2.07902 11.7803 2.21967C11.921 2.36032 12 2.55109 12 2.75V3.5Z"
                        fill="#FF3333"
                      />
                    </svg>
                  </span>
                </div>
                <div className="Cart_main_row_col_text_price">
                  <h5>${item?.costProduct}</h5>
                  <div className="Cart_main_row_col_text_price_counter">
                    <button
                      onClick={() => updateQuantity(item.documentId, false)}
                    >
                      <svg
                        width="16"
                        height="2"
                        viewBox="0 0 16 2"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15.8125 1C15.8125 1.24864 15.7137 1.4871 15.5379 1.66291C15.3621 1.83873 15.1236 1.9375 14.875 1.9375H1.125C0.87636 1.9375 0.637903 1.83873 0.462087 1.66291C0.286272 1.4871 0.1875 1.24864 0.1875 1C0.1875 0.75136 0.286272 0.512903 0.462087 0.337087C0.637903 0.161272 0.87636 0.0625 1.125 0.0625H14.875C15.1236 0.0625 15.3621 0.161272 15.5379 0.337087C15.7137 0.512903 15.8125 0.75136 15.8125 1Z"
                          fill="black"
                        />
                      </svg>
                    </button>
                    <p>{item?.quantity}</p>
                    <button
                      onClick={() => updateQuantity(item.documentId, true)}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15.8125 8C15.8125 8.24864 15.7137 8.4871 15.5379 8.66291C15.3621 8.83873 15.1236 8.9375 14.875 8.9375H8.9375V14.875C8.9375 15.1236 8.83873 15.3621 8.66291 15.5379C8.4871 15.7137 8.24864 15.8125 8 15.8125C7.75136 15.8125 7.5129 15.7137 7.33709 15.5379C7.16127 15.3621 7.0625 15.1236 7.0625 14.875V8.9375H1.125C0.87636 8.9375 0.637903 8.83873 0.462087 8.66291C0.286272 8.4871 0.1875 8.24864 0.1875 8C0.1875 7.75136 0.286272 7.5129 0.462087 7.33709C0.637903 7.16127 0.87636 7.0625 1.125 7.0625H7.0625V1.125C7.0625 0.87636 7.16127 0.637903 7.33709 0.462087C7.5129 0.286272 7.75136 0.1875 8 0.1875C8.24864 0.1875 8.4871 0.286272 8.66291 0.462087C8.83873 0.637903 8.9375 0.87636 8.9375 1.125V7.0625H14.875C15.1236 7.0625 15.3621 7.16127 15.5379 7.33709C15.7137 7.5129 15.8125 7.75136 15.8125 8Z"
                          fill="black"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="Cart_main_summary">
          <h1>Order Summary</h1>
          <div className="Cart_main_summary_item">
            <p>Old Price</p>
            <b>${OldPriceCost}</b>
          </div>
          <div className="Cart_main_summary_item">
            <p>Discount ({discount}%)</p>
            <b>-${discountCost}</b>
          </div>
          <div className="Cart_main_summary_item">
            <p>Subtotal</p>
            <b>${subTotal}</b>
          </div>
          <div className="Cart_main_summary_item">
            <p>Delivery Fee</p>
            <b>$15</b>
          </div>
          <div className="Cart_main_summary_item total">
            <p>Total</p>
            <b>${resultCost}</b>
          </div>
          <div className="Cart_main_summary_item">
            <form action="">
              <span>
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21.0766 10.4857L11.7653 1.17444C11.5917 0.999696 11.3851 0.861152 11.1576 0.766846C10.93 0.672541 10.686 0.62435 10.4397 0.625069H1.75001C1.45164 0.625069 1.16549 0.743595 0.954513 0.954574C0.743534 1.16555 0.625008 1.4517 0.625008 1.75007V10.4398C0.624289 10.6861 0.67248 10.9301 0.766785 11.1576C0.861091 11.3852 0.999635 11.5918 1.17438 11.7654L10.4856 21.0766C10.8372 21.4281 11.3141 21.6256 11.8113 21.6256C12.3084 21.6256 12.7853 21.4281 13.1369 21.0766L21.0766 13.1369C21.4281 12.7853 21.6255 12.3085 21.6255 11.8113C21.6255 11.3141 21.4281 10.8373 21.0766 10.4857ZM11.8113 19.2204L2.87501 10.2813V2.87507H10.2813L19.2175 11.8113L11.8113 19.2204ZM7.37501 5.87507C7.37501 6.17174 7.28703 6.46175 7.12221 6.70842C6.95739 6.9551 6.72312 7.14736 6.44903 7.26089C6.17494 7.37442 5.87334 7.40412 5.58237 7.34625C5.2914 7.28837 5.02413 7.14551 4.81435 6.93573C4.60457 6.72595 4.46171 6.45868 4.40383 6.1677C4.34595 5.87673 4.37566 5.57513 4.48919 5.30104C4.60272 5.02695 4.79498 4.79269 5.04165 4.62786C5.28833 4.46304 5.57834 4.37507 5.87501 4.37507C6.27283 4.37507 6.65436 4.5331 6.93567 4.81441C7.21697 5.09571 7.37501 5.47724 7.37501 5.87507Z"
                    fill="black"
                    fillOpacity="0.4"
                  />
                </svg>
              </span>
              <input type="text" placeholder="Add promo code" />
            </form>
            <button>Apply</button>
          </div>
          <button>
            Go to Checkout
            <span>
              <svg
                width="19"
                height="16"
                viewBox="0 0 19 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.7959 0.454104L18.5459 7.2041C18.6508 7.30862 18.734 7.43281 18.7908 7.56956C18.8476 7.7063 18.8768 7.85291 18.8768 8.00098C18.8768 8.14904 18.8476 8.29565 18.7908 8.4324C18.734 8.56915 18.6508 8.69334 18.5459 8.79785L11.7959 15.5479C11.5846 15.7592 11.2979 15.8779 10.9991 15.8779C10.7002 15.8779 10.4135 15.7592 10.2022 15.5479C9.99084 15.3365 9.87211 15.0499 9.87211 14.751C9.87211 14.4521 9.99084 14.1654 10.2022 13.9541L15.0313 9.12504L1.25 9.12504C0.951632 9.12504 0.665483 9.00651 0.454505 8.79554C0.243527 8.58456 0.125 8.29841 0.125 8.00004C0.125 7.70167 0.243527 7.41552 0.454505 7.20455C0.665483 6.99357 0.951632 6.87504 1.25 6.87504L15.0313 6.87504L10.2013 2.04598C9.98991 1.83463 9.87117 1.54799 9.87117 1.2491C9.87117 0.950218 9.98991 0.663574 10.2013 0.45223C10.4126 0.240885 10.6992 0.122151 10.9981 0.122151C11.297 0.122151 11.5837 0.240885 11.795 0.45223L11.7959 0.454104Z"
                  fill="white"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
