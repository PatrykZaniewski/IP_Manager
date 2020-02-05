import { db } from "../firebase/firebase";

export const ADD_NAT_REQUEST = "ADD_NAT_REQUEST";
export const ADD_NAT_SUCCESS = "ADD_NAT_SUCCESS";
export const ADD_NAT_FAILURE = "ADD_NAT_FAILURE";
export const SET_NAT_LIST = "SET_NAT_LIST";
export const FALSE_ADDED_NAT = "FALSE_ADDED_NAT";
export const DELETE_NAT_SUCCESS = "DELETE_NAT_SUCCESS";
export const DELETE_NAT_REQUEST = "DELETE_NAT_REQUEST";
export const DELETE_NAT_FAILURE = "DELETE_NAT_FAILURE";
export const EDIT_NAT_SUCCESS = "EDIT_NAT_SUCCESS";
export const DELETE_EDIT_NAT = "DELETE_EDIT_NAT";
export const SET_EDIT_NAT_NULL = "SET_EDIT_NAT_NULL";
export const ADD_TO_EDIT_NAT = "ADD_TO_EDIT_NAT";

const addNATRequest = () => {
  return {
    type: ADD_NAT_REQUEST
  };
};

const addNATSuccess = nat => {
  return {
    type: ADD_NAT_SUCCESS,
    nat: nat
  };
};

const addNATFailure = () => {
  return {
    type: ADD_NAT_FAILURE
  };
};

const setNATList = list => {
  return {
    type: SET_NAT_LIST,
    list: list
  };
};

export const deleteEditNAT = () => {
  return {
    type: DELETE_EDIT_NAT
  };
};

export const setEditNATNull = () => {
  return {
    type: SET_EDIT_NAT_NULL
  };
};

export const falseAddedNAT = () => {
  return {
    type: FALSE_ADDED_NAT
  };
};

const deleteNATSuccess = id => {
  return {
    type: DELETE_NAT_SUCCESS,
    id: id
  };
};

const deleteNATRequest = () => {
  return {
    type: DELETE_NAT_REQUEST
  };
};

const deleteNATFailure = () => {
  return {
    type: DELETE_NAT_FAILURE
  };
};

const editNATSuccess = natData => {
  return {
    type: EDIT_NAT_SUCCESS,
    nat: natData
  };
};

export const addToEditNAT = natData => {
  return {
    type: ADD_TO_EDIT_NAT,
    nat: natData
  };
};

export const deleteNAT = id => dispatch => {
  dispatch(deleteNATRequest());
  db.collection("nats")
    .doc(id)
    .delete()
    .then(dispatch(deleteNATSuccess(id)))
    .catch(() => dispatch(deleteNATFailure()));
};

export const addNAT = natData => dispatch => {
  dispatch(addNATRequest());
  db.collection("nats")
    .add({
      name: natData.name,
      network: natData.network,
      outerIP: natData.outerIP,
      device: natData.device
    })
    .then(docRef => {
      dispatch(
        addNATSuccess({
          id: docRef.id,
          name: natData.name,
          network: natData.network,
          outerIP: natData.outerIP,
          device: natData.device
        })
      );
    })
    .catch(() => dispatch(addNATFailure()));
};

export const editNAT = natData => dispatch => {
  db.collection("nats")
    .doc(natData.id)
    .set({
      name: natData.name,
      network: natData.network,
      outerIP: natData.outerIP,
      device: natData.device
    })
    .then(
      dispatch(
        editNATSuccess({
          name: natData.name,
          network: natData.network,
          outerIP: natData.outerIP,
          device: natData.device,
          id: natData.id
        })
      )
    );
};

export const setNAT = () => dispatch => {
  db.collection("nats")
    .get()
    .then(querySnapshot => {
      let list = [];
      querySnapshot.forEach(function(doc) {
        list.push({
          id: doc.id,
          outerIP: doc.data().outerIP,
          network: doc.data().network,
          name: doc.data().name,
          device: doc.data().device
        });
      });
      return list;
    })
    .then(list => dispatch(setNATList(list)));
};

export * from "./nat";
