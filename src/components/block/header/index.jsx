import React from "react";
import { NavLink } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getUser } from "src/redux/slices/googleAuthSlice";

import Navbar from "../navbar";
import Logo from "src/components/ui/logo";

import SmallButton from "src/components/ui/buttons/smallbutton";

import styles from "./index.module.scss";
import axios from "axios";

const Header = ({ ...props }) => {
  const dispatch = useDispatch();

  const google = async () => {
    // const res = await axios.get("https://api.qualyfid.ai/google");
    // console.log(res);
    window.location.href = "https://api.qualyfid.ai/google";
  };

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
          <SmallButton styleType="secondary" onClick={google}>
            Log in
          </SmallButton>
          <SmallButton styleType="main">Sing up</SmallButton>
        </div>
      </div>
    </header>
  );
};

export default Header;
