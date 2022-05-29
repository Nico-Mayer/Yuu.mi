import { getFirestore } from "firebase-admin/firestore"
import { initializeApp, getApps, cert } from "firebase-admin/app"

const apps = getApps()

if (!apps.length) {
  initializeApp({
    credential: cert({
      projectId: process.env.VITE_PROJECT_ID,
      clientEmail: process.env.VITE_CLIENT_EMAIL,
      privateKey: process.env.VITE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  })
}

const db = getFirestore()

export default db
