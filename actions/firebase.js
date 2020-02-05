import { db } from "../firebase/firebase";

export const ADD_HOST_REQUEST = "ADD_HOST_REQUEST";
export const ADD_HOST_SUCCESS = "ADD_HOST_SUCCESS";
export const ADD_HOST_FAILURE = "ADD_HOST_FAILURE";
export const SET_HOST_LIST = "SET_HOST_LIST";
export const FALSE_ADDED_HOST = "FALSE_ADDED_HOST";
export const DELETE_HOST_REQUEST = "DELETE_HOST_REQUEST";
export const DELETE_HOST_SUCCESS = "DELETE_HOST_SUCCESS";
export const DELETE_HOST_ERROR = "DELETE_HOST_ERROR";
export const ADD_TO_EDIT_HOST = "ADD_TO_EDIT_HOST";
export const DELETE_EDIT_HOST = "DELETE_EDIT_HOST";
export const SET_EDIT_HOST_NULL = "SET_EDIT_HOST_NULL";
export const EDIT_HOST_SUCCESS = "EDIT_HOST_SUCCESS";

const addHostRequest = () => {
  return {
    type: ADD_HOST_REQUEST
  };
};

const addHostSuccess = host => {
  return {
    type: ADD_HOST_SUCCESS,
    host
  };
};

const addHostFailure = () => {
  return {
    type: ADD_HOST_FAILURE
  };
};

const setHostList = list => {
  return {
    type: SET_HOST_LIST,
    list
  };
};

export const falseAddedHost = () => {
  return {
    type: FALSE_ADDED_HOST
  };
};

export const addToEdit = host => {
  return {
    type: ADD_TO_EDIT_HOST,
    host: host
  };
};

export const deleteEditHost = () => {
  return {
    type: DELETE_EDIT_HOST
  };
};

export const setEditHostNull = () => {
  return {
    type: SET_EDIT_HOST_NULL
  };
};

const deleteHostRequest = () => {
  return {
    type: DELETE_HOST_REQUEST
  };
};

const deleteHostSuccess = id => {
  return {
    type: DELETE_HOST_SUCCESS,
    id: id
  };
};

const deleteHostError = () => {
  return {
    type: DELETE_HOST_ERROR
  };
};

const editHostSuccess = host => {
  return {
    type: EDIT_HOST_SUCCESS,
    host: host
  };
};

export const deleteHost = id => dispatch => {
  dispatch(deleteHostRequest());
  db.collection("hosts")
    .doc(id)
    .delete()
    .then(dispatch(deleteHostSuccess(id)))
    .catch(() => dispatch(deleteHostError()));
};

export const addHost = hostData => dispatch => {
  dispatch(addHostRequest());
  db.collection("hosts")
    .add({
      name: hostData.name,
      description: hostData.description,
      localization: hostData.localization
    })
    .then(docRef => {
      dispatch(
        addHostSuccess({
          id: docRef.id,
          name: hostData.name,
          description: hostData.description,
          localization: hostData.localization
        })
      );
    })
    .catch(() => {
      dispatch(addHostFailure());
    });
};

export const setHost = () => dispatch => {
  db.collection("hosts")
    .get()
    .then(querySnapshot => {
      let list = [];
      querySnapshot.forEach(function(doc) {
        list.push({
          id: doc.id,
          description: doc.data().description,
          localization: doc.data().localization,
          name: doc.data().name
        });
      });
      return list;
    })
    .then(list => dispatch(setHostList(list)));
};

export const editHost = hostData => dispatch => {
  db.collection("hosts")
    .doc(hostData.id)
    .set({
      name: hostData.name,
      description: hostData.description,
      localization: hostData.localization
    })
    .then(
      dispatch(
        editHostSuccess({
          name: hostData.name,
          description: hostData.description,
          localization: hostData.localization,
          id: hostData.id
        })
      )
    );
};

export * from "./firebase";
