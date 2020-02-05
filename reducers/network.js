import {
  ADD_NETWORK_REQUEST,
  ADD_NETWORK_SUCCESS,
  ADD_NETWORK_FAILURE,
  SET_NETWORK_LIST,
  FALSE_ADDED_NETWORK,
  DELETE_NETWORK_REQUEST,
  DELETE_NETWORK_SUCCESS,
  DELETE_NETWORK_FAILURE,
  DELETE_EDIT_NETWORK,
  ADD_TO_EDIT_NETWORK,
  SET_EDIT_NETWORK_NULL,
  EDIT_NETWORK_SUCCESS,
  ADD_TO_DETAILS_NETWORK,
  SET_BACK_TO_DETAILS,
  ADD_EDIT_HOST_NETWORK,
  DELETE_EDIT_HOST_NETWORK,
  SET_ADDED_HOST_TO_NETWORK
} from "../actions/network";

export function networkReducer(
  state = {
    networks: [],
    networksNames: [],
    isAddingNetwork: false,
    addingNetworkFailure: false,
    addedNetwork: false,
    deleteNetworkFailure: false,
    deleteNetworkRequest: false,
    editNetwork: null,
    ifEditElemNetwork: false,
    detailsNetwork: null,
    backToDetails: false,
    detailHost: null,
    ifEditDetailHost: false,
    hostAddedToNetwork: false
  },
  action
) {
  switch (action.type) {
    case ADD_NETWORK_REQUEST:
      return { ...state, addingNetworkFailure: false, isAddingNetwork: true };
    case ADD_NETWORK_SUCCESS:
      var networksNamesList = state.networksNames;
      networksNamesList.push(action.network.name);
      let networksList = state.networks;
      networksList.push(action.network);
      return {
        ...state,
        networks: networksList,
        networksNames: networksNamesList,
        isAddingNetwork: false,
        addedNetwork: true,
        addingNetworkFailure: false,
        editNetwork: null,
        ifEditElemNetwork: false,
        detailsNetwork: null
      };
    case ADD_NETWORK_FAILURE:
      return { ...state, addingNetworkFailure: true, isAddingNetwork: false };
    case SET_NETWORK_LIST:
      networksNamesList = [];
      for (let network of action.list) {
        networksNamesList.push(network.name);
      }
      return {
        ...state,
        networks: action.list,
        networksNames: networksNamesList
      };
    case FALSE_ADDED_NETWORK:
      return { ...state, addedNetwork: false };
    case DELETE_NETWORK_REQUEST:
      return {
        ...state,
        deleteNetworkRequest: true,
        deleteNetworkFailure: false
      };
    case DELETE_NETWORK_SUCCESS:
      networksList = state.networks;
      var elemID = networksList.findIndex(x => x.id === action.id);
      networksList.splice(elemID, 1);
      var newList = [...networksList];
      state.networksNames.splice(elemID, 1);
      var newNames = [...state.networksNames];
      return {
        ...state,
        networks: newList,
        networksNames: newNames,
        deleteNetworkRequest: false,
        deleteNetworkFailure: false
      };
    case DELETE_NETWORK_FAILURE:
      return {
        ...state,
        deleteNetworkFailure: true,
        deleteNetworkRequest: false
      };
    case ADD_TO_EDIT_NETWORK:
      return {
        ...state,
        editNetwork: action.network,
        ifEditElemNetwork: true,
        addedNetwork: false
      };
    case DELETE_EDIT_NETWORK:
      return { ...state, editNetwork: null, ifEditElemNetwork: false };
    case SET_EDIT_NETWORK_NULL:
      return { ...state, editNetwork: false };
    case EDIT_NETWORK_SUCCESS:
      networksList = state.networks;
      elemID = networksList.findIndex(x => x.id === action.network.id);
      newList = [...networksList];
      newNames = [...state.networksNames];
      newList[elemID] = action.network;
      newNames[elemID] = action.network.name;
      if (state.backToDetails) {
        return {
          ...state,
          networks: newList,
          networksNames: newNames,
          addedNetwork: true,
          editNetwork: null,
          ifEditElemNetwork: false,
          detailsNetwork: action.network
        };
      }
      return {
        ...state,
        networks: newList,
        networksNames: newNames,
        addedNetwork: true,
        editNetwork: null,
        ifEditElemNetwork: false
      };
    case ADD_TO_DETAILS_NETWORK:
      return { ...state, detailsNetwork: action.network };
    case SET_BACK_TO_DETAILS:
      return { ...state, backToDetails: action.bool };
    case DELETE_EDIT_HOST_NETWORK:
      return { ...state, detailHost: null, ifEditDetailHost: false };
    case ADD_EDIT_HOST_NETWORK:
      return { ...state, detailHost: action.host, ifEditDetailHost: true };
    case SET_ADDED_HOST_TO_NETWORK:
      return { ...state, hostAddedToNetwork: action.bool };
    default:
      return state;
  }
}
