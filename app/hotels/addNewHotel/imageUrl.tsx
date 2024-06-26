import React from 'react'
import { Button } from 'react-bootstrap'

const ImageUrl = ({imageUrls, handleUrlChange, disabled, handleRemoveUrlField, handleAddUrlField} : any) => {

  return (
    <div>
    {imageUrls.map((url : string, index : number) => (
      <div key={index} className="mb-2">
        <input
          type="text"
          value={url}
          onChange={(event) => handleUrlChange(index, event)}
          placeholder="Enter image URL"
          className="form-control"
          disabled={disabled}
        />
        <Button variant="danger" onClick={() => handleRemoveUrlField(index)} disabled={disabled}>
          Remove
        </Button>
      </div>
    ))}
    <Button variant="primary" onClick={handleAddUrlField} disabled={disabled}>
      Add Image URL
    </Button>
  </div>
  )
}

export default ImageUrl