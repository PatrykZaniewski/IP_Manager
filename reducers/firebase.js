import {
  ADD_HOST_REQUEST,
  ADD_HOST_SUCCESS,
  ADD_HOST_FAILURE,
  SET_HOST_LIST,
  FALSE_ADDED_HOST,
  DELETE_HOST_SUCCESS,
  DELETE_HOST_REQUEST,
  DELETE_HOST_ERROR,
  ADD_TO_EDIT_HOST,
  DELETE_EDIT_HOST,
  SET_EDIT_HOST_NULL,
  EDIT_HOST_SUCCESS
} from "../actions/firebase";

export function hostReducer(
  state = {
    hosts: [],
    hostName: [],
    isAddingHosts: false,
    addingHostFailure: false,
    addedHost: false,
    deleteRequest: false,
    deleteError: false,
    editHost: null,
    ifEditHost: false
  },
  action
) {
  switch (action.type) {
    case ADD_HOST_REQUEST:
      return { ...state, isAddingHosts: true, addingHostFailure: false };
    case ADD_HOST_SUCCESS:
      var hostNameList = state.hostName;
      hostNameList.push(action.host.name);
      let hostsList = state.hosts;
      hostsList.push(action.host);
      return {
        ...state,
        hosts: hostsList,
        hostName: hostNameList,
        isAddingHosts: false,
        addingHostFailure: false,
        addedHost: true,
        editHost: null,
        ifEditHost: false
      };
    case ADD_HOST_FAILURE:
      return { ...state, isAddingHosts: false, addingHostFailure: true };
    case SET_HOST_LIST:
      hostNameList = [];
      for (let host of action.list) {
        hostNameList.push(host.name);
      }
      return { ...state, hosts: action.list, hostName: hostNameList };
    case FALSE_ADDED_HOST:
      var change = false;
      return { ...state, addedHost: change };
    case DELETE_HOST_REQUEST:
      return {
        ...state,
        deleteRequest: true,
        deleteError: false
      };
    case DELETE_HOST_SUCCESS:
      hostsList = state.hosts;
      var elem = hostsList.findIndex(x => x.id === action.id);
      hostsList.splice(elem, 1);
      var newList = [...hostsList];
      state.hostName.splice(elem, 1);
      var newNames = [...state.hostName];
      return {
        ...state,
        hosts: newList,
        hostName: newNames,
        deleteRequest: false,
        deleteError: false
      };
    case DELETE_HOST_ERROR:
      return { ...state, deleteRequest: false, deleteError: true };
    case ADD_TO_EDIT_HOST:
      return {
        ...state,
        addedHost: false,
        editHost: action.host,
        ifEditHost: true
      };
    case DELETE_EDIT_HOST:
      return { ...state, editHost: null, ifEditHost: false };
    case SET_EDIT_HOST_NULL:
      return { ...state, editHost: null };
    case EDIT_HOST_SUCCESS:
      hostsList = state.hosts;
      var elemID = hostsList.findIndex(x => x.id === action.host.id);
      newList = [...hostsList];
      var index = state.hostName.indexOf(newList[elemID].name);
      hostNameList = state.hostName;
      hostNameList[index] = action.host.name;
      newList[elemID] = action.host;

      return {
        ...state,
        hosts: newList,
        hostName: hostNameList,
        addedHost: true,
        editHost: null,
        ifEditHost: false
      };
    default:
      return state;
  }
}
