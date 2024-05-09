"use client";
import React, { useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Carousel({ children }) {
  const [slideIndex, setSlideIndex] = useState(0);
  let sliderRef = useRef(null);
  var settings = {
    arrows: false,
    dots: true,
    infinite: false,
    speed: 500,
    beforeChange: (current, next) => setSlideIndex(next),
    initialSlide: 0,
    slidesToShow: 4.4,
    slidesToScroll: 4,
    appendDots: (dots) => (
      <ul>
        {dots.map((dot, index) => (
          <li
            key={index}
            style={{
              width: window.innerWidth < 1024 ? "33px" : "118px",
              margin: 0,
              padding: 0,
            }}
          >
            {dot.props.children}
          </li>
        ))}
      </ul>
    ),
    customPaging: (i) => (
      <div
        style={{
          width: "100%",
          height: "7px",
          cursor: "pointer",
          background:
            window.innerWidth < 1024
              ? i === Math.ceil(slideIndex)
                ? "#4D7A4C"
                : "white"
              : i === Math.ceil(slideIndex / 4)
              ? "#4D7A4C"
              : "white",
        }}
      />
    ),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1.4,
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
        {children.slice(0, window.innerWidth < 1024 ? 4 : 16)}
      </Slider>
    </div>
  );
}
