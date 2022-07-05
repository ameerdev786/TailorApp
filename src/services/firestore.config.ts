import firebase from 'firebase';
import "firebase/storage"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAkfn9uYBeoknJjQ8-w-gUa6Vj9LM-YpOA",
//   authDomain: "tailor-app-native.firebaseapp.com",
//   projectId: "tailor-app-native",
//   storageBucket: "tailor-app-native.appspot.com",
//   messagingSenderId: "966781888141",
//   appId: "1:966781888141:web:12aa1281e2e5a83ddda4c4",
//   measurementId: "G-37P2CBMSRQ"
// };

// ameer config
const firebaseConfig = {
  apiKey: "AIzaSyDyJQLcmorkynk25OWE2I4Qo0W85Beh2WA",
  authDomain: "tailer-app.firebaseapp.com",
  projectId: "tailer-app",
  storageBucket: "tailer-app.appspot.com",
  messagingSenderId: "384387248628",
  appId: "1:384387248628:web:97a714f62df5de1f5409a1",
  measurementId: "G-3ZBWP24T18"
};

export const app = firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore(app);
export const auth = firebase.auth();
export const storage = firebase.storage();



