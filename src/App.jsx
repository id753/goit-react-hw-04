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

import { useState, useEffect } from "react";

const App = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const getArticlesData = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const response = await axios.get(
          "https://api.unsplash.com/search/photos",
          {
            params: {
              client_id: "QMDTanrFRxmDZa0TOSP83SoJlYeOIIQjN5BoN10efLM",
              per_page: 9,
              page: page,
              query: query,
            },
          }
        );

        if (response.data.results.length === 0) {
          toast.error("No images!");
          setArticles([]);
        } else {
          setArticles((prev) => [...prev, ...response.data.results]);
        }
      } catch (error) {
        setIsError(true);
        console.error("Error fetching data: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (query) {
      getArticlesData();
    }
  }, [page, query]);

  const handleChangePage = (e) => {
    e.preventDefault();
    // console.log("Previous page:", page);
    setPage((prev) => prev + 1);
  };

  const handleChangeQuery = (newQuery) => {
    if (newQuery === query) {
      toast.error("Please change query!");
      return;
    }
    setQuery(newQuery);
    setArticles([]);
    setPage(1);
  };

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <SearchBar handleChangeQuery={handleChangeQuery} />

      {isLoading && <Loader />}
      {isError && <ErrorMessage />}

      {!isLoading && !isError && (
        <>
          <ImageGallery articles={articles} onImageClick={openModal} />
          {articles.length > 0 && (
            <LoadMoreBtn handleChangePage={handleChangePage} />
          )}
        </>
      )}

      <ImageModal
        isOpen={isModalOpen}
        onClose={closeModal}
        image={selectedImage}
      />
    </>
  );
};

export default App;
