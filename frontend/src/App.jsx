import "./App.css";
import Navbar from "./components/navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Cart from "./pages/Cart/Cart";
import Footer from "./components/Footer/Footer";
import LoginPopup from "./components/LoginPopUp/LoginPopup";
import { useState } from "react";
import MyOrders from "./pages/MyOrders/MyOrders";

function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {showLogin? <LoginPopup setShowLogin={setShowLogin}/> : <></>}
      <div className="app">
        <Navbar showLogin={showLogin} setShowLogin={setShowLogin}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/place-order" element={<PlaceOrder />} />
          <Route path="/cart" element={<Cart />} />
          <Route path='/myorders' element={<MyOrders/>}></Route>
        </Routes>
      </div>
      <Footer/>
    </>
  );
}

export default App;
