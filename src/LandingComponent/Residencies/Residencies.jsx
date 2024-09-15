import React from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import "./Residencies.css";
import data from "../utils/slider.json";
import { sliderSettings } from "../utils/common";

const Residencies = () => {
  return (
    <section className="r-wrapper" id="services">
      <div className="paddings innerWidth r-container">
        <div className="r-head  justify-center text-center">
          <div className="justify-center text-center">
          <span className="orangeText " role="H1">Empowering You to Ensure Accurate and Reliable Employee Verification</span>
          </div>
          <br></br>
          <span className="secondaryText " role="H2">Our Employee Background Verification system offers a seamless and efficient way to conduct thorough background checks. With features like automated identity verification, comprehensive credential validation, and secure document management, we aim to streamline the hiring process and ensure the highest level of accuracy and reliability.</span>
        </div>
        <Swiper {...sliderSettings}>
            <SliderButtons/> 
          {data.map((card, i) => (
            <SwiperSlide key={i}>
              <div className="flexColStart r-card ">
                <img src={card.image} alt="home" />

                <span className="secondaryText r-price">
                  {/* <span style={{ color: "orange" }}>$</span>
                  <span>{card.price}</span> */}
                </span>
                <span className="primaryText">{card.name}</span>
                <span className="secondaryText">{card.detail}</span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Residencies;

const SliderButtons = () => {
  const swiper = useSwiper();
  return (
    <div className=" flexCenter r-buttons">
      <button onClick={()=> swiper.slidePrev()}>&lt;</button>
      <button onClick={()=> swiper.slideNext()}>&gt;</button>
    </div>
  );
};
