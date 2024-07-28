import { useParams } from "react-router-dom";
import { fetchReviewsById } from "../../services/api";
import { useState, useEffect } from "react";
import s from "./MovieReviews.module.css";

const MovieReviews = () => {
  const { movieId } = useParams(); // Отримуємо movieId з URL
  const [reviews, setReviews] = useState([]); // Стан для зберігання відгуків
  const [error, setError] = useState(null); //Стан для зберігання помилок

  useEffect(() => {
    fetchReviewsById(movieId) // Викликаємо функцію для отримання даних з API, використовуючи movieId
      .then((data) => setReviews(data)) // Зберігаємо отримані дані в стані reviews
      .catch((err) => {
        console.error("Error fetching reviews:", err); // Обробляємо помилку, якщо запит провалився
        setError("Error fetching reviews");
      });
  }, [movieId]); // Запускати цей ефект щоразу, коли movieId змінюється

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={s.containerReviews}>
      {reviews.length === 0 ? (
        <p>No reviews found</p>
      ) : (
        <ul>
          {reviews.map((review) => (
            <li key={review.id}>{review.content}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieReviews;
