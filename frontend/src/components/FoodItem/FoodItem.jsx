import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext';
import './FoodItem.css'
import { useState , useContext} from 'react'

const FoodItem = ({item}) => {

    const {cart, addToCart, removeFromCart, url} = useContext(StoreContext);

  return (
    <div className="food-item">
        <div className="food-item-img-container">
            <img src={url+"/images/"+item.image} className="food-item-img" />
            {
                !cart[item._id]?
                <img src={assets.add_icon_white} className='add-icon' onClick={()=>{addToCart(item._id)}} />
                :
                <div className='food-item-counter'>
                    <img src={assets.remove_icon_red} onClick={()=>{removeFromCart(item._id)}} />
                    <p>{cart[item._id]}</p>
                    <img src={assets.add_icon_green} onClick={()=>{addToCart(item._id)}} />
                </div>
            }
        </div>
        <div className="food-item-info">
            <div className="food-item-name-rating">
                <p>{item.name}</p>
                <img src={assets.rating_starts} alt="" />
            </div>
            <p className="food-item-desc">{item.description}</p>
            <p className="food-item-price">${item.price}</p>
        </div>
    </div>
  )
}

export default FoodItem