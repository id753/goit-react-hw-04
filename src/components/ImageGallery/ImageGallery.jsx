// ImageGallery.jsx
import ImageCard from "../ImageCard/ImageCard";
import s from "./ImageGallery.module.css";

const ImageGallery = ({ articles, onImageClick  }) => {
  return (
    <ul className={s.gallery_list}>
      {articles.map((article) => (
        <li key={article.id}>
          <div>
            <ImageCard 
              src={article.urls.small}
              alt={article.alt_description || "Image"}

              onClick={() => onImageClick(article)} // Відкриття модального вікна
            />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
