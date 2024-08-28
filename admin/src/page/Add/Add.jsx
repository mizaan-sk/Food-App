import React, { useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'
const Add = ({url}) => {
  const [Image, setImage] = useState(false)
  const [Data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad"
  })
  const OnChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData(Data => ({ ...Data, [name]: value }))
  }

  const OnSubmitHandler = async (event) => {
    event.preventDefault();
    
    const formdata = new FormData();
    formdata.append("name", Data.name);
    formdata.append("description", Data.description);
    formdata.append("price", Number(Data.price));
    formdata.append("category", Data.category);
    formdata.append("image", Image);
    
    try {
      const response = await axios.post(`${url}/api/food/add`, formdata);
      
      if (response.data.success) {
        setData({
          name: "",
          description: "",
          price: "",
          category: "Salad"
        });
        toast.success(response.data.message)
        setImage(false);
      } else {
        // Handle the case when success is false
        toast.error(response.data.message)
        console.error('Failed to add food item:', response.data.message);
      }
    } catch (error) {
      // Handle any errors that occur during the request
      console.error('An error occurred:', error);
    }
  };
  

  return (
    <div className='add'>
      <form className='flex-col' onSubmit={OnSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={Image ? URL.createObjectURL(Image) : assets.upload_area} alt="" />
          </label>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
        </div>

        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input type="text" onChange={OnChangeHandler} value={Data.name} name="name" placeholder='Type here' />
        </div>

        <div className='add-product-description flex-col'>
          <p>Product description</p>
          <textarea onChange={OnChangeHandler} value={Data.description} name="description" rows='6' placeholder='Write content here' required></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product category</p>
            <select onChange={OnChangeHandler} name="category" >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product Price</p>
            <input onChange={OnChangeHandler} value={Data.price} type="Number" name="price" placeholder='20₹' />
          </div>
        </div>

        <button type='submit' className='add-btn'>ADD</button>
      </form>
    </div>
  )
}

export default Add