import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

export default function ImageGallery({ pictures, onClick }) {
  return (
    <ul className={css.list}>
      {pictures.map((picture) => {
        return (
          <li key={picture.id} className={css.imgBox}>
            <ImageCard picture={picture} onClick={onClick} />
          </li>
        );
      })}
    </ul>
  );
}
