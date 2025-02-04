import s from "./LoadMoreBtn.module.css";
// Компонент LoadMoreBtn принимает пропс handleChangePage для обработки клика по кнопке
const LoadMoreBtn = ({ handleChangePage }) => {
  // console.log("Load More ");

  return (
    <div className={s.Container}>
      <button
        onClick={handleChangePage}
        className={s.LoadMoreBtn}
        type="button"
      >
        Load More
      </button>
    </div>
  );
};

export default LoadMoreBtn;
