"use client";
import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PrevArrow from "@/assets/icons/PrevArrow";
import NextArrow from "@/assets/icons/NextArrow";
import "./product-images-carousel.css";

function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <div
      className="absolute bg-white rounded-full border border-black top-1/2 transform -translate-y-1/2 right-2 lg:top-auto lg:transform-none lg:bottom-3 lg:right-3 cursor-pointer"
      style={{
        height: "29px",
        width: "29px",
      }}
      onClick={onClick}
    >
      <NextArrow
        style={{
          position: "absolute",
          height: "12px",
          top: "7px",
          left: "10px",
          width: "auto",
        }}
      />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
    <div
      className="absolute bg-white rounded-full border border-black top-1/2 transform -translate-y-1/2 left-2 lg:top-auto lg:transform-none lg:left-auto lg:bottom-3 lg:right-[50px] z-10 cursor-pointer"
      style={{
        height: "29px",
        width: "29px",
      }}
      onClick={onClick}
    >
      <PrevArrow
        style={{
          position: "absolute",
          height: "12px",
          top: "7px",
          left: "8px",
          width: "auto",
        }}
      />
    </div>
  );
}

export default function ProductImagesCarousel({ medias }) {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);

  let sliderRef1 = useRef(null);
  let sliderRef2 = useRef(null);

  useEffect(() => {
    setNav1(sliderRef1);
    setNav2(sliderRef2);

    // if (sliderRef2.current) {
    //   const sliderElement = sliderRef2.current;
    //   sliderElement.querySelector('.slick-track').style.transform = 'translateX(-100px)';
    // }
  }, []);

  const settings = {
    nextArrow: medias.length > 1 ? <SampleNextArrow /> : null,
    prevArrow: medias.length > 1 ? <SamplePrevArrow /> : null,
    beforeChange: (current, next) => setActiveSlide(next),
  };

  return (
    <>
      <div className="flex max-w-full h-full lg:max-h-[calc(100vh_-_var(--header-height)-100px)]">
        <div className="nav-slider hidden w-fit bg-white lg:rounded-tl-[25px] lg:rounded-bl-[25px] lg:flex justify-center overflow-hidden px-3 pb-0">
          <Slider
            asNavFor={nav1}
            arrows={false}
            ref={(slider) => (sliderRef2 = slider)}
            initialSlide={0}
            slidesToShow={medias.length}
            swipeToSlide={true}
            focusOnSelect={true}
            vertical={true}
            // verticalSwiping={true}
            infinite={medias.length > 3}
            className="lg:max-h-[172px] lg:max-w-[172px] lg:flex lg:items-center lg:justify-center"
          >
            {medias.map((media, index) => (
              <div
                key={index}
                className={`cursor-pointer [&_img]:aspect-[172/172] [&_img]:rounded-lg ${
                  index === activeSlide
                    ? "[&_img]:border-4 [&_img]:border-light-green"
                    : ""
                }`}
              >
                <img
                  className="aspect-[280/340] object-cover h-full w-full"
                  src={`data:image/png;base64, ${media.base64}`}
                  alt="Image du produit"
                />
              </div>
            ))}
          </Slider>
        </div>

        <div className="w-full lg:w-2/3 main-slider [&>*]:h-full">
          <Slider
            {...settings}
            arrows={medias.length > 1 ? true : false}
            asNavFor={nav2}
            ref={(slider) => (sliderRef1 = slider)}
            className="relative h-full [&>*]:h-full"
          >
            {medias.map((media, index) => (
              <div
                className="h-full w-full [&_img]:aspect-[590/590] [&_img]:object-cover [&>*]:w-full  [&>*]:h-full"
                key={index}
              >
                <img
                  src={`data:image/png;base64, ${media.base64}`}
                  alt="Image du produit"
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
}
