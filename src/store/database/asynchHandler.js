import * as actionCreators from '../actions/actionCreators.js'

export const loginHandler = ({ credentials, firebase }) => (dispatch, getState) => {
    firebase.auth().signInWithEmailAndPassword(
      credentials.email,
      credentials.password,
    ).then(() => {
      console.log("LOGIN_SUCCESS");
      dispatch({ type: 'LOGIN_SUCCESS' });
    }).catch((err) => {
      dispatch({ type: 'LOGIN_ERROR', err });
    });
  };

export const logoutHandler = (firebase) => (dispatch, getState) => {
    firebase.auth().signOut().then(() => {
        dispatch(actionCreators.logoutSuccess);
    });
};

export const registerHandler = (newUser, firebase) => (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firebase.auth().createUserWithEmailAndPassword(
        newUser.email,
        newUser.password,
    ).then(resp => firestore.collection('users').doc(resp.user.uid).set({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        initials: `${newUser.firstName[0]}${newUser.lastName[0]}`,
    })).then(() => {
        dispatch(actionCreators.registerSuccess);
    }).catch((err) => {
        dispatch(actionCreators.registerError);
    });
};
export const newListHandler = (todoLists, firebase, list) => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  firestore.collection("todoLists").add({
    "name": list.name,
    "owner": list.owner,
    "items": list.items,
    "last_updated": list.last_updated

  })
};

export const updatedListHandler = (todoList) => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  firestore.collection("todoLists").doc(todoList.id).update({
    "name":todoList.name,
    "owner":todoList.owner,
    "items": todoList.items,
    "last_updated": new Date()
  })

};

export const addItemHandler = (todoList) => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  firestore.collection("todoLists").doc(todoList.id).update({
    "items": todoList.items,

  })

};

export const editItemHandler = (todoList) => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  firestore.collection("todoLists").doc(todoList.id).update({
    "items": todoList.items,

  })

};

export const sortTasksHandler = (list, todoList) => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  firestore.collection("todoLists").doc(list.id).update({
    "items": todoList,

  })

};

export const sortDueDatesHandler = (list, todoList) => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  firestore.collection("todoLists").doc(list.id).update({
    "items": todoList,

  })

};

export const sortCompletedHandler = (list, todoList) => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  firestore.collection("todoLists").doc(list.id).update({
    "items": todoList,

  })

};

