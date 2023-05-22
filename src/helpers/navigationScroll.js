import React from "react";
import { useSelector } from "react-redux";

export const navigationScroll = () => {
  const statusfull = useSelector((state) => state.requirement.status);

  if (statusfull === "success") {
    window.location.hash = "checklist";
  }
};
