import { createContext, useEffect } from "react";
// import { food_list } from "../assets/assets";
import { useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const url = "http://localhost:3000";
  const [cart, setCart] = useState({});
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);

  const addToCart = async (itemId) => {
    if (!cart[itemId]) {
     setCart((prev) => ({ ...prev, [itemId]: 1 }));
    } 
    else {
     setCart((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }

    if(token){
      await axios.post(`${url}/api/cart/add`, {itemId}, {headers : {token}});
    }
  };

  const removeFromCart = async (itemId) => {
    setCart((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

    if(token){
      await axios.post(`${url}/api/cart/remove`, {itemId}, {headers : {token}});
    }
  };

  const cartTotalAmt = () => {
    let totalAmt = 0;
    for (const itemId in cart) {
     let item = food_list.find((prod) => prod._id === itemId);
     totalAmt += item.price * cart[itemId];
    }

    return totalAmt;
  };

  const fetchFoodList = async () => {
    const resp = await axios.get(`${url}/api/food/list`);
    setFoodList(resp.data.food_list);
  };

  const fetchCart = async (token) =>{
    const resp = await axios.post(`${url}/api/cart/get` ,{}, {headers : {token}});
    setCart(resp.data.cartData);
  }

  useEffect(() => {
    async function loadData() {
     await fetchFoodList();
     const token = localStorage.getItem("token");
     if (token) {
      setToken(token);
      fetchCart(token);
     }
     else{
      setCart({});
     }
    }

    loadData();
  }, []);


  const contextValue = {
    food_list,
    cart,
    setCart,
    addToCart,
    removeFromCart,
    cartTotalAmt,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
     {children}
    </StoreContext.Provider>
  );
};

export {StoreContextProvider};
