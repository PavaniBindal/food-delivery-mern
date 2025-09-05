import React from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { food_list, cart, removeFromCart, cartTotalAmt, url } = useContext(StoreContext);
  const navigate = useNavigate();

  return (
    <>
      {cartTotalAmt() <= 0 ? (
        <div className="cart-empty-container">
          <h1>Your Cart is Empty</h1>
        </div>
      ) : (
        <div className="cart">
          <div className="cart-items">
            <div className="cart-items-title">
              <p>Items</p>
              <p>Title</p>
              <p>Price</p>
              <p>Quantity</p>
              <p>Total</p>
              <p>Remove</p>
            </div>
            <br />
            <hr />
            {food_list.map((item, index) => {
              if (cart[item._id] > 0) {
                return (
                  <div key={item._id}>
                    <div className="cart-items-title cart-items-item">
                      <img src={url+"/images/"+item.image} alt="" />
                      <p>{item.name}</p>
                      <p>$ {item.price}</p>
                      <p>{cart[item._id]}</p>
                      <p>$ {cart[item._id] * item.price}</p>
                      <p className="cross" onClick={() => {removeFromCart(item._id);}}> X </p>
                    </div>
                    <hr />
                  </div>
                );
              }
            })}
          </div>

          <div className="cart-bottom">
            <div className="cart-total">
              <h2>Cart Total</h2>
              <div>
                <div className="cart-total-details">
                  <p>Subtotal</p>
                  <p>$ {cartTotalAmt()}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                  <p>Delivery Fee</p>
                  <p>$ {2}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                  <b>Total</b>
                  <b>$ {cartTotalAmt() + 2}</b>
                </div>
              </div>
              <button onClick={() => navigate("/place-order")}>
                PROCEED TO CHECKOUT
              </button>
            </div>
            <div className="cart-promocode">
              <div>
                <p>Have a promocode?</p>
                <div className="cart-promocode-input">
                  <input type="text" placeholder="Promo Code" />
                  <button>Apply</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
