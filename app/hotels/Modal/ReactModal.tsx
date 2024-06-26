import React from 'react';
import { Modal, Button } from 'react-bootstrap';

interface ReusableModalProps {
  show: boolean;
  handleClose: () => void;
  title: string;
  children: React.ReactNode;
  onSave : () => void
}

const ReusableModal: React.FC<ReusableModalProps> = ({ show, handleClose, title, children, onSave }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {children}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onSave}>
          Save
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ReusableModal;
