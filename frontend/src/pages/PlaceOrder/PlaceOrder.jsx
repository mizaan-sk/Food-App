import React, { useContext, useState } from "react";
import "./PlaceOrder.css";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext)
  const [data, setData] = useState({
    firstName: "",
    lastName: "", 
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  })
const OnChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData(data => ({ ...data, [name]: value }))
  }

  const placeOrder = async (event) =>{
    event.preventDefault();
    let OrderItems = [];
    food_list.map((item)=>{
      if (cartItems[item._id]>0) {
        let itemInfo = item;    
        itemInfo["quantity"] = cartItems[item._id];
        OrderItems.push(itemInfo);
      }
    })
    let ordersData = {
      address:data, 
      items:OrderItems,
      amount:getTotalCartAmount()+20
    }
    let response = await axios.post(url+"/api/order/place",ordersData,{headers:{token}})
    if (response.data.success) {
      const {session_url} = response.data;
      window.location.replace(session_url);
    } else {
    alert("Error placing order. Please try again.");
    } 
  }

  const navigate = useNavigate();
  useEffect(()=>{
    if(!token){
      navigate("/cart")
    }
    else if(getTotalCartAmount === 0){
      navigate("/cart")
    }
  },[token])


  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <div className="title">Delivery Information</div>
        <div className="multi-fields">
          <input required name="firstName" onChange={OnChangeHandler} value={data.firstName} type="text" placeholder="First name" />
          <input required name="lastName" onChange={OnChangeHandler} value={data.lastName} type="text" placeholder="Last name" />
        </div>
        <input required name="email" onChange={OnChangeHandler} value={data.email} type="email" placeholder="Email address" />
        <input required name="street" onChange={OnChangeHandler} value={data.street} type="text" placeholder="Street" />
        <div className="multi-fields">
          <input required name="city" onChange={OnChangeHandler} value={data.city} type="text" placeholder="City" />
          <input required name="state" onChange={OnChangeHandler} value={data.state} type="text" placeholder="State" />
        </div>
        <div className="multi-fields">
          <input required name="zipcode" onChange={OnChangeHandler} value={data.zipcode} type="text" placeholder="Zip code" />
          <input required name="country" onChange={OnChangeHandler} value={data.country} type="text" placeholder="Country" />
        </div>
        <input required type="Number" name="phone" onChange={OnChangeHandler} value={data.phone} placeholder="Phone" />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery fee</p>
              <p>₹{getTotalCartAmount() === 0 ? 0 : 20}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 20}</b>
            </div>
          </div>
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>

      </div>
    </form>
  );
};

export default PlaceOrder;
