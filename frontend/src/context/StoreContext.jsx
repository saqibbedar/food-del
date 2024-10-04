import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { url } from "../assets/assets.js";

export const StoreContext = createContext(null);

const storeContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);

  const fetchFoodList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    if (response.data.success) {
      setFoodList(response.data.data);
    } else {
      console.log(response.data.message);
    }
  };

  const addToCart = (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    async function loadData() {
      await fetchFoodList();
      if (storedToken) {
        setToken(storedToken);
      } else {
        console.log("Token not found!");
      }
    };
    loadData();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default storeContextProvider;
