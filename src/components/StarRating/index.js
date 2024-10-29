"use client";

import StarIcon from "@/assets/icons/StarIcon";

export default function StarRating({
  className,
  review,
  showCount = true,
  size,
}) {
  if (!review) return null;

  const { count, rating } = review;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className={`flex items-center ${className}`}>
      {Array.from({ length: 5 }, (_, index) => {
        let fillPercentage = 0;
        if (index < fullStars) {
          fillPercentage = 100;
        } else if (index === fullStars && hasHalfStar) {
          fillPercentage = (rating % 1) * 100;
        }
        return (
          <StarIcon
            key={index}
            className={`h-4 w-auto lg:h-5 ${
              fillPercentage > 0 ? "text-yellow" : "text-white"
            } ${size == "sm" && "lg:h-4"}`}
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
