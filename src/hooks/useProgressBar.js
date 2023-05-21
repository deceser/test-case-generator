import React from "react";

export const useProgressBar = (setActiveLink) => {
  const timeoutRef = React.useRef(null);

  React.useEffect(() => {
    const handleScroll = () => {
      const generateElement = document.getElementById("generate");
      const checklistElement = document.getElementById("checklist");

      if (!generateElement || !checklistElement) {
        return;
      }

      const generateToTopRangeByPx =
        generateElement.getBoundingClientRect().top;
      const checklistToTopRangeByPx =
        checklistElement.getBoundingClientRect().top;
      const screenHeightSizeByPx = window.innerHeight;

      if (generateToTopRangeByPx < screenHeightSizeByPx / 3) {
        setActiveLink("generate");
      }

      if (checklistToTopRangeByPx < screenHeightSizeByPx / 3) {
        setActiveLink("checklist");
      }
    };

    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [setActiveLink]);

  const delayedSetActiveLink = (title) => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setActiveLink(title);
    }, 1000);
  };

  return delayedSetActiveLink;
};
