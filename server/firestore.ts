import { getFirestore } from "firebase-admin/firestore"
import { initializeApp, getApps, cert } from "firebase-admin/app"

const apps = getApps()

if (!apps.length) {
  initializeApp({
    credential: cert("firestoreCert.json"),
  })
}

const db = getFirestore()

export default db
