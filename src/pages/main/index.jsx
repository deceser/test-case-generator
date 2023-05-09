import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { generateChecklist } from "../../redux/slices/requirementSlice";
import { getItems } from "../../redux/slices/itemSlice";
import { useInput } from "../../hooks/useInput";

import H1Ui from "../../components/ui/fonts/h1";
import ParagraphUi from "../../components/ui/fonts/paragraph";

import TextFieldUi from "../../components/ui/requirementTextField";
import DefaultButton from "../../components/ui/buttons/defaultbutton";
import Loader from "../../components/ui/loader";

import CheckList from "../../components/block/checklist/list";

import styles from "./index.module.scss";

const MainPage = () => {
  const dispatch = useDispatch();
  const statusRequirement = useSelector((state) => state.requirement.status);
  const items = useSelector((state) => state.items.items);

  const checklistId = localStorage.getItem("checklistId");

  React.useEffect(() => {
    dispatch(getItems({ id: checklistId }));
  }, [dispatch, checklistId]);

  const useRequireInput = useInput("");

  const handleClearInput = () => {
    useRequireInput.setValue("");
  };

  const userId = "9bc8519b-b7d3-4733-cb40-08db458c0aae";

  const handleSubmitRequirementText = () => {
    dispatch(generateChecklist({ data: useRequireInput.value, userId }));
    handleClearInput();
  };

  return (
    <>
      <div className={styles.main__page}>
        <div id="generate" className={styles.generateblock}>
          <div className={styles.left}>
            <div>
              <H1Ui>Test Case</H1Ui>
              <H1Ui>Generator</H1Ui>
            </div>
            <div>
              <ParagraphUi>
                Easily generate and export checklists and test cases. Get more
                relevant results by entering all the required data. Find more
                information about &nbsp;
                <NavLink>how it works</NavLink>
              </ParagraphUi>
            </div>
          </div>
          <div className={styles.right}>
            <TextFieldUi
              handleClearInput={handleClearInput}
              value={useRequireInput.value}
              onChange={useRequireInput.onChange}
            />
            <DefaultButton
              onClick={handleSubmitRequirementText}
              disabled={useRequireInput.value.length < 5}
              styleType="main"
            >
              Generate checklist
            </DefaultButton>
          </div>
        </div>
        {statusRequirement === "loading" ? (
          <Loader />
        ) : items.length ? (
          <div id="checklist" className={styles.checklistblock}>
            <CheckList checklistId={checklistId} />
            <DefaultButton disabled={true} styleType="main">
              Generate test cases
            </DefaultButton>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default MainPage;
