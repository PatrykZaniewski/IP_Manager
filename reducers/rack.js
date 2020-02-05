import {
  ADD_RACK_REQUEST,
  ADD_RACK_SUCCESS,
  ADD_RACK_FAILURE,
  SET_RACK_LIST,
  FALSE_ADDED_RACK,
  DELETE_RACK_REQUEST,
  DELETE_RACK_SUCCESS,
  DELETE_RACK_FAILURE,
  DELETE_EDIT_RACK,
  ADD_TO_EDIT_RACK,
  SET_EDIT_RACK_NULL,
  EDIT_RACK_SUCCESS,
  ADD_TO_DETAILS_RACK,
  SET_BACK_TO_DETAILS,
  ADD_EDIT_HOST_RACK,
  DELETE_EDIT_HOST_RACK,
  SET_ADDED_HOST_TO_RACK
} from "../actions/rack";

export function rackReducer(
  state = {
    racks: [],
    racksNames: [],
    isAddingRack: false,
    addingRackFailure: false,
    addedRack: false,
    deleteRackFailure: false,
    deleteRackRequest: false,
    editRack: null,
    ifEditElemRack: false,
    detailsRack: null,
    backToDetails: false,
    detailHost: null,
    ifEditDetailHost: false,
    hostAddedToRack: false
  },
  action
) {
  switch (action.type) {
    case ADD_RACK_REQUEST:
      return { ...state, addingRackFailure: false, isAddingRack: true };
    case ADD_RACK_SUCCESS:
      var racksNamesList = state.racksNames;

      racksNamesList.push(action.rack.name);

      let racksList = state.racks;

      racksList.push(action.rack);
      return {
        ...state,
        racks: racksList,
        racksNames: racksNamesList,
        isAddingRack: false,
        addedRack: true,
        addingRackFailure: false,
        editRack: null,
        ifEditElemRack: false,
        detailsRack: null
      };
    case ADD_RACK_FAILURE:
      return { ...state, addingRackFailure: true, isAddingRack: false };
    case SET_RACK_LIST:
      racksNamesList = [];
      for (let rack of action.list) {
        racksNamesList.push(rack.name);
      }
      return {
        ...state,
        racks: action.list,
        racksNames: racksNamesList
      };
    case FALSE_ADDED_RACK:
      return { ...state, addedRack: false };
    case DELETE_RACK_REQUEST:
      return {
        ...state,
        deleteRackRequest: true,
        deleteRackFailure: false
      };
    case DELETE_RACK_SUCCESS:
      racksList = state.racks;
      var elemID = racksList.findIndex(x => x.id === action.id);
      racksList.splice(elemID, 1);
      var newList = [...racksList];
      state.racksNames.splice(elemID, 1);
      var newNames = [...state.racksNames];
      return {
        ...state,
        racks: newList,
        racksNames: newNames,
        deleteRackRequest: false,
        deleteRackFailure: false
      };
    case DELETE_RACK_FAILURE:
      return {
        ...state,
        deleteRackFailure: true,
        deleteRackRequest: false
      };
    case ADD_TO_EDIT_RACK:
      return {
        ...state,
        editRack: action.rack,
        ifEditElemRack: true,
        addedRack: false
      };
    case DELETE_EDIT_RACK:
      return { ...state, editRack: null, ifEditElemRack: false };
    case SET_EDIT_RACK_NULL:
      return { ...state, editRack: false };
    case EDIT_RACK_SUCCESS:
      racksList = state.racks;
      elemID = racksList.findIndex(x => x.id === action.rack.id);
      newList = [...racksList];
      newNames = [...state.racksNames];
      newList[elemID] = action.rack;
      newNames[elemID] = action.rack.name;
      if (state.backToDetails) {
        return {
          ...state,
          racks: newList,
          racksNames: newNames,
          addedRack: true,
          editRack: null,
          ifEditElemRack: false,
          detailsRack: action.rack
        };
      }
      return {
        ...state,
        racks: newList,
        racksNames: newNames,
        addedRack: true,
        editRack: null,
        ifEditElemRack: false
      };
    case ADD_TO_DETAILS_RACK:
      return { ...state, detailsRack: action.rack };
    case SET_BACK_TO_DETAILS:
      return { ...state, backToDetails: action.bool };
    case DELETE_EDIT_HOST_RACK:
      return { ...state, detailHost: null, ifEditDetailHost: false };
    case ADD_EDIT_HOST_RACK:
      return { ...state, detailHost: action.host, ifEditDetailHost: true };
    case SET_ADDED_HOST_TO_RACK:
      return { ...state, hostAddedToRack: action.bool };
    default:
      return state;
  }
}
