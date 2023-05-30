import React from "react";

import SvgButton from "src/components/ui/buttons/svgbutton";
import CloseSvg from "src/assets/svg/CloseSvg";

import styles from "./GoogleModalWrap.module.scss";

const GoogleModalWrap = ({ children, ...props }) => {
  const { visible, isCloseModal, setVisible } = props;

  const visibleClass = [styles.modalui];

  if (visible) {
    visibleClass.push(styles.active);
  }

  return (
    <div className={visibleClass.join(" ")}>
      <div className={styles.container}>
        <div>{children}</div>
        <div className={styles.close}>
          <SvgButton onClick={isCloseModal}>
            <CloseSvg />
          </SvgButton>
        </div>
      </div>
    </div>
  );
};

export default GoogleModalWrap;
