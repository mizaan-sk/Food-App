import React from 'react'
import './Orders.css'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from "axios"
import { toast } from 'react-toastify'
import { assets } from '../../assets/assets'
const Orders = ({ url }) => {
  const [Orders, setOrders] = useState([])

  const fetchOrder = async () => {
    const response = await axios.get(url + "/api/order/list")
    if (response.data.success) {
      setOrders(response.data.data)
      console.log(response.data.data)
    }
    else {
      toast.error("Error")
    }
  }

  const StatusHandler =async (event,orderId) => {
    const response = await axios.post(url+"/api/order/status",{
      orderId,
      status:event.target.value
    })
    if (response.data.success) {
      await fetchOrder();
    }
  }
  useEffect(() => {
    fetchOrder()
  }, [])
  return (
    <div className='order add'>
      <h3>Orders</h3>
      <div className='order-list'>
        {Orders.map((order, index) => (
          <div key={index} className='order-item'>
            <img src={assets.parcel_icon} alt="" />
            <div >
              <p className="order-item-food">
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity
                  } else {
                    return item.name + " x " + item.quantity + " ,"
                  }

                })}
              </p>
              <p className='order-item-name'>{order.address.firstName + " " + order.address.lastName}</p>
              <div className="order-item-add">
                <p>{order.address.street + ", "}</p>
                <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + "," + order.address.zipcode}</p>
              </div>
              <p className='order-item-phone'>{order.address.phone}</p>
            </div>
            <p>Item:{order.items.length}</p>
            <p>₹ {order.amount}</p>
            <select onChange={(event)=>StatusHandler(event,order._id)} value={order.status}>
              <option value="Food Processing">Food Processing</option>
              <option value="Out For Delivery">Out For Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders