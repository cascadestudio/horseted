"use client";
import React, { useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Carousel({ children }) {
  const [slideIndex, setSlideIndex] = useState(0);
  console.log(Math.ceil(slideIndex / 4));
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
          <li key={index} style={{ width: "144px", margin: 0, padding: 0 }}>
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
          background: i === Math.ceil(slideIndex / 4) ? "#4D7A4C" : "white",
        }}
      />
    ),
    responsive: [
      {
        breakpoint: 1720,
        settings: {
          slidesToShow: 4.4,
          slidesToScroll: 4,
        },
      },
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
    </div>
  );
}
