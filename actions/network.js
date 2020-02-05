import { db } from "../firebase/firebase";

export const ADD_NETWORK_REQUEST = "ADD_NETWORK_REQUEST";
export const ADD_NETWORK_SUCCESS = "ADD_NETWORK_SUCCESS";
export const ADD_NETWORK_FAILURE = "ADD_NETWORK_FAILURE";
export const SET_NETWORK_LIST = "SET_NETWORK_LIST";
export const FALSE_ADDED_NETWORK = "FALSE_ADDED_NETWORK";
export const DELETE_NETWORK_SUCCESS = "DELETE_NETWORK_SUCCESS";
export const DELETE_NETWORK_REQUEST = "DELETE_NETWORK_REQUEST";
export const DELETE_NETWORK_FAILURE = "DELETE_NETWORK_FAILURE";
export const EDIT_NETWORK_SUCCESS = "EDIT_NETWORK_SUCCESS";
export const DELETE_EDIT_NETWORK = "DELETE_EDIT_NETWORK";
export const SET_EDIT_NETWORK_NULL = "SET_EDIT_NETWORK_NULL";
export const ADD_TO_EDIT_NETWORK = "ADD_TO_EDIT_NETWORK";
export const ADD_TO_DETAILS_NETWORK = "ADD_TO_DETAILS_NETWORK";
export const SET_BACK_TO_DETAILS = "SET_BACK_TO_DETAILS";
export const DELETE_EDIT_HOST_NETWORK = "DELETE_EDIT_HOST_NETWORK";
export const SET_ADDED_HOST_TO_NETWORK = "SET_ADDED_HOST_TO_NETWORK";
export const ADD_EDIT_HOST_NETWORK = "ADD_EDIT_HOST_NETWORK";

const addNetworkRequest = () => {
  return {
    type: ADD_NETWORK_REQUEST
  };
};

const addNetworkSuccess = network => {
  return {
    type: ADD_NETWORK_SUCCESS,
    network: network
  };
};

const addNetworkFailure = () => {
  return {
    type: ADD_NETWORK_FAILURE
  };
};

const setNetworkList = list => {
  return {
    type: SET_NETWORK_LIST,
    list: list
  };
};

export const deleteEditNetwork = () => {
  return {
    type: DELETE_EDIT_NETWORK
  };
};

export const setEditNetworkNull = () => {
  return {
    type: SET_EDIT_NETWORK_NULL
  };
};

export const falseAddedNetwork = () => {
  return {
    type: FALSE_ADDED_NETWORK
  };
};

const deleteNetworkSuccess = id => {
  return {
    type: DELETE_NETWORK_SUCCESS,
    id: id
  };
};

const deleteNetworkRequest = () => {
  return {
    type: DELETE_NETWORK_REQUEST
  };
};

const deleteNetworkFailure = () => {
  return {
    type: DELETE_NETWORK_FAILURE
  };
};

const editNetworkSuccess = networkData => {
  return {
    type: EDIT_NETWORK_SUCCESS,
    network: networkData
  };
};

export const addToEditNetwork = networkData => {
  return {
    type: ADD_TO_EDIT_NETWORK,
    network: networkData
  };
};

export const addDetailsNetwork = networkData => {
  return {
    type: ADD_TO_DETAILS_NETWORK,
    network: networkData
  };
};

export const setBackToDetails = ans => {
  return {
    type: SET_BACK_TO_DETAILS,
    bool: ans
  };
};

export const addEditHostNetwork = hostData => {
  return {
    type: ADD_EDIT_HOST_NETWORK,
    host: hostData
  };
};

export const deleteEditHostNetwork = () => {
  return {
    type: DELETE_EDIT_HOST_NETWORK
  };
};

export const setAddedHostToNetwork = ans => {
  return {
    type: SET_ADDED_HOST_TO_NETWORK,
    bool: ans
  };
};

export const deleteNetwork = id => dispatch => {
  dispatch(deleteNetworkRequest());
  db.collection("networks")
    .doc(id)
    .delete()
    .then(dispatch(deleteNetworkSuccess(id)))
    .catch(() => dispatch(deleteNetworkFailure()));
};

export const addNetwork = networkData => dispatch => {
  dispatch(addNetworkRequest());
  db.collection("networks")
    .add({
      address: networkData.address,
      description: networkData.description,
      zone: networkData.zone,
      vlan: networkData.vlan,
      assign: networkData.assign,
      dns: networkData.dns,
      routable: networkData.routable,
      hosts: []
    })
    .then(docRef => {
      dispatch(
        addNetworkSuccess({
          id: docRef.id,
          address: networkData.address,
          description: networkData.description,
          zone: networkData.zone,
          vlan: networkData.vlan,
          assign: networkData.assign,
          dns: networkData.dns,
          routable: networkData.routable,
          hosts: []
        })
      );
    })
    .catch(() => dispatch(addNetworkFailure()));
};

export const editNetwork = networkData => dispatch => {
  db.collection("networks")
    .doc(networkData.id)
    .set({
      address: networkData.address,
      description: networkData.description,
      zone: networkData.zone,
      vlan: networkData.vlan,
      assign: networkData.assign,
      dns: networkData.dns,
      routable: networkData.routable,
      hosts: networkData.hosts
    })
    .then(
      dispatch(
        editNetworkSuccess({
          address: networkData.address,
          description: networkData.description,
          zone: networkData.zone,
          vlan: networkData.vlan,
          assign: networkData.assign,
          dns: networkData.dns,
          routable: networkData.routable,
          id: networkData.id,
          hosts: networkData.hosts
        })
      )
    );
};

export const setNetwork = () => dispatch => {
  db.collection("networks")
    .get()
    .then(querySnapshot => {
      let list = [];
      querySnapshot.forEach(function(doc) {
        list.push({
          id: doc.id,
          address: doc.data().address,
          description: doc.data().description,
          zone: doc.data().zone,
          vlan: doc.data().vlan,
          assign: doc.data().assign,
          dns: doc.data().dns,
          routable: doc.data().routable,
          hosts: doc.data().hosts
        });
      });
      return list;
    })
    .then(list => dispatch(setNetworkList(list)));
};

export const addHostToNetwork = (networkData, hostData) => dispatch => {
  var hostsList = networkData.hosts;
  hostsList.push(hostData);
  networkData.hosts = [...hostsList];
  dispatch(editNetwork(networkData));
  dispatch(addDetailsNetwork(networkData));
  dispatch(setAddedHostToNetwork(true));
};

export const editHostInNetwork = (networkData, hostData, oldIP) => dispatch => {
  var hostsList = networkData.hosts;
  var elemID = hostsList.findIndex(x => x.address === oldIP);
  hostsList[elemID] = hostData;
  networkData.hosts = [...hostsList];
  dispatch(editNetwork(networkData));
  dispatch(addDetailsNetwork(networkData));
  dispatch(setAddedHostToNetwork(true));
};

export const deleteHostFromNetwork = (networkData, hostData) => dispatch => {
  var hostsList = networkData.hosts;
  var elemID = hostsList.findIndex(x => x.address === hostData.address);
  hostsList.splice(elemID, 1);
  networkData.hosts = [...hostsList];
  dispatch(editNetwork(networkData));
  dispatch(addDetailsNetwork(networkData));
};

export * from "./network";
