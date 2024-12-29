// LoadMoreBtn.jsx
import s from "./LoadMoreBtn.module.css";

const LoadMoreBtn = ({ handleChangePage }) => {
  // console.log("Load More button clicked"); // Лог для проверки
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
