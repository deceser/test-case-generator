import React from "react";

import DefaultButton from "../../components/ui/buttons/defaultbutton";
import SmallButtom from "../../components/ui/buttons/smallbutton";
import SvgButton from "../../components/ui/buttons/svgbutton";
import TextButton from "../../components/ui/buttons/textbutton";

import H1Ui from "../../components/ui/fonts/h1";
import ParagraphUi from "../../components/ui/fonts/paragraph";

import TextFieldUi from "../../components/ui/requirementTextField";
import ProgressBar from "../../components/block/progressbar";

import CheckList from "../../components/block/checklist/list";
import ItemUi from "../../components/ui/ChecklistItemUI";

import CloseSvg from "../../assets/svg/CloseSvg";
import PlusSvg from "../../assets/svg/PlusSvg";
import EyeSvg from "../../assets/svg/EyeSvg";
import CheckBoxUi from "../../components/ui/checkbox";

import styles from "./index.module.scss";

const UiPage = () => {
  return (
    <div className={styles.ui__page}>
      <div className={styles.buttons}>
        <DefaultButton styleType="main">Generate checklist</DefaultButton>
        <DefaultButton styleType="secondary">Generate checklist</DefaultButton>
        <SmallButtom styleType="main">Sing Up</SmallButtom>
        <SmallButtom styleType="secondary">Log in</SmallButtom>
        <SvgButton>
          <CloseSvg />
        </SvgButton>
        <TextButton styleType="visible" icon={<PlusSvg />}>
          Add your item
        </TextButton>
        <TextButton styleType="visible" icon={<EyeSvg />}>
          Show disabled
        </TextButton>
      </div>
      <div className={styles.fonts}>
        <H1Ui>Test Case Generator</H1Ui>
        <ParagraphUi>
          Easily generate and export checklists and test cases. Get more
          relevant results by entering all the required data. Find more
          information about
        </ParagraphUi>
      </div>
      <div>
        <CheckBoxUi />
      </div>
      <div>
        <TextFieldUi />
      </div>
      <div>{/* <ItemUi /> */}</div>
      <div>{/* <CheckList /> */}</div>
    </div>
  );
};

export default UiPage;
