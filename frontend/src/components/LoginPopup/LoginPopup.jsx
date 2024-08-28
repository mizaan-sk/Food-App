import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { StoreContext } from '../../context/StoreContext'
const LoginPopup = ({ setshowLogin }) => {

  const {url,setToken} = useContext(StoreContext)
  const [currState, setcurrState] = useState("Sign In")
  const [Data, setData] = useState({
    name: "",
    email: "",
    password: ""
  })

  const OnchangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData(data => ({ ...data, [name]: value }))//{...data} this means to create a shallow copy of data
  }

  const onLogin =async (event) =>{
    event.preventDefault()
    let newUrl = url;
    if(currState === "Login"){
      newUrl += "/api/user/login"
    }
    else{
      newUrl += "/api/user/register"
    }
    const response = await axios.post(newUrl,Data)
    if(response.data.success){
      setToken(response.data.token)
      localStorage.setItem("token",response.data.token)
      setshowLogin(false)
    }
    else{
      alert(response.data.message)
    }
  }
  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={() => setshowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
          {currState === "Login" ? <></> : <input name='name'
            onChange={OnchangeHandler} value={Data.name} type="text" placeholder='Your name' required />}

          <input type="email" onChange={OnchangeHandler} name='email' value={Data.email} placeholder='your email' required />
          <input type="password" name='password' onChange={OnchangeHandler} value={Data.password} placeholder='Password' required />
        </div>
        <button type='submit'>{currState === "Sign Up" ? "Create account" : "Login"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
        {currState === "Login"
          ? <p>Create a new account?<span onClick={() => setcurrState("Sign Up")}>Click here</span></p>
          : <p>Already have an account?<span onClick={() => setcurrState("Login")}>Login here</span></p>
        }
      </form>
    </div>
  )
}

export default LoginPopup
