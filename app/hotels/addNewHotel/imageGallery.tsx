"use client";
import React, { useState } from "react";
import { Container, Row, Button, Col, Form } from "react-bootstrap";
import "./page.css";
import { RxCross1 } from "react-icons/rx";


const ImageGallery = ({ imageUrls, handleChange, handleAddImage, deleteImage }: any) => {
  const [isHovered, setIsHovered] = useState(true);
  return (
    <Row>
      <Col>
        <Container className="mt-3">
          <h5>Image Gallery</h5>
          {imageUrls.map((data: any, index: any) => (
            <Row key={index} className="mb-3">
              <Col>
                <Form.Control
                  type="text"
                  placeholder="Enter Image URL"
                  value={data.imageUrl}
                  onChange={(e: any) => handleChange(index, e.target.value)}
                />
              </Col>
            </Row>
          ))}
          <Button onClick={handleAddImage}>Add Image</Button>
          <div className="d-flex justify-content-center mt-3 mb-3">
            <Button type="submit" className="btn btn-success mr-4">
              Add Hotel
            </Button>
          </div>
          <Row>
            {imageUrls.map(
              (data: any, index: any) =>
                data.imageUrl && (
                  <Col
                    key={index}
                    xl={4}
                    className="mb-3"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    <div
                      className="container">
                        <img className="img-fluid hover-image" src={data.imageUrl} alt="hotel image" onClick={() => deleteImage(index)}>
                        </img>
                      {isHovered && <RxCross1 className="hover-button" />}
                    </div>
                  </Col>
                )
            )}
          </Row>
        </Container>
      </Col>
    </Row>
  );
};

export default ImageGallery;
