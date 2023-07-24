import React from "react";

const StarSvg = (props) => {
  return (
    <svg {...props} width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 18C13.9706 18 18 13.9706 18 9C18 4.02944 13.9706 0 9 0C4.02944 0 0 4.02944 0 9C0 13.9706 4.02944 18 9 18ZM10.2629 7.26178L9 3.375L7.73711 7.26178H3.65031L6.9566 9.66394L5.69371 13.5507L9 11.1486L12.3063 13.5507L11.0434 9.66394L14.3497 7.26178H10.2629Z"
      />
    </svg>
  );
};

export default StarSvg;
