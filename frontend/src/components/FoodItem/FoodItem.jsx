import { useContext} from "react"
import { assets, url } from "../../assets/assets"
import "./FoodItem.css"
import { StoreContext } from "../../context/StoreContext";

const FoodItem = ({id, name, price, description, img}) => {

  const {cartItems, addToCart, removeFromCart } = useContext(StoreContext)

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img className="food-item-img" src={`${url}/images/${img}`}/>
        {!cartItems[id] ? 
        <img className="add" onClick={()=>addToCart(id)} src={assets.add_icon_white}/> 
        : 
        <div className="food-item-counter">
          <img src={assets.remove_icon_red} onClick={()=> removeFromCart(id)}/>
          <p>{cartItems[id]}</p>
          <img src={assets.add_icon_green} onClick={()=> addToCart(id)}/>
        </div>
        }
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
