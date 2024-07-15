"use client";
import React, { useEffect, useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../../tailwind.config.js";

export default function ProductsCarousel({ children, cardType }) {
  const fullConfig = resolveConfig(tailwindConfig);
  const parseBreakpoint = (breakpoint) => {
    return parseInt(breakpoint.replace("px", ""), 10);
  };
  const xxlBreakpoint = parseBreakpoint(fullConfig.theme.screens["2xl"]);
  const xlBreakpoint = parseBreakpoint(fullConfig.theme.screens.xl);
  const lgBreakpoint = parseBreakpoint(fullConfig.theme.screens.lg);
  const smBreakpoint = parseBreakpoint(fullConfig.theme.screens.sm);
  const [isMdScreen, setIsMdScreen] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMdScreen(window.innerWidth < lgBreakpoint);
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
    slidesToShow: cardType === "article" ? 3.6 : 4.2,
    slidesToScroll: cardType === "article" ? 1 : 4,
    appendDots: (dots) => (
      <ul>
        {dots.map((dot, index) => (
          <li
            key={index}
            style={{
              width: isMdScreen ? "33px" : "118px",
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
            isMdScreen || cardType === "article"
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
        breakpoint: xxlBreakpoint,
        settings: {
          slidesToShow: cardType === "article" ? 3.2 : 4.2,
          slidesToScroll: cardType === "article" ? 1 : 4,
        },
      },
      {
        breakpoint: xlBreakpoint,
        settings: {
          slidesToShow: cardType === "article" ? 2.6 : 4.2,
          slidesToScroll: cardType === "article" ? 1 : 4,
        },
      },
      {
        breakpoint: lgBreakpoint,
        settings: {
          slidesToShow: cardType === "article" ? 1.6 : 3.2,
          slidesToScroll: cardType === "article" ? 1 : 4,
        },
      },
      {
        breakpoint: smBreakpoint,
        settings: {
          slidesToShow: cardType === "article" ? 1 : 1.2,
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
        {children.slice(0, isMdScreen ? 4 : cardType === "article" ? 6 : 16)}
      </Slider>
    </div>
  );
}
