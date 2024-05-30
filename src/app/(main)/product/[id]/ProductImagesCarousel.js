"use client";
import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export default function ProductImagesCarousel({ children }) {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  let sliderRef1 = useRef(null);
  let sliderRef2 = useRef(null);

  useEffect(() => {
    setNav1(sliderRef1);
    setNav2(sliderRef2);
  }, []);
  return (
    <div>
      <div>
        <Slider asNavFor={nav2} ref={(slider) => (sliderRef1 = slider)}>
          {children.map((child, index) => (
            <div key={index}>
              <div>{child}</div>
            </div>
          ))}
        </Slider>
        <Slider
          asNavFor={nav1}
          ref={(slider) => (sliderRef2 = slider)}
          slidesToShow={3}
          swipeToSlide={true}
          focusOnSelect={true}
        >
          {children.map((child, index) => (
            <div key={index}>
              <div>{child}</div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
