// add function to read the data from firebase collection
import { query, orderBy, startAfter, collection, getDocs, limit } from "firebase/firestore"; 
import { db } from "../firebaseConfig";

export const readDataFromFirebaseCollection = async() => {
    const first = query(collection(db, "HotelCollection"), limit(5));
    const snapshot = await getDocs(first)

    const lastVisible = snapshot.docs[snapshot.docs.length-1];
    return {snapshot, lastVisible}
}

export const readPaginationDataFromFireBase = async(lastDoc:any) => {
    try {
        let docRef = collection(db, 'HotelCollection')
        let q = query(docRef, startAfter(lastDoc), limit(2))
        const snapshot = getDocs(q)
        return snapshot
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
}