import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";

import { Toaster } from "react-hot-toast";
import axios from "axios";
import { toast } from "react-hot-toast";

import "./App.css";

import { useState, useEffect } from "react"; // useState — для управления состоянием, useEffect — для побочных эффектов

const App = () => {
  // Создаем состояния приложения
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(1); // Текущая страница загрузки данных
  const [query, setQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null); // Выбранное изображение для показа в модальном окне

  // Используем useEffect для загрузки данных при изменении query или page
  useEffect(() => {
    if (!query) return; // Если query (поисковый запрос) пустой, выходим из функции
    const getArticlesData = async () => {
      try {
        setIsLoading(true);
        setIsError(false); // Сбрасываем ошибку
        // Отправляем GET-запрос к API Unsplash
        const response = await axios.get(
          "https://api.unsplash.com/search/photos", // URL API
          {
            params: {
              client_id: "QMDTanrFRxmDZa0TOSP83SoJlYeOIIQjN5BoN10efLM",
              per_page: 9, // Количество изображений на странице
              page: page, // Номер текущей страницы
              query: query, // Поисковый запрос
            },
          }
        );

        // Если результатов нет, показываем ошибку и очищаем статьи
        if (response.data.results.length === 0) {
          toast.error("No images!");
          setArticles([]);
        } else {
          setArticles((prev) => [...prev, ...response.data.results]);
        }
      } catch (error) {
        setIsError(true);
        // console.error("Error fetching data: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (query) {
      // Загружаем данные, если есть поисковый запрос
      getArticlesData();
    }
  }, [page, query]); // Следим за изменением page и query

  // Обработчик изменения страницы
  const handleChangePage = (e) => {
    e.preventDefault(); // Предотвращаем перезагрузку страницы
    setPage((prev) => prev + 1);
  };

  // Обработчик изменения поискового запроса
  const handleChangeQuery = (newQuery) => {
    if (newQuery === query) {
      // Если запрос не изменился, показываем ошибку
      toast.error("Please change query!");
      return;
    }
    setQuery(newQuery); // Устанавливаем новый запрос
    setArticles([]);
    setPage(1); // Сбрасываем номер страницы
  };

  // Открытие модального окна с изображением
  const openModal = (image) => {
    setSelectedImage(image); // Устанавливаем выбранное изображение
    setIsModalOpen(true); // Открываем модальное окно
  };

  // Закрытие модального окна
  const closeModal = () => {
    setIsModalOpen(false); // Закрываем модальное окно
    setSelectedImage(null); // Убираем выбранное изображение
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <SearchBar handleChangeQuery={handleChangeQuery} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      <ImageGallery articles={articles} onImageClick={openModal} />
      {articles.length > 0 && !isLoading && !isError && (
        <LoadMoreBtn handleChangePage={handleChangePage} />
      )}

      <ImageModal
        isOpen={isModalOpen} // Открыто ли модальное окно
        onClose={closeModal} // Закрытие модального окна
        image={selectedImage} // Выбранное изображение
      />
    </>
  );
};

export default App;
