import { combineReducers } from "redux";
import auth from "./auth";
import { hostReducer } from "./firebase";
import { vlanReducer } from "./vlan";
import { natReducer } from "./nat";
import { networkReducer } from "./network";
import { rackReducer } from "./rack";

export default combineReducers({
  auth,
  hostReducer,
  vlanReducer,
  natReducer,
  networkReducer,
  rackReducer
});
