import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";

export const StoreContext = createContext(null);

const storeContextProvider = ({children})=>{

    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState("");

    const addToCart = (itemId) => {
        if(!cartItems[itemId]){
            setCartItems(prev => ({...prev, [itemId] : 1}))
        } else {
            setCartItems(prev => ({...prev, [itemId] : prev[itemId] + 1}))
        }
    }

    const removeFromCart = (itemId)=>{
        setCartItems(prev => ({...prev, [itemId] : prev[itemId] - 1}))
    }

    const getTotalCartAmount = ()=>{
        let totalAmount = 0;
        for(const item in cartItems){
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product)=>product._id === item);
                totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    }

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
        } else {
            console.log("Token not found!");
        }
    }, []);

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        token,
        setToken
    }
    
    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    )
}

export default storeContextProvider;