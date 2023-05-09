import React from "react";
import { HashLink } from "react-router-hash-link";

import styles from "./index.module.scss";

const ProgressLinks = ({ ...props }) => {
  const { progressLink, activeLink, setActiveLink } = props;

  return (
    <>
      {progressLink.map((item, index) => (
        <HashLink
          smooth
          key={index}
          to={item.path}
          className={`${styles.number} ${
            activeLink === item.title ? styles.active : ""
          }`}
          onClick={() => setActiveLink(item.title)}
        >
          {item.number}
          <div
            className={`${styles.line__one} ${
              activeLink === item.title ? styles.active : ""
            }`}
            onClick={() => setActiveLink(item.title)}
          />
        </HashLink>
      ))}
    </>
  );
};

export default ProgressLinks;
