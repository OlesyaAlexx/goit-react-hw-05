import ImageCard from "../ImageCard/ImageCard";
import styles from "./ImageGallery.module.css";

const ImageGallery = ({ images, onImageClick }) => {
  if (!images || images.length === 0) {
    return <p className={styles.text}>No images to display</p>;
  }
  return (
    <ul className={styles.gallery}>
      {images.map((image, index) => (
        <li key={`${image.id}-${index}`}>
          <ImageCard urls={image.urls} onImageClick={onImageClick} />
        </li>
      ))}
    </ul>
  );
};
export default ImageGallery;
