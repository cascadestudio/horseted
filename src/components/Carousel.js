"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Carousel({ children }) {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
  };
  return <Slider {...settings}>{children}</Slider>;
}
