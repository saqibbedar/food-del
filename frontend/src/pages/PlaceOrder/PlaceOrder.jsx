import React, { useContext, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import { url } from '../../assets/assets';
import axios from 'axios';

const PlaceOrder = () => {

  const { getTotalCartAmount, token, food_list, cartItems } = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: ""
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData(data => ({ ...data, [name]: value }));
  }

  const placeOrder = async (event) => {
    event.preventDefault();
    const orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        const itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });

    const orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() +2,
    }
    let response = await axios.post(`${url}/api/order/place`, orderData, { headers: { token } });
    
    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url);
    } else {
      alert(response.data.message);
    }
  }

  return (
    <form className="place-order" onSubmit={placeOrder}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required
            name="firstName"
            onChange={handleChange}
            value={data.firstName}
            type="text"
            placeholder="First Name"
          />
          <input required
            name="lastName"
            onChange={handleChange}
            value={data.lastName}
            type="text"
            placeholder="Last Name"
          />
        </div>
        <input required
          name="email"
          onChange={handleChange}
          value={data.email}
          type="email"
          placeholder="Email address"
        />
        <input required
          name="street"
          onChange={handleChange}
          value={data.street}
          type="text"
          placeholder="Street"
        />
        <div className="multi-fields">
          <input required
            name="city"
            onChange={handleChange}
            value={data.city}
            type="text"
            placeholder="City"
          />
          <input required
            name="state"
            onChange={handleChange}
            value={data.state}
            type="text"
            placeholder="State"
          />
        </div>
        <div className="multi-fields">
          <input required
            name="zipCode"
            onChange={handleChange}
            value={data.zipCode}
            type="text"
            placeholder="Zip code"
          />
          <input required
            name="country"
            onChange={handleChange}
            value={data.country}
            type="text"
            placeholder="Country"
          />
        </div>
        <input required
          name="phone"
          onChange={handleChange}
          value={data.phone}
          type="text"
          placeholder="phone"
        />
      </div>

      <div className="place-order-right">
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
          <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
}

export default PlaceOrder
