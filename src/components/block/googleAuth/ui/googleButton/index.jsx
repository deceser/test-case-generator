import React from "react";

import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { getUser } from "src/redux/slices/googleAuthSlice";

import GoogleIcon from "src/assets/image/GoogleIcon.png";

import styles from "./index.module.scss";

const GoogleButton = ({ children, ...props }) => {
  const {} = props;

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
    <button className={styles.googlebutton} onClick={google}>
      <span>
        <img src={GoogleIcon} alt="google" />
      </span>
      {children}
    </button>
  );
};

export default GoogleButton;
