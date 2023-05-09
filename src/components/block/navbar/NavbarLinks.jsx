import React from "react";
import { NavLink } from "react-router-dom";

import styles from "./index.module.scss";

const NavbarLinks = (props) => {
  const { itemsLinks } = props;
  return (
    <div className={styles.navbar_links}>
      {itemsLinks.map((item, index) => (
        <li className={styles.navbar_links_item} key={index}>
          <NavLink to={item.path}>
            <span className={styles.nabar_links_item_text}>{item.title}</span>
          </NavLink>
        </li>
      ))}
    </div>
  );
};

export default NavbarLinks;
