import React from "react";

import UserSvg from "src/assets/svg/UserSvg";
import LineSvg from "src/assets/svg/LineSvg";
import StarSvg from "src/assets/svg/StarSvg";

import SvgButton from "src/components/ui/buttons/svgbutton";
import DropDownAccount from "src/components/ui/dropDownAccount";

import styles from "./index.module.scss";

const AccountMenu = ({ children, ...props }) => {
  const { handleUser, handleToken } = props;
  return (
    <div className={styles.account}>
      <div className={styles.user}>
        <SvgButton onClick={handleUser}>
          <UserSvg />
        </SvgButton>
      </div>
      <LineSvg />
      <div className={styles.token}>
        <h4>{children}</h4>
        <SvgButton onClick={handleToken}>
          <StarSvg />
        </SvgButton>
      </div>
    </div>
  );
};

export default AccountMenu;
