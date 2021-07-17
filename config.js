import  firebase from "firebase/app";
require ("@firebase/firestore");
  
  var firebaseConfig = {
    apiKey: "AIzaSyBmfmmsdKP2QgLArInNic73Bfz-YjEi-Pk",
    authDomain: "willyapp-1f707.firebaseapp.com",
    projectId: "willyapp-1f707",
    storageBucket: "willyapp-1f707.appspot.com",
    messagingSenderId: "81574172929",
    appId: "1:81574172929:web:9ef986cf82c29d36b2a300"
  };
  // Initialize Firebase
  
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();
