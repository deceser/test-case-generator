import React from "react";
import { NavLink } from "react-router-dom";

import Navbar from "../navbar";
import Logo from "src/components/ui/logo";

import SmallButton from "src/components/ui/buttons/smallbutton";

import styles from "./index.module.scss";

const Header = ({ ...props }) => {
  const { handleLogInClick, handleSingUpClick } = props;

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
          <SmallButton styleType="secondary" onClick={handleLogInClick}>
            Log in
          </SmallButton>
          <SmallButton styleType="main" onClick={handleSingUpClick}>
            Sing up
          </SmallButton>
        </div>
      </div>
    </header>
  );
};

export default Header;
