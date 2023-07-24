import React from "react";
import { NavLink } from "react-router-dom";

import AccountMenu from "src/components/ui/accountMenu";
import ParagraphUi from "src/components/ui/fonts/paragraph";
import LinePopover from "src/assets/svg/linePopover";
import SmallButton from "src/components/ui/buttons/smallbutton";

import styles from "./index.module.scss";

const Popover = () => {
  const [isUser, setIsUser] = React.useState(false);
  const [isToken, setIsToken] = React.useState(false);
  const popoverRef = React.useRef(null);

  const handleUser = () => {
    setIsUser(!isUser);
    setIsToken(false);
  };

  const handleToken = () => {
    setIsToken(!isToken);
    setIsUser(false);
  };

  const handleClickOutside = (event) => {
    if (popoverRef.current && !popoverRef.current.contains(event.target)) {
      setIsUser(false);
      setIsToken(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.popoverContainer} ref={popoverRef}>
      <AccountMenu handleUser={handleUser} handleToken={handleToken}>
        100
      </AccountMenu>
      {isUser && (
        <div className={styles.popover}>
          <ParagraphUi>my.email@gmail.com</ParagraphUi>
          <LinePopover />
          <NavLink to="/">My History</NavLink>
          <NavLink>Log Out</NavLink>
        </div>
      )}

      {isToken && (
        <div className={styles.popover}>
          <ParagraphUi>my.email@gmail.com</ParagraphUi>
          <LinePopover />
          <SmallButton styleType="main">Purchase</SmallButton>
        </div>
      )}
    </div>
  );
};

export default Popover;
