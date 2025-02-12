import Modal from "react-modal";
import css from "./ImageModal.module.css";

export default function ImageModal({ isOpen, closeModal, selectedImage }) {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  if (!selectedImage) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Image Modal"
      style={customStyles}
      overlayClassName="Overlay"
    >
      <div className={css.modal}>
        <h2 className={css.title}>
          {selectedImage.alt_description || "Image"}
        </h2>
        <img
          src={selectedImage.urls.regular}
          alt={selectedImage.alt_description}
          style={{ width: "1240px", height: "620px" }}
          className={css.modalImage}
        />
        <button onClick={closeModal} className={css.modalBtn}>
          Close
        </button>
      </div>
    </Modal>
  );
}
