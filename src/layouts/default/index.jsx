import React from "react";

import Header from "src/components/block/header";
import Footer from "src/components/block/footer";

import NavigationBar from "src/components/block/navigation";

import styles from "./index.module.scss";

const DefaultLayout = ({ children, ...props }) => {
  const {} = props;
  return (
    <>
      <Header />
      <div className={styles.navigation}>
        <NavigationBar />
      </div>
      <main className={styles.layout__default}>{children}</main>
      <Footer />
    </>
  );
};

export default DefaultLayout;
