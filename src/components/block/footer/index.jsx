import React from "react";

import Logo from "../../ui/logo";

import TwitterSvg from "../../../assets/svg/TwitterSvg";
import FacebookSvg from "../../../assets/svg/FacebookSvg";
import InstagramSvg from "../../../assets/svg/InstagramSvg";

import styles from "./index.module.scss";

const Footer = ({ ...props }) => {
  const {} = props;
  return (
    <footer className={styles.footer}>
      <div className={styles.footer_up}>
        <div className={styles.footer_up_left}>
          <Logo />
        </div>
        <div className={styles.footer_up_right}>
          <a href="">
            <TwitterSvg />
          </a>
          <a href="">
            <FacebookSvg />
          </a>
          <a href="">
            <InstagramSvg />
          </a>
        </div>
      </div>
      <div className={styles.footer_bottom}>
        <h4>© 2023. All Rights Reserved </h4>
        <h4>Terms of service | Privacy policy</h4>
      </div>
    </footer>
  );
};

export default Footer;
