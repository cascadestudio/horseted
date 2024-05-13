"use client";
import Image from "next/image";
import React, { useState } from "react";
import Slider from "react-slick";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config.js";
import HeroImage1 from "@/assets/images/heroImage1.jpg";
import HeroImagesMask from "@/assets/images/HeroImagesMask.png";

export default function HeroCarousel() {
  const fullConfig = resolveConfig(tailwindConfig);
  const parseBreakpoint = (breakpoint) => {
    return parseInt(breakpoint.replace("px", ""), 10);
  };
  const lgBreakpoint = parseBreakpoint(fullConfig.theme.screens.lg);
  const [slideIndex, setSlideIndex] = useState(0);
  const settings = {
    arrows: false,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (current, next) => setSlideIndex(next),
    responsive: [
      {
        breakpoint: lgBreakpoint,
        settings: {
          dots: false,
        },
      },
    ],
    customPaging: (i) => {
      return (
        <div
          style={{
            width: "36px",
            height: "4px",
            background: i === slideIndex ? "white" : "rgba(255, 255, 255, 0.3)",
          }}
        ></div>
      );
    },
    appendDots: (dots) => (
      <ul
        style={{
          position: "absolute",
          bottom: "35px",
          display: "flex",
          gap: "12px",
          justifyContent: "end",
          paddingRight: "45px",
        }}
      >
        {dots}
      </ul>
    ),
  };
  return (
    <div className="slider-container relative">
      <Slider {...settings}>
        <div className="relative">
          <Image
            src={HeroImage1}
            alt="hero image 1"
            className="w-full object-cover h-[calc(100vh-134px)]"
          />
          <Image
            src={HeroImagesMask}
            alt="hero images mask"
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        </div>
        <div className="relative">
          <Image
            src={HeroImage1}
            alt="hero image 1"
            className="w-full object-cover h-[calc(100vh-134px)]"
          />
          <Image
            src={HeroImagesMask}
            alt="hero images mask"
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        </div>
        <div className="relative">
          <Image
            src={HeroImage1}
            alt="hero image 1"
            className="w-full object-cover h-[calc(100vh-134px)]"
          />
          <Image
            src={HeroImagesMask}
            alt="hero images mask"
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        </div>
      </Slider>
    </div>
  );
}
