import { useContext, useEffect, useState } from "react";
import "./Login.css";
import { assets, url } from "../../assets/assets";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import {toast} from "react-toastify"

const Login = ({ setShowLogin }) => {
  const { token, setToken } = useContext(StoreContext);

  const [currentState, setCurrentState] = useState("Login");

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;
    if (currentState === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }

    const response = await axios.post(newUrl, data);

    if (response.data.success) {
      localStorage.setItem("token", response.data.token);
      setToken(response.data.token);
      toast.success(response.data.message);
      setShowLogin(false);
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currentState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} />
        </div>
        <div className="login-popup-inputs">
          {currentState === "Sign Up" && (
            <input
              onChange={handleChange}
              name="name"
              value={data.name}
              type="text"
              placeholder="Your name"
              required
            />
          )}
          <input
            onChange={handleChange}
            name="email"
            value={data.email}
            type="email"
            placeholder="Your email"
            required
          />
          <input
            onChange={handleChange}
            name="password"
            value={data.password}
            type="password"
            placeholder="Password"
            required
          />
          <button type="submit">
            {currentState === "Sign Up" ? "Create account" : "Login"}
          </button>
          <div className="login-popup-condition">
            <input type="checkbox" />
            <p>By continuing, I agree to the terms of use & privacy policy.</p>
          </div>
          {currentState === "Sign Up" ? (
            <p>
              Already have an account ?{" "}
              <span onClick={() => setCurrentState("Login")}>Login here</span>
            </p>
          ) : (
            <p>
              Create a new account?{" "}
              <span onClick={() => setCurrentState("Sign Up")}>Click here</span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
