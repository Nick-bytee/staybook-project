import { setDoc, doc } from "firebase/firestore"; 
import { db } from "../firebaseConfig";
/* 
    implement function to update individual key and value fields from the firebase document
    handle number and string value updation in the same function
    update the updatedAt time with the same format when any key gets updated in the document
*/
export const updateKeyAndValueFromDocument = async(data : {hotelSlug : string}) => {
    const docRef = doc(db, 'HotelCollection', data.hotelSlug)
    const res = await setDoc(docRef, data, {merge : true})
    return res
};

// implement function to update the object inside the hotelImagesList from the firebase document

export const updateObjectsIndsideArray = async (data: any, imagesData: any[]) => {
  const promises = imagesData.map(async (image: any) => {
    const docRef = doc(db, 'HotelCollection', data.hotelSlug, 'imagesCollection', image.imageId);
    await setDoc(docRef, image, { merge: true });
  });
  await Promise.all(promises);
};

