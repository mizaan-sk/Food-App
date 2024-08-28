import { React, useEffect, useState } from 'react'
import './List.css'
import { toast } from 'react-toastify';
import axios from 'axios'
const List = ({url}) => {

  const [List, setList] = useState([])

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`)
    console.log(response.data)
    if (response.data.success) {
      setList(response.data.data)
      toast.success(response.data.message)
    } else {
      toast.error("Error")
    }
  }
  
  const RemoveFood = async (foodid) => {  
    const response = await axios.post(`${url}/api/food/remove`,{id:foodid})
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message)
    } else {
      toast.error("Error")
    }
  }

  useEffect(() => {
    fetchList();
  }, [])

  return (
    <div className='list add flex-col'>
      <p>All food list</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {List.map((item,index)=>{
          return(
            <div key={index} className='list-table-format'>
              <img className='img-size' src={`${url}/images/`+item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.price}₹</p>
              <p onClick={()=>RemoveFood(item._id)} className='cursor'>X</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default List