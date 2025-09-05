import React, { useEffect, useState } from 'react'
import './Order.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../../assets/assets'


const Order = ({url}) => {

  const [orders, setOrders] = useState([]);

  const fetchOrders = async () =>{
    const resp = await axios.get(url+'/api/order/allOrders');
    if(resp.data.success){
      setOrders(resp.data.orders);
    }
    else{
      toast.error("Error");
    }
  }

  const statusHandler =  async (e, orderId)=>{
    const resp = await axios.post(url+'/api/order/status',{
      orderId, 
      status : e.target.value
    })

    if(resp.data.success){
      await fetchOrders();
    }
    else{
      toast.error(resp.data.message);
    }
  }

  useEffect(()=>{
    fetchOrders();
  },[]);

  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order,index)=>{
          return (
            <div className="order-item" key = {index}>
              <img src={assets.parcel_icon} alt="" />
              <div>
                <p className="order-item-food">
                  {order.items.map((item,index)=>{
                    if(index === order.items.length-1){
                      return item.name+"  "+"x"+"  "+item.quantity;
                    }
                    else{
                      return item.name+"  "+"x"+"  "+item.quantity+" "+","+" ";
                    }
                  })}
                </p>
                <p className="order-item-name">{order.address.firstName + " " + order.address.lastName}</p>
                <div className="order-item-address">
                  <p>{order.address.street + "," + " "}</p>
                  <p>{order.address.city +" "+ "," + " "+order.address.state +" "+ "," + " "+
                      order.address.country +" "+ "," + " "+order.address.zipCode +" "}</p>
                </div>
                <p className="order-item-phone">{order.address.phone}</p>
              </div>
              <p>Items : {order.items.length}</p>
              <p>${order.amount}</p>
              <select onChange = {(e)=>statusHandler(e , order._id)} value={order.status}>
                <option value="Food Processing">Food Processing</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Order