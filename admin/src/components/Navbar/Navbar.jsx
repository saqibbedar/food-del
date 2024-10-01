import { assets } from "../../assets/assets"
import './Navbar.css'

const Navbar = () => {
  return (
    <div className="admin-navbar">
      <img className="logo" src={assets.logo} alt="" />
      <img className="profile" src={assets.profile_image} alt="" />
    </div>
  )
}

export default Navbar
