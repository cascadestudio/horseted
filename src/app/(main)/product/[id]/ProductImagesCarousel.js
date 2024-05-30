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
    <div className="flex w-[800px]">
      <div className="w-3/4">
        <Slider
          asNavFor={nav1}
          ref={(slider) => (sliderRef2 = slider)}
          slidesToShow={3}
          swipeToSlide={true}
          focusOnSelect={true}
          vertical={true}
          verticalSwiping={true}
        >
          {children.map((child, index) => (
            <div className="w-full h-full" key={index}>
              {child}
            </div>
          ))}
        </Slider>
      </div>

      <div className="w-1/4">
        <Slider asNavFor={nav2} ref={(slider) => (sliderRef1 = slider)}>
          {children.map((child, index) => (
            <div className="w-full h-full" key={index}>
              {child}
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
