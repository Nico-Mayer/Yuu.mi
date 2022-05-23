import db from "../../firestore"
export default async (req) => {
  let addedNewSum = false
  const sumId = req.context.params.id
  //const newSum = await db.collection("summoner").doc(sumId)

  async function addNewSum() {
    db.collection("summoner").doc(sumId).set({ test: "test in the chat" })
  }

  const summonersSnap = await db.collection("summoner").get()
  summonersSnap.forEach((doc) => {
    if (doc.id === sumId) {
      console.log("Summoner mit id = " + doc.id + " in DB Vorhanden")
    } else {
      console.log("Summoner mit id = " + doc.id + " nicht in DB")
    }
  })

  return addedNewSum ? "New Summoner Added" : "No Summoner Added"
}
