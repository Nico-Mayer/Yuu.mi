import { getFirestore } from "firebase-admin/firestore"
import { initializeApp, getApps, cert } from "firebase-admin/app"

const apps = getApps()

const firebaseConfig = {
  apiKey: "AIzaSyCfX-fqn5Oy_Hl1q_ewHxxPM0JqSxBTPHw",
  authDomain: "yuumi-dc6a7.firebaseapp.com",
  projectId: "yuumi-dc6a7",
  storageBucket: "yuumi-dc6a7.appspot.com",
  messagingSenderId: "415743833779",
  appId: "1:415743833779:web:f5153f9872ced3ab83a2c6",
}
if (!apps.length) {
  initializeApp({
    credential: cert("firestoreCert.json"),
  })
}

const db = getFirestore()

export default db
