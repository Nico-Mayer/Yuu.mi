import db from "../../firestore"
export default async (req) => {
  const collection = await db.collection("summoner")

  addNewSum()

  async function addNewSum() {
    collection.doc("123").set({ test: "test in the chat" })
  }

  return null
}
