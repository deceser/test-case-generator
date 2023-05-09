import React from "react";

import Header from "../../components/block/header";
import Footer from "../../components/block/footer";

import ProgressBar from "../../components/block/progressbar";

import styles from "./index.module.scss";

const DefaultLayout = ({ children, ...props }) => {
  const {} = props;
  return (
    <>
      <Header />
      <div className={styles.progress}>
        <ProgressBar />
      </div>
      <main className={styles.layout__default}>{children}</main>
      <Footer />
    </>
  );
};

export default DefaultLayout;
