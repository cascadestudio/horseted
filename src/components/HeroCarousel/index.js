"use client";
import Image from "next/image";
import React, { useState } from "react";
import Slider from "react-slick";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../../tailwind.config.js";
import heroImage1 from "@/assets/images/heroImage1.jpg";
import heroImage2 from "@/assets/images/heroImage2.jpg";
import heroImage3 from "@/assets/images/heroImage3.jpg";

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
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
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
    <div className="slider-container relative h-[calc(100vh-var(--header-height))] ">
      <Slider {...settings}>
        <div className="relative">
          <Image
            src={heroImage1}
            alt="hero image 1"
            priority
            sizes="100vh"
            className="w-full h-[calc(100vh-var(--header-height))] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent via-30% to-black/70 lg:hidden"></div>
          <div className="hidden lg:block lg:absolute lg:inset-0 lg:via-transparent lg:via-70% lg:bg-gradient-to-tr lg:from-black/70 lg:to-transparent"></div>
        </div>
        <div className="relative">
          <Image
            src={heroImage2}
            alt="hero image 2"
            sizes="100vh"
            className="w-full h-[calc(100vh-var(--header-height))] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent via-30% to-black/70 lg:hidden"></div>
          <div className="hidden lg:block lg:absolute lg:inset-0 lg:via-transparent lg:via-70% lg:bg-gradient-to-tr lg:from-black/70 lg:to-transparent"></div>
        </div>
        <div className="relative">
          <Image
            src={heroImage3}
            alt="hero image 3"
            sizes="100vh"
            className="w-full h-[calc(100vh-var(--header-height))] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent via-30% to-black/70 lg:hidden"></div>
          <div className="hidden lg:block lg:absolute lg:inset-0 lg:via-transparent lg:via-70% lg:bg-gradient-to-tr lg:from-black/70 lg:to-transparent"></div>
        </div>
      </Slider>
    </div>
  );
}
