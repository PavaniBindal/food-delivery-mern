import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";

const List = ({url}) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    if (response.data.success) {
      setList(response.data.food_list);
    } else {
      toast.error("Something went wrong");
    }
  };

  const removeFood = async (foodId)=>{
    const resp = await axios.post(`${url}/api/food/remove` , {id:foodId});
    await fetchList();
    if(resp.data.success){
      toast.success("Item removed successfully");
    }
    else{
      toast.error("Something went wrong");
    }
  }

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Catgeory</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item,index) =>{
          return (
            <div className="list-table-format" key={index}>
              <img src={`${url}/images/`+item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p className="cursor" onClick={() => {removeFood(item._id)}}>X</p>
            </div>
          )
        })}
      </div>
    </div>
  );

  
};

export default List;
