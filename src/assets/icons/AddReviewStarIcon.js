"use client";

export default function AddReviewStarIcon({ className, onClick }) {
  return (
    <svg
      onClick={onClick}
      width="61"
      height="58"
      viewBox="0 0 61 58"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M29.7989 0.927051C30.0983 0.0057404 31.4017 0.0057404 31.7011 0.927051L38.1028 20.6297C38.2367 21.0417 38.6207 21.3207 39.0539 21.3207L59.7705 21.3207C60.7392 21.3207 61.142 22.5603 60.3583 23.1297L43.5982 35.3066C43.2477 35.5612 43.101 36.0126 43.2349 36.4246L49.6367 56.1273C49.9361 57.0486 48.8816 57.8147 48.0979 57.2453L31.3378 45.0684C30.9873 44.8138 30.5127 44.8138 30.1622 45.0684L13.4021 57.2453C12.6184 57.8147 11.564 57.0486 11.8633 56.1273L18.2651 36.4246C18.399 36.0126 18.2523 35.5612 17.9018 35.3066L1.14174 23.1297C0.358027 22.5603 0.760803 21.3207 1.72953 21.3207L22.4461 21.3207C22.8793 21.3207 23.2633 21.0417 23.3972 20.6297L29.7989 0.927051Z" />
    </svg>
  );
}
