"use client";
import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import PrevArrow from "@/assets/icons/PrevArrow.svg";
import NextArrow from "@/assets/icons/NextArrow.svg";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        position: "absolute",
        top: "576px",
        right: "10px",
        background: "white",
        borderRadius: "100%",
        border: "1px solid black",
        height: "29px",
        width: "29px",
      }}
      onClick={onClick}
    >
      <Image
        style={{
          position: "absolute",
          height: "12px",
          top: "7px",
          left: "10px",
        }}
        src={NextArrow}
        alt="Suivant"
      />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "absolute",
        top: "576px",
        left: "455px",
        background: "white",
        zIndex: 1,
        borderRadius: "100%",
        border: "1px solid black",
        height: "29px",
        width: "29px",
      }}
      onClick={onClick}
    >
      <Image
        style={{
          position: "absolute",
          height: "12px",
          top: "7px",
          left: "8px",
        }}
        src={PrevArrow}
        alt="Precedent"
      />
    </div>
  );
}

export default function ProductImagesCarousel({ children }) {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  let sliderRef1 = useRef(null);
  let sliderRef2 = useRef(null);
  useEffect(() => {
    setNav1(sliderRef1);
    setNav2(sliderRef2);
  }, []);
  const settings = {
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <>
      <div className="flex max-w-[800px]">
        <div className="w-1/3 p-4 overflow-hidden h-[600px]">
          <Slider
            asNavFor={nav1}
            ref={(slider) => (sliderRef2 = slider)}
            initialSlide={0}
            slidesToShow={3.1}
            swipeToSlide={true}
            focusOnSelect={true}
            vertical={true}
            verticalSwiping={true}
            variableWidth={true}
          >
            {children.map((child, index) => (
              <div key={index}>{child}</div>
            ))}
          </Slider>
        </div>

        <div className="w-2/3 h-[600px] [&>*]:h-full">
          <Slider
            {...settings}
            asNavFor={nav2}
            ref={(slider) => (sliderRef1 = slider)}
            className="relative h-full [&>*]:h-full"
          >
            {children.map((child, index) => (
              <div className="h-full [&>*]:h-full" key={index}>
                {child}
              </div>
            ))}
          </Slider>
        </div>
      </div>
      <style>{`
        .slick-track {
          height: 100%;
        }
        .slick-slide > div {
          height: 100%;
        }
      `}</style>
    </>
  );
}
