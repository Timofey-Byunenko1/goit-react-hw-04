import css from "./ImageCard.module.css";

export default function ImageCard({ picture, onClick }) {
  return (
    <div>
      <img
        src={picture.urls.small}
        alt={picture.alt_description || "No description"}
        onClick={() => onClick(picture)}
        className={css.image}
      />
    </div>
  );
}
