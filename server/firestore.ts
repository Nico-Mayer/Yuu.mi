import { getFirestore } from "firebase-admin/firestore"
import { initializeApp, getApps, cert } from "firebase-admin/app"

const apps = getApps()

const serviceAccount = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string
)

if (!apps.length) {
  initializeApp({
    credential: cert(serviceAccount),
  })
}

const db = getFirestore()

export default db
