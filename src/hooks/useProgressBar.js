import React from "react";

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-

// RODION

// export const useScrollTracking = (setActiveLink) => {
//   React.useEffect(() => {
//     const handleScroll = () => {
//       const generateToTopRangeByPx = document.getElementById("generate").getBoundingClientRect().top;
//       const checklistToTopRangeByPx = document.getElementById("checklist").getBoundingClientRect().top;
//       const screenHeightSizeByPx = window.screen.height;
//       // Первый условие
//       if (generateToTopRangeByPx <= screenHeightSizeByPx / 2 && !(checklistToTopRangeByPx <= screenHeightSizeByPx / 2)) {
//         setActiveLink("generate");
//       }
//       // Второй условие
//       if (checklistToTopRangeByPx <= screenHeightSizeByPx / 2) {
//         setActiveLink("checklist");
//       }
//     };

//     document.addEventListener("scroll", handleScroll);

//     return () => {
//       document.removeEventListener("scroll", handleScroll);
//     };
//   }, [setActiveLink]);
// };

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-

export const useProgressBar = (setActiveLink) => {
  const timeoutRef = React.useRef(null);

  React.useEffect(() => {
    const handleScroll = () => {
      const generateElement = document.getElementById("generate");
      const checklistElement = document.getElementById("checklist");

      if (!generateElement || !checklistElement) {
        return;
      }

      const generateToTopRangeByPx = generateElement.getBoundingClientRect().top;
      const checklistToTopRangeByPx = checklistElement.getBoundingClientRect().top;
      const screenHeightSizeByPx = window.innerHeight;

      if (generateToTopRangeByPx <= screenHeightSizeByPx / 2 && !(checklistToTopRangeByPx <= screenHeightSizeByPx / 2)) {
        console.log("sdsd");
        setActiveLink("generate");
      }

      if (checklistToTopRangeByPx < screenHeightSizeByPx / 2) {
        console.log("sds22222323d");
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
