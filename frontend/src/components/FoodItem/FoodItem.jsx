import { assets } from "../../assets/assets"
import "./FoodItem.css"

const FoodItem = ({id, name, price, description, img}) => {
  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img className="food-item-img" src={img}/>
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
            <p>{name}</p>
            <img src={assets.rating_starts}/>
        </div>
        <div className="food-item-desc">
            {description}
        </div>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  )
}

export default FoodItem
