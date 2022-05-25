import db from "../../firestore"
export default async (req) => {
  let sumDbData
  const sumId = req.context.params.id
  const summonersSnap = await db.collection("summoner").get()

  summonersSnap.forEach((doc) => {
    if (doc.id === sumId) {
      sumDbData = doc.data()
    }
  })

  return sumDbData
}
