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
  const xlBreakpoint = parseBreakpoint(fullConfig.theme.screens.xl);
  const lgBreakpoint = parseBreakpoint(fullConfig.theme.screens.lg);
  const smBreakpoint = parseBreakpoint(fullConfig.theme.screens.sm);
  const [isLgScreen, setIsLgScreen] = useState(false);
  const [isMdScreen, setIsMdScreen] = useState(false);
  const [isSmScreen, setIsSmScreen] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsLgScreen(window.innerWidth < xlBreakpoint);
      setIsMdScreen(window.innerWidth < lgBreakpoint);
      setIsSmScreen(window.innerWidth < smBreakpoint);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const [slideIndex, setSlideIndex] = useState(0);
  let sliderRef = useRef(null);

  const getSlidesToShow = () => {
    if (cardType === "article") {
      return 2.2;
    } else if (cardType === "product") {
      return 4.2;
    }
    return 4.2;
  };

  const getSlidesToScroll = () => {
    if (cardType === "article") {
      return 1;
    } else if (cardType === "product") {
      return 4;
    }
    return 4;
  };

  var settings = {
    arrows: false,
    dots: true,
    infinite: false,
    speed: 500,
    beforeChange: (current, next) => setSlideIndex(next),
    initialSlide: 0,
    slidesToShow: getSlidesToShow(),
    slidesToScroll: getSlidesToScroll(),
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
          background: isMdScreen
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
          slidesToShow: 2.2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: smBreakpoint,
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
        {children.slice(0, isMdScreen ? 4 : 16)}
      </Slider>
    </div>
  );
}
