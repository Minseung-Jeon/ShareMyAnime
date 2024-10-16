import React from "react";

import styles from "./SplitScreenLayout.module.css";

function SplitScreenLayout({ leftContent, rightContent }) {
  return (
    <div className={styles.splitScreenContainer}>
      <div className={styles.leftSection}>{leftContent}</div>
      <div className={styles.rightSection}>{rightContent}</div>
    </div>
  );
}

export default SplitScreenLayout;
