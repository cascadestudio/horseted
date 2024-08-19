import React from "react";

export default function Radio({ value, checked, onChange, className }) {
  return (
    <div className={className}>
      <span className="h-5 w-5 rounded-full border border-black flex items-center justify-center">
        {checked && (
          <span className="h-3 w-3 rounded-full bg-light-green"></span>
        )}
      </span>
      <input
        className="hidden"
        type="radio"
        value={value || false}
        checked={checked}
        onChange={onChange}
      />
    </div>
  );
}
