'use client'
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Gallery } from "react-grid-gallery";
import ReusableModal from "../Modal/ReactModal";
import FormInput from "../addNewHotel/formInput";

const HotelDetailsComponent = ({
  loading,
  data,
  handleChange,
  disabled,
  editButtonHandler,
  buttonData,
  imageData,
  handleImageDataChange
}: any) => {
  const [images, setImages] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalData, setModalData]: any = useState(null);
  const [editedModalData, setEditedModalData]: any = useState(null);

  useEffect(() => {
    const images = imageData.map((data: any) => {
      let randomNumber = Math.floor(Math.random() * (340 - 450 + 1)) + 320;
      return {
        src: data.imageUrl,
      caption: "Hotel Image",
      width: randomNumber,
      height: 174,
      id: data.imageId,
    }
  });
    setImages(images);
  }, [imageData]);

  const handleModalClose = () => {
    setModal(false);
  };

  const handleImageClick = (index: number, item: any, event: any) => {
    const image = imageData.filter(
      (element: { imageId: number }) => element.imageId === item.id
    );
    setModalData(image[0]); // Set initial modal data
    setEditedModalData(image[0]); // Initialize edited modal data
    setModal(true);
  };

  const handleImageUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedModalData({
      ...editedModalData,
      [name]: value,
    });
    setModalData({
      ...modalData,
      [name]: value,
    });
  };

  const handleSave = () => {
    // Update imageDataState with editedModalData
    const updatedImageData = imageData.map((image: any) =>
      image.imageId === editedModalData.imageId ? editedModalData : image
    );
    handleImageDataChange(updatedImageData)
    setModal(false);
  };

  const modalContent = (
    <>
      <Row>
        <Col>
          <div>
            <label htmlFor="imageTitle">Image Title</label>
            <input
              type="text"
              value={editedModalData?.imageTitle || ""}
              onChange={handleImageUpdate}
              name="imageTitle"
              id="imageTitle"
              className="form-control"
            />
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="mt-3 mb-3">
            <label htmlFor="imageUrl">Image URL</label>
            <input
              type="text"
              value={editedModalData?.imageUrl || ""}
              onChange={handleImageUpdate}
              name="imageUrl"
              id="imageUrl"
              className="form-control"
            />
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div>
            <h5>Preview</h5>
            <img
              src={editedModalData?.imageUrl || ""}
              alt="Preview"
              className="img-fluid"
              style={{
                border: "0.5px solid gray",
                borderRadius: "20px",
                width: "100%",
                padding: "0.5vh",
              }}
            />
          </div>
        </Col>
      </Row>
    </>
  );

  return (
    <div className="hoteldetails m-5">
      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <l-orbit size="35" speed="1.5" color="red"></l-orbit>
        </div>
      ) : (
        <div>
          <ReusableModal
            show={modal}
            handleClose={handleModalClose}
            title="Edit Image Details"
            children={modalContent}
            onSave={handleSave}
          />
          <Row>
            <Col sm={12} md={12} lg={6}>
              <div className="mt-5">
                <h3 className="text-center mb-3">Hotel Images</h3>
                <Gallery
                  images={images}
                  id={data.id}
                  onSelect={handleImageClick}
                />
              </div>
            </Col>
            <Col>
              <div className="details d-flex align-items-center flex-column">
                <h4 className="text-center mt-3">Hotel Details</h4>
                <Container>
                  <Col>
                    <Row>
                      <FormInput
                        label="Hotel Name"
                        value={data.hotelName}
                        placeholder=""
                        onChangeEvent={handleChange}
                        type="text"
                        name="hotelName"
                        disabled={disabled}
                      />
                      <FormInput
                        label="Hotel Email"
                        value={data.hotelEmailId}
                        placeholder=""
                        onChangeEvent={handleChange}
                        type="text"
                        name="hotelEmailId"
                        disabled={disabled}
                      />
                    </Row>
                    <Row>
                      <FormInput
                        disabled={disabled}
                        label="Hotel Contact"
                        value={data.hotelContactNumber}
                        placeholder=""
                        onChangeEvent={handleChange}
                        type="text"
                        name="hotelContactNumber"
                      />
                      <FormInput
                        disabled={disabled}
                        label="Hotel Address"
                        value={data.hotelAddress}
                        placeholder=""
                        onChangeEvent={handleChange}
                        type="text"
                        name="hotelAddress"
                      />
                    </Row>
                    <Row>
                      <FormInput
                        disabled={disabled}
                        label="Hotel State"
                        value={data.hotelState}
                        placeholder=""
                        onChangeEvent={handleChange}
                        type="text"
                        name="hotelState"
                      />
                      <FormInput
                        disabled={disabled}
                        label="Hotel Pincode"
                        value={data.hotelPincode}
                        placeholder=""
                        onChangeEvent={handleChange}
                        type="text"
                        name="hotelPincode"
                      />
                    </Row>
                    <Row>
                      <Col>
                        <FormInput
                          disabled={disabled}
                          label="Image Url"
                          value={data.hotelImageUrl}
                          placeholder=""
                          onChangeEvent={handleChange}
                          type="text"
                          name="hotelImageUrl"
                        />
                      </Col>
                    </Row>
                  </Col>
                  <Button
                    className="btn btn-primary mt-3"
                    id="editButton"
                    onClick={editButtonHandler}
                  >
                    {buttonData}
                  </Button>
                </Container>
              </div>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default HotelDetailsComponent;
