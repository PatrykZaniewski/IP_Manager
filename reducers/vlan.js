import {
  ADD_VLAN_REQUEST,
  ADD_VLAN_SUCCESS,
  ADD_VLAN_FAILURE,
  SET_VLAN_LIST,
  FALSE_ADDED_VLAN,
  DELETE_VLAN_REQUEST,
  DELETE_VLAN_SUCCESS,
  DELETE_VLAN_FAILURE,
  DELETE_EDIT_VLAN,
  ADD_TO_EDIT_VLAN,
  SET_EDIT_VLAN_NULL,
  EDIT_VLAN_SUCCESS
} from "../actions/vlan";

export function vlanReducer(
  state = {
    vlans: [],
    vlansNames: [],
    isAddingVLAN: false,
    addingVLANFailure: false,
    addedVLAN: false,
    deleteVLANFailure: false,
    deleteVLANRequest: false,
    editVLAN: null,
    ifEditElemVLAN: false
  },
  action
) {
  switch (action.type) {
    case ADD_VLAN_REQUEST:
      return { ...state, addingVLANFailure: false, isAddingVLAN: true };
    case ADD_VLAN_SUCCESS:
      var vlansNamesList = state.vlansNames;
      vlansNamesList.push(action.vlan.name);
      let vlansList = state.vlans;
      vlansList.push(action.vlan);
      return {
        ...state,
        vlans: vlansList,
        vlansNames: vlansNamesList,
        isAddingVLAN: false,
        addedVLAN: true,
        addingVLANFailure: false,
        editVLAN: null,
        ifEditElemVLAN: false
      };
    case ADD_VLAN_FAILURE:
      return { ...state, addingVLANFailure: true, isAddingVLAN: false };
    case SET_VLAN_LIST:
      vlansNamesList = [];
      for (let vlan of action.list) {
        vlansNamesList.push(vlan.name);
      }
      return { ...state, vlans: action.list, vlansNames: vlansNamesList };
    case FALSE_ADDED_VLAN:
      return { ...state, addedVLAN: false };
    case DELETE_VLAN_REQUEST:
      return { ...state, deleteVLANRequest: true, deleteVLANFailure: false };
    case DELETE_VLAN_SUCCESS:
      vlansList = state.vlans;
      var elemID = vlansList.findIndex(x => x.id === action.id);
      vlansList.splice(elemID, 1);
      var newList = [...vlansList];
      state.vlansNames.splice(elemID, 1);
      var newNames = [...state.vlansNames];
      return {
        ...state,
        vlans: newList,
        vlansNames: newNames,
        deleteVLANRequest: false,
        deleteVLANFailure: false
      };
    case DELETE_VLAN_FAILURE:
      return { ...state, deleteVLANFailure: true, deleteVLANRequest: false };
    case ADD_TO_EDIT_VLAN:
      return {
        ...state,
        editVLAN: action.vlan,
        ifEditElemVLAN: true,
        addedVLAN: false
      };
    case DELETE_EDIT_VLAN:
      return { ...state, editVLAN: null, ifEditElemVLAN: false };
    case SET_EDIT_VLAN_NULL:
      return { ...state, editVLAN: false };
    case EDIT_VLAN_SUCCESS:
      vlansList = state.vlans;
      elemID = vlansList.findIndex(x => x.id === action.vlan.id);
      newList = [...vlansList];
      newNames = [...state.vlansNames];
      newList[elemID] = action.vlan;
      newNames[elemID] = action.vlan.name;
      return {
        ...state,
        vlans: newList,
        vlansNames: newNames,
        addedVLAN: true,
        editVLAN: null,
        ifEditElemVLAN: false
      };
    default:
      return state;
  }
}
