import React from "react";

import Header from "src/components/block/header";
import Footer from "src/components/block/footer";

import LogIn from "src/components/block/googleAuth/logIn";
import SingUp from "src/components/block/googleAuth/singUp";

import GoogleModalWrap from "src/components/block/googleAuth/GoogleModalWrap";
import NavigationBar from "src/components/block/navigation";

import styles from "./index.module.scss";

const DefaultLayout = ({ children, ...props }) => {
  const {} = props;
  const [visibleLogIn, setVisibleLogIn] = React.useState(false);
  const [visibleSingUp, setVisibleSingUp] = React.useState(false);

  const handleLogInClick = () => {
    setVisibleLogIn(true);
  };

  const handleSingUpClick = () => {
    setVisibleSingUp(true);
  };

  const isCloseModal = () => {
    setVisibleSingUp(false);
    setVisibleLogIn(false);
  };

  return (
    <>
      <GoogleModalWrap visible={visibleLogIn} setVisible={setVisibleLogIn} isCloseModal={isCloseModal}>
        <LogIn />
      </GoogleModalWrap>
      <GoogleModalWrap visible={visibleSingUp} setVisible={setVisibleSingUp} isCloseModal={isCloseModal}>
        <SingUp />
      </GoogleModalWrap>
      <Header handleLogInClick={handleLogInClick} handleSingUpClick={handleSingUpClick} />
      {/* <div className={styles.navigation}>
        <NavigationBar />
      </div> */}
      <main className={styles.layout__default}>{children}</main>
      <Footer />
    </>
  );
};

export default DefaultLayout;
