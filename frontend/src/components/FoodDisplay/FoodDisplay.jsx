import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import "./FoodDisplay.css";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({category}) => {
  const { food_list } = useContext(StoreContext);
  return (
    <div className="food-display" id="food-display">
        <h1>Top dishes near you</h1>
        <div className="food-display-list">
            {
                food_list.map((item, index)=>(
                    <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} img={item.image}/>
                ))
            }
        </div>
    </div>
  );
};

export default FoodDisplay;
