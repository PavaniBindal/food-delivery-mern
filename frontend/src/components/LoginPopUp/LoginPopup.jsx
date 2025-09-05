import './LoginPopup.css'
import {useContext, useState} from 'react'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'




const LoginPopup = ({setShowLogin}) => {

  const {url, token, setToken} = useContext(StoreContext);

  const [currState, setCurrState] = useState('Login');

  const [data, setData] = useState({
    name:"",
    email:"",
    password:""
  })

  const onChangeHandler = (e) =>{
    const name = e.target.name;
    const value = e.target.value;
    setData(prev => ({...prev , [name] : value}));
  }

  const onLogin = async (e)=>{
    e.preventDefault();

    let newUrl = url;
    if(currState === 'Login'){
      newUrl += '/api/user/login';
    }
    else{
      newUrl += '/api/user/register';
    }

    const resp = await axios.post(newUrl, data);

    if(resp.data.success){
      setToken(resp.data.token);
      localStorage.setItem("token", resp.data.token);
      setShowLogin(false);
    }
    else{
      alert(resp.data.message);
    }
  }

  return (
    <div className='login-popup'>
      <form className="login-popup-container" onSubmit={onLogin}>
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img src={assets.cross_icon} alt="" onClick = {() => setShowLogin(false)}/>
        </div>
        <div className="login-popup-inputs">
          {currState === 'Sign Up'? <input type="text" placeholder='Your Name' name="name" onChange={onChangeHandler} value={data.name} required/> : ''}
          <input type="text" placeholder='Your Email' name="email" onChange={onChangeHandler} value={data.email} required/>
          <input type="password" placeholder='Password' name="password" onChange={onChangeHandler} value={data.password} required/>
        </div>
        <button type="submit">{currState==='Sign Up'? 'Create New Account' : 'Login'}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required/>
          <p>By continuing, you agree to our Terms & Conditions and Privacy Policy</p>
        </div>
        {currState === 'Sign Up'? 
          <p>Already have an account? <span onClick={()=> setCurrState('Login')}>Login Here</span></p> : 
          <p>Create a new account?  <span onClick={()=> setCurrState('Sign Up')}>Sign Up Here</span></p>
        }
      </form>
    </div>
  )
}

export default LoginPopup