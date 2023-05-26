import React from "react";

import NavbarLinks from "./NavbarLinks";
import { navbarLinks } from "src/utils/data/navbar/navbarLinks";

import styles from "./index.module.scss";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_wrap}>
        <NavbarLinks itemsLinks={navbarLinks} />
      </div>
    </nav>
  );
};

export default Navbar;
