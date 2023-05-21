import React from "react";
import { NavLink } from "react-router-dom";

import Navbar from "../navbar";
import Logo from "../../ui/logo";

import SmallButton from "../../ui/buttons/smallbutton";

import styles from "./index.module.scss";

const Header = ({ ...props }) => {
  return (
    <header id="generate" className={styles.header__wrapper}>
      <div className={styles.header}>
        <div className={styles.header__left}>
          <NavLink to="/">
            <Logo />
          </NavLink>
          <Navbar />
        </div>
        <div className={styles.header__right}>
          <SmallButton styleType="secondary">Log in</SmallButton>
          <SmallButton styleType="main">Sing up</SmallButton>
        </div>
      </div>
    </header>
  );
};

export default Header;
