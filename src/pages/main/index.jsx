import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { generateChecklist } from "../../redux/slices/requirementSlice";
import { getItems } from "../../redux/slices/itemSlice";
import { useInput } from "../../hooks/useInput";
import { useFilterItems } from "../../hooks/useFilterItems";
import { downloadCVS } from "../../utils/download/downloadCSV";
import { useValidation } from "../../hooks/useValidation";

import H1Ui from "../../components/ui/fonts/h1";
import H3Ui from "../../components/ui/fonts/h3";
import ParagraphUi from "../../components/ui/fonts/paragraph";
import TextFieldUi from "../../components/ui/requirementTextField";
import DefaultButton from "../../components/ui/buttons/defaultbutton";
import TextButton from "../../components/ui/buttons/textbutton";
import ExportSvg from "../../assets/svg/ExportSvg";
import CheckList from "../../components/block/checklist/list";

import Loader from "../../components/ui/loader";
import styles from "./index.module.scss";

const MainPage = () => {
  const dispatch = useDispatch();
  const statusRequirement = useSelector((state) => state.requirement.status);
  const items = useSelector((state) => state.items.items);

  const checklistId = localStorage.getItem("checklistId");
  const userId = "9bc8519b-b7d3-4733-cb40-08db458c0aae";

  React.useEffect(() => {
    if (checklistId) {
      dispatch(getItems({ id: checklistId }));
    }
  }, [dispatch, checklistId]);

  const [showItem, setShowItem] = React.useState(true);
  const [isTouched, setTouched] = React.useState(false);
  const [isDirty, setIsDirty] = React.useState(false);

  const validationSettings = {
    minLength: 5,
    maxLength: 2500,
    errorMessage: "The requirement must be between 5 and 2500 characters.",
  };

  const useRequireInput = useInput("");
  const { isValid, errorMessages, validateRule } = useValidation(validationSettings);
  const filteredItems = useFilterItems(showItem, items);

  const handleRequirementBlur = () => {
    setTouched(true);
    if (isDirty) {
      validateRule(useRequireInput.value);
    }
  };

  const handleInputChange = (event) => {
    useRequireInput.onChange(event);
    setIsDirty(true);
  };

  const handleClearInput = () => {
    useRequireInput.clearInput();
  };

  const shouldDisplayError = () => {
    return isDirty && isTouched && !isValid;
  };

  const handleSubmitRequirementText = () => {
    if (!useRequireInput.value || useRequireInput.value.length < 5 || useRequireInput.value.length > 2500) {
      setTouched(true);
      setIsDirty(true);
      validateRule(useRequireInput.value);
    } else {
      dispatch(generateChecklist({ data: useRequireInput.value, userId }));
    }
  };

  const toggleShowItem = () => {
    setShowItem(!showItem);
  };

  const handleDownload = () => {
    downloadCVS(filteredItems, checklistId);
  };

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
            onChange={handleInputChange}
            onBlur={handleRequirementBlur}
            placeholder="Enter your requirements..."
            error={
              shouldDisplayError() &&
              errorMessages.map((errorMessage, index) => <React.Fragment key={index}>{errorMessage}</React.Fragment>)
            }
          />
          <DefaultButton
            onClick={handleSubmitRequirementText}
            disabled={statusRequirement === "loading" || items.length}
            styleType="main"
            type="submit"
          >
            Generate checklist
          </DefaultButton>
        </div>
      </div>
      {checklistId ? (
        <div id="checklist" className={styles.procesingblock}>
          <H3Ui>Test checklist</H3Ui>
          <TextButton styleType="visible" onClick={handleDownload} icon={<ExportSvg />}>
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
