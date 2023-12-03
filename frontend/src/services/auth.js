import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyApZCsoGNksL8nGzDdDyI8fdj-lXf4LE_c",
  authDomain: "languages-school-66268.firebaseapp.com",
  projectId: "languages-school-66268",
  storageBucket: "languages-school-66268.appspot.com",
  messagingSenderId: "145696488075",
  appId: "1:145696488075:web:20b5a630304c656817728e"
};


const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export { auth, db, storage };
