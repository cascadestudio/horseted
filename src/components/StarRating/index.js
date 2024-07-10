"use client";

import StarIcon from "@/assets/icons/StarIcon";

export default function StarRating({
  className,
  rating,
  count,
  showCount = true,
}) {
  const fullStars = Math.floor(rating);
  console.log("Full stars:", fullStars);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className={`flex items-center ${className}`}>
      {Array.from({ length: 5 }, (_, index) => {
        let fillPercentage = 0;
        if (index < fullStars) {
          fillPercentage = 100;
        } else if (index === fullStars && hasHalfStar) {
          fillPercentage = (rating % 1) * 100;
          console.log("Fill percentage:", fillPercentage);
        }
        return (
          <StarIcon
            key={index}
            className={`h-4 w-auto lg:h-6 ${
              fillPercentage > 0 ? "text-light-yellow" : "text-white"
            }`}
            fillPercentage={fillPercentage}
          />
        );
      })}
      {showCount && (
        <span className="text-sm lg:text-base ml-2">({count})</span>
      )}
    </div>
  );
}
