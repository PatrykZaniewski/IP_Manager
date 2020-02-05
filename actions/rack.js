import { db } from "../firebase/firebase";

export const ADD_RACK_REQUEST = "ADD_RACK_REQUEST";
export const ADD_RACK_SUCCESS = "ADD_RACK_SUCCESS";
export const ADD_RACK_FAILURE = "ADD_RACK_FAILURE";
export const SET_RACK_LIST = "SET_RACK_LIST";
export const FALSE_ADDED_RACK = "FALSE_ADDED_RACK";
export const DELETE_RACK_SUCCESS = "DELETE_RACK_SUCCESS";
export const DELETE_RACK_REQUEST = "DELETE_RACK_REQUEST";
export const DELETE_RACK_FAILURE = "DELETE_RACK_FAILURE";
export const EDIT_RACK_SUCCESS = "EDIT_RACK_SUCCESS";
export const DELETE_EDIT_RACK = "DELETE_EDIT_RACK";
export const SET_EDIT_RACK_NULL = "SET_EDIT_RACK_NULL";
export const ADD_TO_EDIT_RACK = "ADD_TO_EDIT_RACK";
export const ADD_TO_DETAILS_RACK = "ADD_TO_DETAILS_RACK";
export const SET_BACK_TO_DETAILS = "SET_BACK_TO_DETAILS";
export const DELETE_EDIT_HOST_RACK = "DELETE_EDIT_HOST_RACK";
export const SET_ADDED_HOST_TO_RACK = "SET_ADDED_HOST_TO_RACK";
export const ADD_EDIT_HOST_RACK = "ADD_EDIT_HOST_RACK";

const addRackRequest = () => {
  return {
    type: ADD_RACK_REQUEST
  };
};

const addRackSuccess = rack => {
  return {
    type: ADD_RACK_SUCCESS,
    rack: rack
  };
};

const addRackFailure = () => {
  return {
    type: ADD_RACK_FAILURE
  };
};

const setRackList = list => {
  return {
    type: SET_RACK_LIST,
    list: list
  };
};

export const deleteEditRack = () => {
  return {
    type: DELETE_EDIT_RACK
  };
};

export const setEditRackNull = () => {
  return {
    type: SET_EDIT_RACK_NULL
  };
};

export const falseAddedRack = () => {
  return {
    type: FALSE_ADDED_RACK
  };
};

const deleteRackSuccess = id => {
  return {
    type: DELETE_RACK_SUCCESS,
    id: id
  };
};

const deleteRackRequest = () => {
  return {
    type: DELETE_RACK_REQUEST
  };
};

const deleteRackFailure = () => {
  return {
    type: DELETE_RACK_FAILURE
  };
};

const editRackSuccess = rackData => {
  return {
    type: EDIT_RACK_SUCCESS,
    rack: rackData
  };
};

export const addToEditRack = rackData => {
  return {
    type: ADD_TO_EDIT_RACK,
    rack: rackData
  };
};

export const addDetailsRack = rackData => {
  return {
    type: ADD_TO_DETAILS_RACK,
    rack: rackData
  };
};

export const setBackToDetails = ans => {
  return {
    type: SET_BACK_TO_DETAILS,
    bool: ans
  };
};

export const addEditHostRack = hostData => {
  return {
    type: ADD_EDIT_HOST_RACK,
    host: hostData
  };
};

export const deleteEditHostRack = () => {
  return {
    type: DELETE_EDIT_HOST_RACK
  };
};

export const setAddedHostToRack = ans => {
  return {
    type: SET_ADDED_HOST_TO_RACK,
    bool: ans
  };
};

export const deleteRack = id => dispatch => {
  dispatch(deleteRackRequest());
  db.collection("racks")
    .doc(id)
    .delete()
    .then(dispatch(deleteRackSuccess(id)))
    .catch(() => dispatch(deleteRackFailure()));
};

export const addRack = rackData => dispatch => {
  dispatch(addRackRequest());
  db.collection("racks")
    .add({
      name: rackData.name,
      localization: rackData.localization,
      description: rackData.description,
      size: rackData.size,
      hosts: []
    })
    .then(docRef => {
      dispatch(
        addRackSuccess({
          id: docRef.id,
          name: rackData.name,
          localization: rackData.localization,
          description: rackData.description,
          size: rackData.size,
          hosts: []
        })
      );
    })
    .catch(() => dispatch(addRackFailure()));
};

export const editRack = rackData => dispatch => {
  db.collection("racks")
    .doc(rackData.id)
    .set({
      name: rackData.name,
      localization: rackData.localization,
      description: rackData.description,
      size: rackData.size,
      hosts: rackData.hosts
    })
    .then(
      dispatch(
        editRackSuccess({
          name: rackData.name,
          localization: rackData.localization,
          description: rackData.description,
          size: rackData.size,
          id: rackData.id,
          hosts: rackData.hosts
        })
      )
    );
};

export const setRack = () => dispatch => {
  db.collection("racks")
    .get()
    .then(querySnapshot => {
      let list = [];
      querySnapshot.forEach(function(doc) {
        list.push({
          id: doc.id,
          name: doc.data().name,
          localization: doc.data().localization,
          description: doc.data().description,
          size: doc.data().size,
          hosts: doc.data().hosts
        });
      });
      return list;
    })
    .then(list => dispatch(setRackList(list)));
};

export const addHostToRack = (rackData, hostData) => dispatch => {
  var hostsList = rackData.hosts;
  hostsList.push(hostData);
  rackData.hosts = [...hostsList];
  dispatch(editRack(rackData));
  dispatch(addDetailsRack(rackData));
  dispatch(setAddedHostToRack(true));
};

export const editHostInRack = (rackData, hostData, oldPos) => dispatch => {
  var hostsList = rackData.hosts;
  var elemID = hostsList.findIndex(x => x.position === oldPos);
  hostsList[elemID] = hostData;
  rackData.hosts = [...hostsList];
  dispatch(editRack(rackData));
  dispatch(addDetailsRack(rackData));
  dispatch(setAddedHostToRack(true));
};

export const deleteHostFromRack = (rackData, hostData) => dispatch => {
  var hostsList = rackData.hosts;
  var elemID = hostsList.findIndex(x => x.position === hostData.position);
  hostsList.splice(elemID, 1);
  rackData.hosts = [...hostsList];
  dispatch(editRack(rackData));
  dispatch(addDetailsRack(rackData));
};

export * from "./rack";
