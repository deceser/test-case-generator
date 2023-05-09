import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  addNewItem,
  updatedItem,
  deleteItem,
  toggleStatus,
  toggleStatusAll,
} from "../../../../redux/slices/itemSlice";

import {
  toggleEdit,
  onChangeItemUpdate,
} from "../../../../redux/slices/itemSlice";

import { useInput } from "../../../../hooks/useInput";
import { useFilterItems } from "../../../../hooks/useFilterItems";
import { downloadCVS } from "../../../../utils/download/downloadCSV";

import ChecklistItem from "../ChecklistItem";

import TextButton from "../../../ui/buttons/textbutton";
import CheckBoxUi from "../../../ui/checkbox";
import InputNewItem from "../../../ui/inputnewitem";

import ExportSvg from "../../../../assets/svg/ExportSvg";
import PlusSvg from "../../../../assets/svg/PlusSvg";
import EyeSvg from "../../../../assets/svg/EyeSvg";
import HideEyeSvg from "../../../../assets/svg/HideEyeSvg";

import styles from "./index.module.scss";

const CheckList = ({ ...props }) => {
  const { checklistId } = props;

  const dispatch = useDispatch();
  const items = useSelector((state) => state.items.items);
  const isAllSelected = useSelector((state) => state.items.isAllSelected);

  const addItem = () => {
    const item = { name: useInputNewItem.value, checkListId: checklistId };
    dispatch(addNewItem(item));
    handleHideInput();
    useInputNewItem.setValue("");
  };

  const handleEditItem = (id) => {
    dispatch(toggleEdit({ id }));
  };

  const handleDeleteItem = (id) => {
    dispatch(deleteItem(id));
  };

  const handleChangeItem = (event, i) => {
    const item = { ...i, name: event.target.value };
    dispatch(onChangeItemUpdate(item));
  };

  const handleSubmitUpdateItem = (id) => {
    const item = items.find((i) => i.id === id);
    dispatch(updatedItem(item));
  };

  const handleChangeCheckbox = (id) => {
    dispatch(toggleStatus(id));
  };

  const handleChangeAllCheckboxes = () => {
    dispatch(toggleStatusAll());
  };

  const [showItem, setShowItem] = React.useState(false);

  const filteredItems = useFilterItems(showItem, items);

  const toggleShowItem = () => {
    setShowItem(!showItem);
  };

  const [showInput, setShowInput] = React.useState(false);
  const refInputNewItem = React.useRef(null);

  const useInputNewItem = useInput("");

  const handleHideInput = () => {
    setShowInput(!showInput);
    useInputNewItem.setValue("");
    setTimeout(() => {
      refInputNewItem.current.focus();
    });
  };

  const handleDownload = () => {
    downloadCVS(filteredItems, checklistId);
  };

  return (
    <div className={styles.checklist}>
      <div className={styles.checklist__top}>
        <div className={styles.top__left}>
          <span className={styles.top__left__box}>
            <h4>Id</h4>
          </span>
          <h4>Checklist items</h4>
        </div>
        <div className={styles.top__right}>
          <h4>Select all</h4>
          <CheckBoxUi
            checked={isAllSelected}
            onChange={handleChangeAllCheckboxes}
          />
        </div>
      </div>
      <ChecklistItem
        items={filteredItems}
        handleChangeCheckbox={handleChangeCheckbox}
        handleDeleteItem={handleDeleteItem}
        handleEditItem={handleEditItem}
        handleUpdateItem={handleSubmitUpdateItem}
        handleChangeItem={handleChangeItem}
      />
      <div
        className={showInput ? styles.newItem__visible : styles.newItem__hidden}
      >
        <InputNewItem
          addNewItem={addItem}
          items={filteredItems}
          value={useInputNewItem.value}
          refInputNewItem={refInputNewItem}
          handleHideInput={handleHideInput}
          onChange={useInputNewItem.onChange}
        />
      </div>
      <div className={styles.checklist__bottom}>
        <div className={styles.bottom__left}>
          <TextButton
            icon={<PlusSvg />}
            onClick={handleHideInput}
            disabled={showInput}
          >
            Add you item
          </TextButton>
          <TextButton
            onClick={toggleShowItem}
            disabled={isAllSelected}
            icon={!showItem ? <HideEyeSvg /> : <EyeSvg />}
          >
            {!showItem ? "Hide disabled" : "Show disabled"}
          </TextButton>
        </div>
        <div className={styles.bottom__right}>
          <TextButton onClick={handleDownload} icon={<ExportSvg />}>
            Export checklist
          </TextButton>
        </div>
      </div>
    </div>
  );
};

export default CheckList;
