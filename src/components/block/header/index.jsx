import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { getUser } from "src/redux/slices/googleAuthSlice";

import Navbar from "../navbar";
import Logo from "src/components/ui/logo";

import SmallButton from "src/components/ui/buttons/smallbutton";

import styles from "./index.module.scss";

const Header = ({ ...props }) => {
  const dispatch = useDispatch();
  const [targetPath, setTargetPath] = React.useState("");
  const navigate = useNavigate();

  const google = async () => {
    // const res = await axios.get("https://api.qualyfid.ai/google");
    // console.log(res);
    // window.location.href = "https://api.qualyfid.ai/google";

    setTargetPath("http://localhost:5173/");

    // Выполняете запрос к API Google для авторизации
    try {
      window.location.href = "https://api.qualyfid.ai/google";

      // Здесь должна быть логика обработки успешной авторизации

      // Перенаправление на целевой путь после успешной авторизации
      navigate(targetPath);
    } catch (error) {
      // Обработка ошибки авторизации
      console.error(error);
    }
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
