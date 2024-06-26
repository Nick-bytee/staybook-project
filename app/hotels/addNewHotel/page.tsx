"use client";

import { HotelDetails } from "@/lib/classes/hotelDetails";
import { useState } from "react";
import "./page.css";
import { format } from "date-fns";
import "react-notifications/lib/notifications.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FormInput from "./formInput";
import { addHotelDetailsInFirebaseCollection } from "@/lib/firebase/create/createData";
import ImageGallery from "./imageGallery";
import { toast } from "sonner";
const dashify = require("dashify");

export default function AddNewHotelPage() {
  const [hotelData, setHotelData] = useState<HotelDetails>({
    hotelName: "",
    hotelEmailId: "",
    hotelContactNumber: "",
    hotelStarRating: "",
    hotelImageUrl: "",
    hotelAddress: "",
    hotelState: "",
    hotelPincode: "",
    hotelSlug: "",
    hotelCity: "",
    createdAt: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"),
    updatedAt: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"),
  });

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setHotelData({
      ...hotelData,
      [name]: value,
      ["hotelSlug"]: dashify(hotelData.hotelName + hotelData.hotelState),
    });
  };

  const [imageUrls, setImageUrls] = useState([
    {
      imageUrl: "",
      imageId: "",
      imageTitle: "",
    },
  ]);

  const handleAddImage = () => {
    setImageUrls([...imageUrls, { imageUrl: "", imageId: "", imageTitle: "" }]);
  };

  const handleImageChange = (index: number, value: string) => {
    const newImageUrls = [...imageUrls];
    newImageUrls[index].imageUrl = value;
    newImageUrls[index].imageId = Date.now().toString();
    const urlSegments = value.split("/");
    const fileName = urlSegments[urlSegments.length - 1];
    newImageUrls[index].imageTitle = fileName.split(".")[0];
    setImageUrls(newImageUrls);
  }

  const handleDeleteImage = (index : string) => {
      const newImageUrls = [...imageUrls]
      newImageUrls.splice(parseInt(index),1)
      setImageUrls(newImageUrls)
  }

  const clearState = () => {
    setHotelData({
      hotelName: "",
      hotelEmailId: "",
      hotelContactNumber: "",
      hotelStarRating: "",
      hotelImageUrl: "",
      hotelAddress: "",
      hotelState: "",
      hotelPincode: "",
      hotelSlug: "",
      hotelCity: "",
      createdAt: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"),
      updatedAt: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"),
    });
  };

  const handleFormSubmission = async (event: any) => {
    event.preventDefault();
    const res = await addHotelDetailsInFirebaseCollection(
      "HotelCollection",
      hotelData,
      imageUrls
    );

    if (res.status === "OK") {
      // NotificationManager.success('Hotel Added Successfully')
      console.log("submission done");
      toast.success("Hotel Added Successfully")
      // clearState();
    } else {
      // NotificationManager.error('An Error Occured')
    }
  };

  // add components to utilize them and reuse them insted of using a input field again and again
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center add-hotel"
      style={{ backgroundColor: "#fcfcff" }}
    >
      <h3 className="mt-5">Add New Hotel</h3>
      <form onSubmit={handleFormSubmission}>
        <Container fluid="md">
          <Row>
            <Col>
              <FormInput
                disabled={false}
                label="Hotel Name"
                placeholder="Enter Hotel Name"
                type="text"
                value={hotelData.hotelName}
                onChangeEvent={handleChange}
                name="hotelName"
              ></FormInput>
            </Col>
            <Col>
              <FormInput
                disabled={false}
                label="Hotel Email"
                placeholder="Enter Hotel Email"
                type="text"
                value={hotelData.hotelEmailId}
                onChangeEvent={handleChange}
                name="hotelEmailId"
              ></FormInput>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormInput
                disabled={false}
                label="Hotel Contact No"
                placeholder="Enter Contact No"
                type="number"
                value={hotelData.hotelContactNumber}
                onChangeEvent={handleChange}
                name="hotelContactNumber"
              ></FormInput>
            </Col>
            <Col>
              <FormInput
                disabled={false}
                label="Hotel Rating"
                placeholder="Rate Out of 5"
                type="number"
                value={hotelData.hotelStarRating}
                onChangeEvent={handleChange}
                name="hotelStarRating"
              ></FormInput>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormInput
                disabled={false}
                label="Image Url"
                placeholder="Enter URL"
                type="text"
                value={hotelData.hotelImageUrl}
                onChangeEvent={handleChange}
                name="hotelImageUrl"
              ></FormInput>
            </Col>
            <Col>
              <FormInput
                disabled={false}
                label="Hotel Address"
                placeholder="Enter Address"
                type="text"
                value={hotelData.hotelAddress}
                onChangeEvent={handleChange}
                name="hotelAddress"
              ></FormInput>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormInput
                disabled={false}
                label="State"
                placeholder="Enter State"
                type="text"
                value={hotelData.hotelState}
                onChangeEvent={handleChange}
                name="hotelState"
              ></FormInput>
            </Col>
            <Col>
              <FormInput
                disabled={false}
                label="Pincode"
                placeholder="Enter Pincode"
                type="number"
                value={hotelData.hotelPincode}
                onChangeEvent={handleChange}
                name="hotelPincode"
              ></FormInput>
            </Col>
          </Row>
        </Container>
        <Container>
          <ImageGallery handleChange={handleImageChange} imageUrls={imageUrls} handleAddImage={handleAddImage} deleteImage={handleDeleteImage}/>
        </Container>
      </form>
      {/* <NotificationContainer/> */}
    </div>
  );
}
