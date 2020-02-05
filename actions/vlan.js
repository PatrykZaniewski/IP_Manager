import { db } from "../firebase/firebase";

export const ADD_VLAN_REQUEST = "ADD_VLAN_REQUEST";
export const ADD_VLAN_SUCCESS = "ADD_VLAN_SUCCESS";
export const ADD_VLAN_FAILURE = "ADD_VLAN_FAILURE";
export const SET_VLAN_LIST = "SET_VLAN_LIST";
export const FALSE_ADDED_VLAN = "FALSE_ADDED_VLAN";
export const DELETE_VLAN_SUCCESS = "DELETE_VLAN_SUCCESS";
export const DELETE_VLAN_REQUEST = "DELETE_VLAN_REQUEST";
export const DELETE_VLAN_FAILURE = "DELETE_VLAN_FAILURE";
export const EDIT_VLAN_SUCCESS = "EDIT_VLAN_SUCCESS";
export const DELETE_EDIT_VLAN = "DELETE_EDIT_VLAN";
export const SET_EDIT_VLAN_NULL = "SET_EDIT_VLAN_NULL";
export const ADD_TO_EDIT_VLAN = "ADD_TO_EDIT_VLAN";

const addVLANRequest = () => {
  return {
    type: ADD_VLAN_REQUEST
  };
};

const addVLANSuccess = vlan => {
  return {
    type: ADD_VLAN_SUCCESS,
    vlan: vlan
  };
};

const addVLANFailure = () => {
  return {
    type: ADD_VLAN_FAILURE
  };
};

const setVLANList = list => {
  return {
    type: SET_VLAN_LIST,
    list: list
  };
};

export const deleteEditVLAN = () => {
  return {
    type: DELETE_EDIT_VLAN
  };
};

export const setEditVLANNull = () => {
  return {
    type: SET_EDIT_VLAN_NULL
  };
};

export const falseAddedVLAN = () => {
  return {
    type: FALSE_ADDED_VLAN
  };
};

const deleteVLANSuccess = id => {
  return {
    type: DELETE_VLAN_SUCCESS,
    id: id
  };
};

const deleteVLANRequest = () => {
  return {
    type: DELETE_VLAN_REQUEST
  };
};

const deleteVLANFailure = () => {
  return {
    type: DELETE_VLAN_FAILURE
  };
};

const editVLANSuccess = vlanData => {
  return {
    type: EDIT_VLAN_SUCCESS,
    vlan: vlanData
  };
};

export const addToEditVLAN = vlanData => {
  return {
    type: ADD_TO_EDIT_VLAN,
    vlan: vlanData
  };
};

export const deleteVLAN = id => dispatch => {
  dispatch(deleteVLANRequest());
  db.collection("vlans")
    .doc(id)
    .delete()
    .then(dispatch(deleteVLANSuccess(id)))
    .catch(() => dispatch(deleteVLANFailure()));
};

export const addVLAN = vlanData => dispatch => {
  dispatch(addVLANRequest());
  db.collection("vlans")
    .add({
      name: vlanData.name,
      network: vlanData.network,
      description: vlanData.description
    })
    .then(docRef => {
      dispatch(
        addVLANSuccess({
          id: docRef.id,
          name: vlanData.name,
          network: vlanData.network,
          description: vlanData.description
        })
      );
    })
    .catch(() => dispatch(addVLANFailure()));
};

export const editVLAN = vlanData => dispatch => {
  db.collection("vlans")
    .doc(vlanData.id)
    .set({
      name: vlanData.name,
      network: vlanData.network,
      description: vlanData.description
    })
    .then(
      dispatch(
        editVLANSuccess({
          name: vlanData.name,
          network: vlanData.network,
          description: vlanData.description,
          id: vlanData.id
        })
      )
    );
};

export const setVLAN = () => dispatch => {
  db.collection("vlans")
    .get()
    .then(querySnapshot => {
      let list = [];
      querySnapshot.forEach(function(doc) {
        list.push({
          id: doc.id,
          description: doc.data().description,
          network: doc.data().network,
          name: doc.data().name
        });
      });
      return list;
    })
    .then(list => dispatch(setVLANList(list)));
};

export * from "./vlan";
