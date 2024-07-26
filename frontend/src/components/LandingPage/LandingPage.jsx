// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./LandingPage.css";

// import required modules
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";

const LandingPage = ({slidesArray}) => {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        effect={'fade'}
        autoplay={{delay: 4500, disableOnInteraction: false}}
        pagination={{clickable: true,}}
        navigation={true}
        modules={[Autoplay, EffectFade, Pagination, Navigation]}
        className="mySwiper"
      >
        {slidesArray.map((item, index) => {
          return (
            <SwiperSlide key={index} className="slide">
              <img src={item.img}/>
              <div className="slide-content">
                <h2>{item.heading || "Lorem ipsum dolor"}</h2>
                <p>
                  {item.des ||
                    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda tempore itaque minus rem repudiandae illo, sequi, modi accusantium quidem ad exercitationem quo ducimus at repellendus facere, atque quam soluta error!"}
                </p>
                <button
                  style={{
                    background: item.btnValue === "Order Now" ? "#ff441a" : "",
                    color: item.btnValue === "Order Now" ? "#fff" : "",
                  }}
                >
                  {item.btnValue || "View Menu"}
                </button>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default LandingPage;
