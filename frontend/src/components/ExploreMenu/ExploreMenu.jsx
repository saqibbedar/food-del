import "./ExploreMenu.css";
import { menu_list } from "../../assets/assets";

// props are coming from home as a state for categories

const ExploreMenu = ({category, setCategory}) => {

  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explore our menu</h1>
      <p>Choose a diverse menu featuring a delectable array </p>
      <div className="explore-menu-list">
        {menu_list.map((item, index) => (
            <div onClick={() => {setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)}} key={index} className="explore-menu-list-item" >
              <img className={category === item.menu_name ? "active" : ""}
                src={item.menu_image}/>
              <p>{item.menu_name}</p>
            </div>
          ))}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;
