import { combineReducers } from "redux";
import currentDeviceConfigReducer from "./currentDeviceConfigReducer";
import currentMaterialsReducer from "./currentMaterialsReducer";
import currentStrainReducer from "./currentStrainReducer";

import userReducer from "./userReducer";

const rootReducer = combineReducers({
  user: userReducer,
  materials: currentMaterialsReducer,
  strains: currentStrainReducer,
  deviceConfig: currentDeviceConfigReducer,

});

export default rootReducer;

