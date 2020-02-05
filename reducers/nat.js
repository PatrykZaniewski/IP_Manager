import {
  ADD_NAT_REQUEST,
  ADD_NAT_SUCCESS,
  ADD_NAT_FAILURE,
  SET_NAT_LIST,
  FALSE_ADDED_NAT,
  DELETE_NAT_REQUEST,
  DELETE_NAT_SUCCESS,
  DELETE_NAT_FAILURE,
  ADD_TO_EDIT_NAT,
  DELETE_EDIT_NAT,
  SET_EDIT_NAT_NULL,
  EDIT_NAT_SUCCESS
} from "../actions/nat";

export function natReducer(
  state = {
    nats: [],
    natsNames: [],
    isAddingNAT: false,
    addingNATFailure: false,
    addedNAT: false,
    deleteNATFailure: false,
    deleteNATRequest: false,
    editNAT: null,
    ifEditElemNAT: false
  },
  action
) {
  switch (action.type) {
    case ADD_NAT_REQUEST:
      return { ...state, isAddingNAT: false };
    case ADD_NAT_SUCCESS:
      var natsNamesList = state.natsNames;
      natsNamesList.push(action.nat.name);
      let natsList = state.nats;
      natsList.push(action.nat);
      return {
        ...state,
        nats: natsList,
        natsNames: natsNamesList,
        isAddingNAT: false,
        addedNAT: true,
        addingNATFailure: false,
        editNAT: null,
        ifEditElemNAT: false
      };
    case ADD_NAT_FAILURE:
      return { ...state, addingNATFailure: true, isAddingNAT: false };
    case SET_NAT_LIST:
      natsNamesList = [];
      for (let nat of action.list) {
        natsNamesList.push(nat.name);
      }
      return { ...state, nats: action.list, natsNames: natsNamesList };
    case FALSE_ADDED_NAT:
      return { ...state, addedNAT: false };
    case DELETE_NAT_REQUEST:
      return { ...state, deleteNATRequest: true, deleteNATFailure: false };
    case DELETE_NAT_SUCCESS:
      natsList = state.nats;
      var elemID = natsList.findIndex(x => x.id === action.id);
      natsList.splice(elemID, 1);
      var newList = [...natsList];
      state.natsNames.splice(elemID, 1);
      var newNames = [...state.natsNames];
      return {
        ...state,
        nats: newList,
        natsNames: newNames,
        deleteNATRequest: false,
        deleteNATFailure: false
      };
    case DELETE_NAT_FAILURE:
      return { ...state, deleteNATFailure: true, deleteNATRequest: false };
    case ADD_TO_EDIT_NAT:
      return {
        ...state,
        editNAT: action.nat,
        ifEditElemNAT: true,
        addedNAT: false
      };
    case DELETE_EDIT_NAT:
      return { ...state, editNAT: null, ifEditElemNAT: false };
    case SET_EDIT_NAT_NULL:
      return { ...state, editNAT: false };
    case EDIT_NAT_SUCCESS:
      natsList = state.nats;
      elemID = natsList.findIndex(x => x.id === action.nat.id);
      newList = [...natsList];
      newNames = [...state.natsNames];
      newList[elemID] = action.nat;
      newNames[elemID] = action.nat.name;
      return {
        ...state,
        nats: newList,
        natsNames: newNames,
        addedNAT: true,
        editNAT: null,
        ifEditElemNAT: false
      };
    default:
      return state;
  }
}
