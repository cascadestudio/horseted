"use client";
import React, { useEffect, useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config.js";

export default function ProductsCarousel({ children }) {
  const fullConfig = resolveConfig(tailwindConfig);
  const parseBreakpoint = (breakpoint) => {
    return parseInt(breakpoint.replace("px", ""), 10);
  };
  const lgBreakpoint = parseBreakpoint(fullConfig.theme.screens.lg);
  const [isSmScreen, setIsSmScreen] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsSmScreen(window.innerWidth < lgBreakpoint);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
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
              width: isSmScreen ? "33px" : "118px",
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
          background: isSmScreen
            ? i === Math.ceil(slideIndex)
              ? fullConfig.theme.colors["light-green"]
              : "white"
            : i === Math.ceil(slideIndex / 4)
            ? fullConfig.theme.colors["light-green"]
            : "white",
        }}
      />
    ),
    responsive: [
      {
        breakpoint: lgBreakpoint,
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
        {children.slice(0, isSmScreen ? 4 : 16)}
      </Slider>
    </div>
  );
}
