import { combineReducers } from "redux";

import itemsSlice from "./itemSlice";
import checklistSlice from "./checklistSlice";
import requirementSlice from "./requirementSlice";

const rootReducer = combineReducers({
  items: itemsSlice,
  checklist: checklistSlice,
  requirement: requirementSlice,
});

export default rootReducer;
