import { useState } from "react"
import "./Login.css"
import { assets } from "../../assets/assets"

const Login = ({setShowLogin}) => {
    const [currentState, setCurrentState] = useState("Login")
  return (
    <div className="login-popup">
      <form className="login-popup-container">
        <div className="login-popup-title">
            <h2>{currentState}</h2>
            <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} />
        </div>
        <div className="login-popup-inputs">
            {currentState === "Sign Up" && <input type="text" placeholder="Your name" required/>}
            <input type="email" placeholder="Your email" required/>
            <input type="password" placeholder="Password" required/>
            <button>{currentState === "Sign Up" ? "Create account" : "Login"}</button>
            <div className="login-popup-condition">
                <input type="checkbox"/>
                <p>By continuing, I agree to the terms of use & privacy policy.</p>
            </div>
            {currentState === "Sign Up" ?  
            <p>Already have an account ? <span onClick={()=> setCurrentState("Login")}>Login here</span></p> 
            :
            <p>Create a new account? <span onClick={()=>setCurrentState("Sign Up")}>Click here</span></p>
            }

        </div>
      </form>
    </div>
  )
}

export default Login
