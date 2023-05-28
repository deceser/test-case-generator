import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { generateChecklist } from "src/redux/slices/requirementSlice";
import { getItems } from "src/redux/slices/itemSlice";
import { useInput } from "src/hooks/useInput";

import { useFilterItems } from "src/hooks/useFilterItems";
import { useValidation } from "src/hooks/useValidation";

import { downloadCVS } from "src/helpers/downloadFile";
import { validationRuleRequirementInput } from "src/utils/validation/fields";

import H1Ui from "src/components/ui/fonts/h1";
import H3Ui from "src/components/ui/fonts/h3";
import ParagraphUi from "src/components/ui/fonts/paragraph";

import TextFieldUi from "src/components/ui/requirementTextField";
import DefaultButton from "src/components/ui/buttons/defaultbutton";
import TextButton from "src/components/ui/buttons/textbutton";
import ExportSvg from "src/assets/svg/ExportSvg";

import Loader from "src/components/ui/loader";

import CheckList from "src/components/block/checklist/list";

import styles from "./index.module.scss";

const MainPage = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items.items);
  const statusRequirement = useSelector((state) => state.requirement.status);

  const checklistId = localStorage.getItem("checklistId");

  React.useEffect(() => {
    if (checklistId) {
      dispatch(getItems({ id: checklistId }));
    }
  }, [dispatch, checklistId]);

  const [showItem, setShowItem] = React.useState(true);
  const refRequireInput = React.useRef(null);

  const filteredItems = useFilterItems(showItem, items);
  const useRequireInput = useInput("");
  const { errorMessages, validateRule, isDirty, setIsDirty, isSpecialCondition, setSpecialCondition, resetErrors } =
    useValidation(validationRuleRequirementInput);

  const handleClearInput = () => {
    useRequireInput.clearInput();
    resetErrors();
  };

  const doValidation = (event) => {
    useRequireInput.onChange(event);
    const updatedValue = event.target.value;
    if (!isDirty && !isSpecialCondition) return;
    validateRule(updatedValue);
  };

  const handleRequirementInputFocus = (event) => {
    setIsDirty(true);
  };

  const handleRequirementInputChange = (event) => {
    useRequireInput.onChange(event);
    if ((isSpecialCondition && event.target.value.length < 2500) || (isSpecialCondition && event.target.value.length > 5)) {
      if (!isSpecialCondition) setSpecialCondition(true);
      doValidation(event);
    }
  };

  const handleRequirementInputBlur = (event) => {
    useRequireInput.onChange(event);
    if (event.target.value.length < 1) return;
    setSpecialCondition(true);
    doValidation(event);
  };

  const shouldDisplayError = () => {
    return isDirty;
  };

  const userId = "9bc8519b-b7d3-4733-cb40-08db458c0aae";

  const handleSubmitRequirementText = () => {
    if (useRequireInput.value.length < 5 || useRequireInput.value.length > 2500) {
      setIsDirty(true);
      setSpecialCondition(true);
      validateRule(useRequireInput.value);
    } else {
      dispatch(generateChecklist({ data: useRequireInput.value, userId }));
    }
    setTimeout(() => {
      refRequireInput.current.focus();
    });
  };

  const toggleShowItem = () => {
    setShowItem(!showItem);
  };

  const handleDownload = () => {
    downloadCVS(filteredItems, checklistId);
  };

  const statusActiveItems = items.every((item) => item.isActive === false);

  return (
    <div className={styles.main__page}>
      <div className={styles.generateblock}>
        <div className={styles.left}>
          <div>
            <H1Ui>Test Case</H1Ui>
            <H1Ui>Generator</H1Ui>
          </div>
          <div>
            <ParagraphUi>
              Easily generate and export checklists and test cases. &nbsp; Get more relevant results by entering all the required
              data. Find more information about &nbsp;
              <NavLink>how it works</NavLink>
            </ParagraphUi>
          </div>
        </div>
        <div className={styles.right}>
          <TextFieldUi
            disabled={statusRequirement === "loading" || items.length}
            handleClearInput={handleClearInput}
            value={useRequireInput.value}
            onChange={handleRequirementInputChange}
            onBlur={handleRequirementInputBlur}
            onFocus={handleRequirementInputFocus}
            placeholder="Enter your requirements..."
            refRequireInput={refRequireInput}
            error={
              shouldDisplayError() &&
              errorMessages.map((errorMessage, index) => <React.Fragment key={index}>{errorMessage}</React.Fragment>)
            }
          />
          <DefaultButton
            onClick={handleSubmitRequirementText}
            disabled={statusRequirement === "loading" || items.length}
            styleType="main"
          >
            Generate checklist
          </DefaultButton>
        </div>
      </div>

      <div id="checklist" className={styles.checklistWrapper}>
        {checklistId ? (
          <div className={styles.procesingblock}>
            <H3Ui>Test checklist</H3Ui>
            <TextButton styleType="visible" onClick={handleDownload} icon={<ExportSvg />} disabled={statusActiveItems}>
              Export checklist
            </TextButton>
          </div>
        ) : null}
        {statusRequirement === "loading" || statusGetItems === "loading" ? (
          <div className={styles.loaderSectionWrapper}>
            <Loader />
          </div>
        ) : items.length ? (
          <div className={styles.checklistblock}>
            <CheckList
              checklistId={checklistId}
              toggleShowItem={toggleShowItem}
              filteredItems={filteredItems}
              showItem={showItem}
            />
            <DefaultButton disabled={true} styleType="main">
              Generate test cases
            </DefaultButton>
          </div>
        ) : null}
      </div>
      {checklistId ? (
        <div id="checklist" className={styles.procesingblock}>
          <H3Ui>Test checklist</H3Ui>
          <TextButton styleType="visible" onClick={handleDownload} icon={<ExportSvg />} disabled={!filteredItems.length}>
            Export checklist
          </TextButton>
        </div>
      ) : null}
      {statusRequirement === "loading" ? (
        <Loader />
      ) : items.length ? (
        <div className={styles.checklistblock}>
          <CheckList
            checklistId={checklistId}
            toggleShowItem={toggleShowItem}
            filteredItems={filteredItems}
            showItem={showItem}
          />
          <DefaultButton disabled={true} styleType="main">
            Generate test cases
          </DefaultButton>
        </div>
      ) : null}
    </div>
  );
};

export default MainPage;
