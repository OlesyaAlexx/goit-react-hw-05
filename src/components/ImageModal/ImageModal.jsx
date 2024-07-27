import Modal from "react-modal";
import styles from "./ImageModal.module.css";

Modal.setAppElement("#root");

const ImageModal = ({ image, onClose }) => {
  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      onClose();
    }
  };

  if (!image || !image.urls || !image.urls.regular) {
    return null; // Не рендерити нічого, якщо дані неповні
  }

  return (
    <Modal
      isOpen={!!image}
      onRequestClose={onClose}
      onKeyDown={handleKeyDown}
      contentLabel="Image Modal"
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <div className={styles.modalContent}>
        <button onClick={onClose} className={styles.closeButton}>
          X
        </button>
        <img src={image.urls.regular} className={styles.modalImage} />
      </div>
    </Modal>
  );
};

export default ImageModal;
