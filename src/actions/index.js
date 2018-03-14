import Firebase from 'firebase';
require ('firebase/firestore');
import {
  AUTH_USER,
  AUTH_ERROR,
  SIGN_OUT_USER,
  FORM_INPUT_CHANGED,
  DATE_INPUT_CHANGED,
  TIME_INPUT_CHANGED,
  TODOS_SUCCESS,
  FETCH_TODOS,
} from '../constants'

var config = {
  apiKey: "AIzaSyDhDydByxCoaoQhrBsiN4FoVW6dqFhcH8I",
  authDomain: "myapp-b1143.firebaseapp.com",
  databaseURL: "https://myapp-b1143.firebaseio.com",
  projectId: "myapp-b1143",
  storageBucket: "myapp-b1143.appspot.com",
  messagingSenderId: "927146059073"
};
Firebase.initializeApp(config);
const firestore = Firebase.firestore();

export function signUp(credentials) {
  return function(dispatch) {
      Firebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password)
          .then(response => {
              dispatch(authUser());
          })
          .catch(error => {
              console.log(error);
              dispatch(authError(error));
          });
          Firebase.auth().onAuthStateChanged(function(user) {
            console.log('user from onAuthStateChanged ', user);
            if (user) {
              firestore.collection("users").doc(`${user.uid}`).set({
              email: user.email,
              uid: user.uid
            }).then(function() {
              console.log("Document successfully written!");
            })
            .catch(function(error) {
              console.error("Error writing document: ", error);
            });
            } else {
              // No user is signed in.
            }
          });
  }
}

export function signIn(credentials) {
    return function(dispatch) {
        Firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
            .then(response => {
                dispatch(authUser());
            })
            .catch(error => {
                dispatch(authError(error));
            });
    }
}

export function signOut() {
  return function (dispatch) {
      Firebase.auth().signOut()
          .then(() =>{
              dispatch({
                  type: SIGN_OUT_USER
              })
          });
  }
}

export function authUser() {
    return {
        type: AUTH_USER
    }
}

export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    }
}

export function verifyAuth() {
    return function (dispatch) {
        Firebase.auth().onAuthStateChanged(user => {
            if (user) {
                dispatch(authUser());
            } else {
                dispatch(signOut());
            }
        });
    }
}

export const onFormTextInputChange = (key, value) => {
  return {
    type: FORM_INPUT_CHANGED,
    payload: {key, value},
  };
}

export const onDateInputChange = (e, date) => {
  return {
    type: DATE_INPUT_CHANGED,
    payload: date,
  };
}

export const onTimeInputChange = (e, time) => {
  return {
    type: TIME_INPUT_CHANGED,
    payload: time,
  };
}

export const saveTodo = (data) => {
  const user = Firebase.auth().currentUser;
  firestore.collection("todos").add({
    id: user.uid,
    title: data.title,
    description: data.description,
    date: data.date,
    time: data.time
  }).then((docRef) => {
    console.log("Document written with ID: ", docRef.id);
  })
  .catch((error) => {
      console.error("Error adding document: ", error);
  });
}

export const onSuccessTodos = (todos) => {
  console.log('calling success todos ', todos);
  return {
    type: TODOS_SUCCESS,
    payload: todos,
  };
}

export const fetchTodos = () => {
  return function (dispatch) {
    const user = Firebase.auth().currentUser;
    firestore.collection("todos").where("id", "==", user.uid)
    .get()
    .then(function(querySnapshot) {
      const todos = []
      querySnapshot.forEach((doc) => {
        todos.push(doc.data());
      });
      console.log('docs array ', todos);
      dispatch(onSuccessTodos(todos));
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
  }
}
