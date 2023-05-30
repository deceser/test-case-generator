import React from "react";

import GoogleButton from "../ui/googleButton";

import styles from "./index.module.scss";

const LogIn = () => {
  return (
    <div className={styles.login}>
      <h3>Log in</h3>
      <div>
        <GoogleButton>Continue with Google</GoogleButton>
      </div>
      <div>login</div>
    </div>
  );
};

export default LogIn;
