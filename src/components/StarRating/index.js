"use client";

import StarIcon from "@/assets/icons/StarIcon";

export default function StarRating({ className, rating, count }) {
  console.log(rating, count);
  return (
    <div className={`flex items-center ${className}`}>
      {Array.from({ length: 5 }, (_, index) => (
        <StarIcon
          key={index}
          className={`h-4 w-auto lg:h-6 ${
            index < rating ? "text-yellow" : "text-white"
          }`}
        />
      ))}
      <span className="text-sm lg:text-base ml-2">({count})</span>
    </div>
  );
}
