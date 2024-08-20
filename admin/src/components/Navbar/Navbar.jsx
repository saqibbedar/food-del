import { assets } from "../../assets/assets"
import './Navbar.css'

const Navbar = () => {
  return (
    <div className="admin-navbar">
      <img src={assets.logo} alt="" />
      <img src={assets.profile_image} alt="" />
    </div>
  )
}

export default Navbar
