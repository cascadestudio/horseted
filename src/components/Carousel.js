"use client";
import React, { useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Carousel({ children }) {
  const [slideIndex, setSlideIndex] = useState(0);
  const childrenCount = React.Children.count(children);
  let sliderRef = useRef(null);
  var settings = {
    arrows: false,
    dots: false,
    infinite: false,
    speed: 500,
    beforeChange: (current, next) => setSlideIndex(next),
    initialSlide: 0,
    slidesToShow: 4.4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3.4,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1040,
        settings: {
          slidesToShow: 2.4,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1.4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1.2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 370,
        settings: {
          slidesToShow: 1.1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="flex flex-col">
      <Slider
        ref={(slider) => {
          sliderRef = slider;
        }}
        {...settings}
      >
        {children}
      </Slider>
      <input
        className="w-[480px] h-2 self-center cursor-pointer"
        onChange={(e) => sliderRef.slickGoTo(e.target.value)}
        value={slideIndex}
        type="range"
        min={0}
        max={childrenCount - 4}
        step="1"
      />
      <style>
        {`
          input[type='range']::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 140px;
            height: 7px;
            background-color: #4D7A4C;
            border-radius: 0;
            border: none;
            cursor: pointer;
          }
          input[type='range']::-moz-range-thumb {
            width: 140px;
            height: 7px;
            background-color: #4D7A4C;
            border: none;
            border-radius: 0;
            cursor: pointer;
          }
          input[type='range']::-webkit-slider-runnable-track {
            height: 2px;
          }
          input[type='range']::-moz-range-track {
            height: 2px;
          }
        `}
      </style>
    </div>
  );
}
