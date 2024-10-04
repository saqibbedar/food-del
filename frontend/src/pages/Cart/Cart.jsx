import React, { useContext, useEffect, useState } from 'react'
import {useNavigate} from "react-router-dom"
import './Cart.css'
import { StoreContext } from "../../context/StoreContext"
import {url} from "../../assets/assets.js"

const Cart = () => {
    const [isButtonDisable, setIsButtonDisable] = useState(true);
  const navigate = useNavigate();

  const { cartItems, food_list, removeFromCart, getTotalCartAmount, token } = useContext(StoreContext);

  useEffect(() => {
    if (!token) {
      setIsButtonDisable(true);
    } else if (getTotalCartAmount() <= 0) {
      console.log(getTotalCartAmount);
      setIsButtonDisable(true);
    } else {
      setIsButtonDisable(false);
    }
  }, [token, getTotalCartAmount]);

  return (
    <div className="cart-container">
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
          if (cartItems[item._id] > 0) {
            return (
              <div className="cart-items-holder">
                <div className="cart-items-title cart-items-item">
                  <img src={`${url}/images/${item.image}`} />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>${item.price * cartItems[item._id]}</p>
                  <p className="cross" onClick={() => removeFromCart(item._id)}>
                    x
                  </p>
                </div>
                <hr />
              </div>
            );
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>${getTotalCartAmount()}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <b>Total</b>
            <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
          </div>
          <button
            disabled={isButtonDisable}
            style={{ background: isButtonDisable ? "#a1a1a1" : "tomato", cursor: isButtonDisable? "no-drop" : "pointer" }}
            onClick={() => navigate("/order")}
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, Enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="promo code" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart
