import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { HotelDetails, ImagesList } from "../../classes/hotelDetails";

export const addHotelDetailsInFirebaseCollection = async (
  collectionName: string,
  hotelData: HotelDetails,
  imageData : any
) => {
  console.log("collectionName >>", collectionName);
  console.log("hotelData >>", hotelData);

  const docRef = doc(db, collectionName, hotelData.hotelSlug);
  try {
    const isExsist = await getDoc(docRef);
    if (isExsist.exists()) {
      return {
        status: "FAILED",
        data: {
          error: `document already exsist with the slug provide ${hotelData.hotelSlug}`,
        },
      };
    }

    // create a new instance of the hotelDetails class into data variable
    let data : any = {};

    // set the data accordingly
    data.hotelName = hotelData.hotelName;
    data.hotelEmailId = hotelData.hotelEmailId;
    data.hotelContactNumber = hotelData.hotelContactNumber;
    data.hotelStarRating = hotelData.hotelStarRating;
    data.hotelImageUrl = hotelData.hotelImageUrl;
    data.hotelAddress = hotelData.hotelAddress;
    data.hotelState = hotelData.hotelState;
    data.hotelCity = hotelData.hotelCity;
    data.hotelPincode = hotelData.hotelPincode;
    data.hotelSlug = hotelData.hotelSlug;

    // you can leave createdAt and updatedAt because they will have the current time by default which is specified in the classModel
    // data.createdAt = "";
    // data.updatedAt = "";

    // finally add the document in the firebase database
    await setDoc(docRef, data);
    for (const element of imageData) {
      const {imageId, ...data} = element
      try {
        console.log(imageId, data)
        const docRef = await setDoc(doc(db, collectionName, hotelData.hotelSlug,'imagesCollection', imageId),element);
        console.log('Document written with ID: ', imageId);
      } catch (error) {
        console.error('Error adding document: ', error);
      }
    }

    // return the success message
    return {
      status: "OK",
      data: {
        message: `document added with id ${hotelData.hotelSlug}`,
      },
    };
  } catch (error: any) {
    console.log(error)
    return {
      status: "FAILED",
      data: { error: error?.message || error },
    };
  }
};
