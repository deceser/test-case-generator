import React from "react";

import styles from "./GoogleModalWrap.module.scss";

const GoogleModalWrap = ({ children, ...props }) => {
  const { isCloseModal, setVisible } = props;

  const visibleClass = [styles.modalui];

  // if (setVisible) {
  //   visibleClass.push(styles.active);
  // } else if (setVisible === false) {
  //   visibleClass.push(styles.closed);
  // }

  return (
    <div className={[styles.modalui, styles.active].join(" ")}>
      <div className={styles.container}>
        <div className={styles.modalContent}>{children}</div>
        <button>CLODS</button>
      </div>
    </div>
  );
};

export default GoogleModalWrap;
