import { combineReducers } from "redux";

import itemsSlice from "./itemSlice";
import checklistSlice from "./checklistSlice";
import requirementSlice from "./requirementSlice";
import authGoogleSlice from "./googleAuthSlice";

const rootReducer = combineReducers({
  items: itemsSlice,
  checklist: checklistSlice,
  requirement: requirementSlice,
  authGoogle: authGoogleSlice,
});

export default rootReducer;
