import Modal from "react-modal";
import s from "./ImageModal.module.css";

const ImageModal = ({ isOpen, onClose, image }) => {
  const closeModal = () => {
    onClose(); // Закрытие модального окна через переданную функцию
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal} // Обработчик закрытия модального окна
      contentLabel="Image Modal" // Тег для доступности, описывает содержимое модального окна
      className={s.modal}
      overlayClassName={s.overlay} // Применяет стили для фона (области вокруг модального окна)
      shouldCloseOnEsc={true} // Указывает, что модальное окно можно закрыть при нажатии клавиши Esc
      ariaHideApp={false} // Отключает скрытие главного приложения для доступности
    >
      {/* Контейнер для содержимого модального окна */}
      <div className={s.modal_content} onClick={closeModal}>
        <img
          className={s.img}
          src={image?.urls?.regular}
          alt={image?.alt_description}
        />
        <p style={{ textAlign: "center" }}>
          {image ? image.alt_description : ""}
        </p>
      </div>
    </Modal>
  );
};

export default ImageModal;
