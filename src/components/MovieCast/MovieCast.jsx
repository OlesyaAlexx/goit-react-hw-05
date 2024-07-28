import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchCreditsById } from "../../services/api";
import s from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams(); // Отримуємо movieId з URL
  const [cast, setCast] = useState([]); // Стан для зберігання акторського складу
  const [error, setError] = useState(null); //Стан для зберігання помилок

  useEffect(() => {
    fetchCreditsById(movieId) // Викликаємо функцію для отримання даних з API, використовуючи movieId
      .then((data) => setCast(data.cast)) // Зберігаємо отримані дані в стані cast
      .catch((err) => {
        console.error("Error fetching credits:", err); // Обробляємо помилку, якщо запит провалився
        setError("Error fetching credits");
      });
  }, [movieId]); // Запускаємо цей ефект щоразу, коли movieId змінюється

  if (error) {
    return <div>{error}</div>; // Повідомлення про помилку
  }

  return (
    <div>
      <ul className={s.castList}>
        {cast.map((actor) => (
          <li key={actor.id} className={s.castItem}>
            <img
              src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
              alt={actor.name}
              width="100"
              className={s.actorImage}
            />
            <p>{actor.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
