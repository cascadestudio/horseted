"use client";
import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import PrevArrow from "@/assets/icons/PrevArrow.svg";
import NextArrow from "@/assets/icons/NextArrow.svg";

function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <div
      className="absolute bg-white rounded-full border border-black bottom-4 right-3"
      style={{
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
  const { onClick } = props;
  return (
    <div
      className="absolute bg-white rounded-full border border-black bottom-4 right-[50px] z-10"
      style={{
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
      <div className="flex max-w-[800px] max-h-[calc(100vh_-_var(--header-height)-120px)]">
        <div className="w-1/3 flex justify-center overflow-hidden p-4 pb-0">
          <Slider
            asNavFor={nav1}
            arrows={false}
            ref={(slider) => (sliderRef2 = slider)}
            initialSlide={0}
            slidesToShow={3.2}
            swipeToSlide={true}
            focusOnSelect={true}
            vertical={true}
            verticalSwiping={true}
            variableWidth={true}
            className="h-[172px] w-[172px] flex items-center justify-center"
          >
            {children.map((child, index) => (
              <div
                className="[&_img]:aspect-[172/172] [&_img]:rounded-lg "
                key={index}
              >
                {child}
              </div>
            ))}
          </Slider>
        </div>

        <div className="w-2/3 [&>*]:h-full">
          <Slider
            {...settings}
            asNavFor={nav2}
            ref={(slider) => (sliderRef1 = slider)}
            className="relative h-full [&>*]:h-full"
          >
            {children.map((child, index) => (
              <div
                className="h-full w-full max-h-[590px] [&_img]:rounded-tr-[25px] [&_img]:rounded-br-[25px] [&>*]:w-full  [&>*]:h-full"
                key={index}
              >
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
