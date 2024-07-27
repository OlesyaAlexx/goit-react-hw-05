import styles from "./ImageCard.module.css";

const ImageCard = ({ urls, onImageClick, description }) => {
  return (
    <div className={styles.card}>
      <img
        className={styles.imageCard}
        src={urls.small}
        alt={description || "Image"}
        onClick={() => onImageClick({ urls })}
      />
    </div>
  );
};

export default ImageCard;
