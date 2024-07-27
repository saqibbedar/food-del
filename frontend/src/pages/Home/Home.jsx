import { useState } from 'react'
import './Home.css'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import LandingPage from '../../components/LandingPage/LandingPage'
import { slidesArray } from '../../assets/assets'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import AppDownload from '../../components/AppDownload/AppDownload'

const Home = () => {
  const [category, setCategory] = useState("All");
  
  return (
    <div className='home'>
      <LandingPage slidesArray={slidesArray}/>
      <ExploreMenu category={category} setCategory={setCategory}/>
      <FoodDisplay category={category}/>
      <AppDownload/>
    </div>

  )
}

export default Home
