import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDAihsngayEzBAZKxOhh5vIu5faPuoL3pw",
  authDomain: "upload-avatar.firebaseapp.com",
  projectId: "upload-avatar",
  storageBucket: "upload-avatar.appspot.com",
  messagingSenderId: "170361846531",
  appId: "1:170361846531:web:96e3d26a67b270449c4736",
};

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

const imagesRef = ref(storage, "images");

const imagesBort = ref(storage, "doyou.jpg");
const imagespath = ref(storage, "images/doyou.jpg");

console.log();

export { storage, firebaseApp };
