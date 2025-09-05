import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import { useContext , useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const { cartTotalAmt , token, food_list, url, cart,setCart } = useContext(StoreContext);

  const navigate = useNavigate();

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
  })

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData(prev => ({...prev , [name] : value}));
  }

  const onPlaceOrder = async (e) => {
    e.preventDefault();
    const newUrl = url + '/api/order/place';
    let orderItems = [];
    food_list.map((item)=>{
      if(cart[item._id] > 0){
        let itemInfo = item;
        itemInfo["quantity"] = cart[item._id];
        orderItems.push(itemInfo);
      }
    })

    let orderData = {
      address : data,
      items : orderItems,
      amount : cartTotalAmt()+2
    }

    let resp = await axios.post(newUrl , orderData, {headers : {token}});

    if(resp.data.success){
      console.log("Order placed Successfully");
      setCart({});
      setData({
        firstName : "",
        lastName : "",
        email : "",
        street : "",
        city : "",
        state : "",
        zipCode : "",
        country : "",
        phone : ""
      });
      navigate('/myorders');
    }
    else{
      navigate('/');
    } 
  }

  return (
    <form action="" className="place-order" onSubmit={onPlaceOrder}>
      <div className="place-order-left">
        <h2 className="title">Delivery Information</h2>
        <div className="multi-fields">
          <input type="text" placeholder="First Name" name="firstName" onChange={onChangeHandler} value={data.firstName} required/>
          <input type="text" placeholder="Last Name" name="lastName" onChange={onChangeHandler} value={data.lastName} required/>
        </div>
        <input type="email" placeholder="Email Address" name="email" onChange={onChangeHandler} value={data.email} required/>
        <input type="text" placeholder="Street" name="street" onChange={onChangeHandler} value={data.street} required/>
        <div className="multi-fields">
          <input type="text" placeholder="City" name="city" onChange={onChangeHandler} value={data.city} required/>
          <input type="text" placeholder="State" name="state" onChange={onChangeHandler} value={data.state} required/>
        </div>
        <div className="multi-fields">
          <input type="text" placeholder="Zip Code" name="zipCode" onChange={onChangeHandler} value={data.zipCode} required/>
          <input type="text" placeholder="Country" name="country" onChange={onChangeHandler} value={data.country} required/>
        </div>
        <input type="text" placeholder="Phone Number" name="phone" onChange={onChangeHandler} value={data.phone} required/>
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>$ {cartTotalAmt()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>$ {2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>$ {cartTotalAmt() + 2}</b>
            </div>
          </div>
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
