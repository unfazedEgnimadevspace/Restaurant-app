import { getApps, getApp, initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAux3QrAM0qjs4b7FFwsUYLqi4ggGVA-7Y",
  authDomain: "restaurant-app-caf75.firebaseapp.com",
  databaseURL: "https://restaurant-app-caf75-default-rtdb.firebaseio.com",
  projectId: "restaurant-app-caf75",
  storageBucket: "restaurant-app-caf75.appspot.com",
  messagingSenderId: "768029187442",
  appId: "1:768029187442:web:5902cbf9b03994fe7391eb",
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage };
