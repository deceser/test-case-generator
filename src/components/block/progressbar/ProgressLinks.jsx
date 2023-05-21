import React from "react";
import { HashLink } from "react-router-hash-link";

import { useProgressBar } from "../../../hooks/useProgressBar";

import styles from "./index.module.scss";

const ProgressLinks = ({ ...props }) => {
  const { progressLink, activeLink, setActiveLink } = props;

  const delayedSetActiveLink = useProgressBar(setActiveLink);

  return (
    <>
      {progressLink.map((item, index) => (
        <HashLink
          smooth
          key={index}
          to={item.path}
          className={`${styles.number} ${
            activeLink === item.title ? styles.active : ""
          } `}
          onClick={() => delayedSetActiveLink(item.title)}
        >
          {item.number}
          <div
            className={`${styles.line} ${
              activeLink === item.title ? styles.active : ""
            } `}
          />
        </HashLink>
      ))}
    </>
  );
};

export default ProgressLinks;
