//Configuracion de firebase
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCVI7TOxOsaQ0zApLLgZxpBW9_78LPxQk8",
  authDomain: "gestedu-4b92d.firebaseapp.com",
  projectId: "gestedu-4b92d",
  storageBucket: "gestedu-4b92d.appspot.com",
  messagingSenderId: "648304797890",
  appId: "1:648304797890:web:7cdd9694e8097da5d4335b"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const fbStorage = getStorage(app);

export { fbStorage };