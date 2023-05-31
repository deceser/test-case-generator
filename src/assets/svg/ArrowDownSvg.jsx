import React from "react";

const ArrowDownSvg = () => {
  return (
    <svg width="16" height="8" viewBox="0 0 16 8" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_b_1016_326)">
        <path d="M8 8L15.7942 0.5H0.205771L8 8Z" fill="white" fillOpacity="0.6" />
      </g>
      <defs>
        <filter id="filter0_b_1016_326" x="-99.7949" y="-99.5" width="215.59" height="207.5" filterUnits="userSpaceOnUse">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImageFix" stdDeviation="50" />
          <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_1016_326" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_1016_326" result="shape" />
        </filter>
      </defs>
    </svg>
  );
};

export default ArrowDownSvg;
