"use client";
import { db } from "@/lib/firebase/firebaseConfig";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import "./page.css";
import { format } from "date-fns";
import { updateKeyAndValueFromDocument, updateObjectsIndsideArray } from "@/lib/firebase/update/updateData";
import { toast } from "sonner";
import { orbit } from "ldrs";
import dynamic from "next/dynamic";
import HotelDetailsComponent from "./hotelDetail";
// const HotelDetailsComponent = dynamic(() => import("./hotelDetail"), {
//   ssr: false,
// });

export default function Page({ params }: { params: { hotelSlug: string } }) {
  const [disabled, setDisabled] = useState(true);
  const [imagesData, setImagesData] = useState([]);
  const [buttonData, setButtonData] = useState("Edit Data");
  const slug = params.hotelSlug;
  const [data, setData] : any = useState([]);
  const [loading, setLoading] = useState(disabled);

  useEffect(() => {
    const docRef = doc(db, "HotelCollection", slug);
    const imagesRef = query(collection(db, 'HotelCollection', slug, 'imagesCollection'));
    orbit.register();
    const getData = async () => {
      const docSnap = await getDoc(docRef);
      const imagesDocSnap = await getDocs(imagesRef);
      if (docSnap.exists()) {
        const hotelData : any= docSnap.data();
        const tempData: any = [];
        imagesDocSnap.forEach((doc) => {
          tempData.push(doc.data());
        });
        setImagesData(tempData);
        setData(hotelData);
        setLoading(false);
      } else {
        console.log("No Data Found");
      }
    };
    getData();
  }, []);

  const handleChange = (e: any) => {
    if (data) {
      setData({
        ...data,
        [e.target.name]: e.target.value,
        updatedAt: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"),
      });
    }
  };

  const handleImageDataChange = async(imageData : any) => {
    await updateObjectsIndsideArray(data, imageData);
    setImagesData(imageData)
    toast.success('Updated Successfully')
  } 

  const editButtonHandler = async (e: any) => {
    if (disabled) {
      e.preventDefault();
      setDisabled(false);
      setButtonData("Save");
    } else {
      setDisabled(true);
      setButtonData("Saving...");
      const res = await updateKeyAndValueFromDocument(data);
      await updateObjectsIndsideArray(data, imagesData);
      toast.success("Data Updated Successfully");
      setButtonData("Edit Data");
    }
  };

  return (
    <HotelDetailsComponent
      loading={loading}
      data={data}
      handleChange={handleChange}
      disabled={disabled}
      editButtonHandler={editButtonHandler}
      buttonData={buttonData}
      imageData={imagesData}
    handleImageDataChange = {handleImageDataChange}
    />
  );
}
