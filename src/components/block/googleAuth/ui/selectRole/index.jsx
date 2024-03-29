import React from "react";

import { roles } from "src/utils/data/selectRoles/roles";

import SvgButton from "src/components/ui/buttons/svgbutton";
import ArrowUpSvg from "src/assets/svg/ArrowUpSvg";
import ArrowDownSvg from "src/assets/svg/ArrowDownSvg";

import styles from "./index.module.scss";

const SelectRole = () => {
  const [open, setOpen] = React.useState(false);
  const [selectedProfession, setSelectedProfession] = React.useState(null);

  const click = () => {
    setOpen(!open);
  };

  const handleProfessionSelect = (profession) => {
    setSelectedProfession(profession);
    setOpen(false);
  };

  return (
    <div className={styles.dropdown}>
      <div onClick={click} className={styles.dropdownBtn}>
        <span> {selectedProfession ? selectedProfession : "Select your profession"}</span>
        <span className={`${styles.arrow} ${open ? styles.rotateUp : styles.rotateDown}`}>
          <SvgButton onClick={click}>{open ? <ArrowUpSvg /> : <ArrowDownSvg />}</SvgButton>
        </span>
      </div>

      <ul className={open ? styles.dropdownContent : styles.dropdownContent_hidden}>
        {roles.map((profession) => (
          <li key={profession} onClick={() => handleProfessionSelect(profession)}>
            {profession}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelectRole;
