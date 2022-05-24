/* import { getFirestore } from "firebase-admin/firestore";
import { initializeApp, getApps, cert } from "firebase-admin/app";

const apps = getApps();
if (!apps.length) {
  initializeApp({
    credential: cert("./yuumi-dc6a7-firebase-adminsdk-24o7p-6b16c6b017.json"),
  });
}

export default async (req) => {
  console.log(req);
  const db = getFirestore();
  const summonersSnap = await db.collection("summoner").get();
  const summonersData = summonersSnap.docs.map((doc) => {
    return { ...doc.data() };
  });
  return summonersData;
};
 */
