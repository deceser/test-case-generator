import React from "react";

const ErrorDoWorkPlease = (props) => {
  return (
    <div>
      {props.itemsErrors.filter((x) => {
        return x.id === props.itemId;
      })}
    </div>
  );
};

export default ErrorDoWorkPlease;
