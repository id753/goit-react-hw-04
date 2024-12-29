import Modal from 'react-modal';
import s from "./ImageModal.module.css";

const ImageModal = ({ isOpen, onClose, image }) => {
  const closeModal = () => {
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Image Modal"
      className={s.modal}
      overlayClassName={s.overlay}
      shouldCloseOnEsc={true} // Явно указываем, что можно закрывать на Esc
      ariaHideApp={false}
    >
      <div className={s.modal_content} onClick={closeModal}>
        <img 
        className={s.img} 
        src={image?.urls?.regular} 
        alt={image?.alt_description} 
        
        />
        <p style={{ textAlign: "center" }}>{image ? image.alt_description : ""}</p>
      </div>
    </Modal>
  );
};

export default ImageModal;
