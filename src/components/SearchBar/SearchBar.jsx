import s from "./SearchBar.module.css";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { FaSearch } from "react-icons/fa";

// Компонент SearchBar принимает пропс handleChangeQuery, который используется для обработки нового запроса
const SearchBar = ({ handleChangeQuery }) => {
  // Локальное состояние для отслеживания введенного текста в поисковой строке
  const [search, setSearch] = useState("");

  // Обработчик отправки формы
  const handleSubmit = (e) => {
    e.preventDefault();

    // Проверяем, пуст ли запрос, и показываем уведомление об ошибке, если он пустой
    if (search.trim() === "") {
      toast.error("Please enter a search query!");
      return;
    }

    // Вызываем функцию handleChangeQuery с очищенным (trim) значением поискового запроса
    handleChangeQuery(search.trim());

    // Очищаем строку поиска после отправки
    setSearch("");
  };

  return (
    <header className={s.header}>
      <form onSubmit={handleSubmit} className={s.form}>
        <div className={s.input_form}>
          <button type="submit" className={s.button}>
            <FaSearch size={20} className={s.search_icon} />{" "}
          </button>
          <input
            className={s.input}
            type="text"
            autoComplete="off"
            autoFocus // Фокусируемся на поле ввода при загрузке страницы
            placeholder="Search images and photos"
            value={search} // Привязываем значение к состоянию search
            onChange={(e) => setSearch(e.target.value)} // Обновляем состояние при изменении текста
          />
        </div>
      </form>
    </header>
  );
};

export default SearchBar;
