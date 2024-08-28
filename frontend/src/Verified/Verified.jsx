import React, { useContext } from 'react'
import { StoreContext } from "../../src/context/StoreContext"
import './Verified.css'
import { useNavigate, useSearchParams } from "react-router-dom"
import axios from 'axios'
import { useEffect } from 'react'
const Verified = () => {
  const [SearchParam, setSearchParam] = useSearchParams()
  const success = SearchParam.get("success")
  const orderId = SearchParam.get("orderId")
  const { url } = useContext(StoreContext)
  const navigate = useNavigate();//it is used to redirect to another page

  const VerifyPayment = async () => {
    const response = await axios.post(url + "/api/order/verify", { success, orderId });
    if (response.data.success) {
      navigate("/myorders")//it is used to redirect to another page
    } else {
      navigate("/")
    }
  }
  useEffect(() => {
    VerifyPayment()
  }, [])
  return (
    <div className='verify'>
      <div className="spinner">

      </div>
    </div>
  )
}

export default Verified