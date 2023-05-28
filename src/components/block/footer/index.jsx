import React from "react";

import Logo from "src/components/ui/logo";

import TwitterSvg from "src/assets/svg/TwitterSvg";
import FacebookSvg from "src/assets/svg/FacebookSvg";
import InstagramSvg from "src/assets/svg/InstagramSvg";

import styles from "./index.module.scss";

const Footer = ({ ...props }) => {
  const {} = props;
  return (
    <footer className={styles.footer__wrapper}>
      <div className={styles.footer}>
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
      </div>
    </footer>
  );
};

export default Footer;
