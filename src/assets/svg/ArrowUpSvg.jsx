import React from "react";

const ArrowSvg = () => {
  return (
    <svg width="16" height="8" viewBox="0 0 16 8" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_b_1016_15981)">
        <path d="M8 0L15.7942 7.5H0.205771L8 0Z" fill="white" fillOpacity="0.2" />
      </g>
      <defs>
        <filter
          id="filter0_b_1016_15981"
          x="-99.7949"
          y="-100"
          width="215.59"
          height="207.5"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImageFix" stdDeviation="50" />
          <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_1016_15981" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_backgroundBlur_1016_15981"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default ArrowSvg;
