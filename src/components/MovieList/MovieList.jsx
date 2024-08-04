import { Link, useLocation } from "react-router-dom";
import s from "./MovieList.module.css";

const MovieList = ({ movies }) => {
  const location = useLocation();

  return (
    <ul className={s.list}>
      {movies.map((movie) =>
        movie.poster_path ? (
          <li key={movie.id} className={s.item}>
            <Link
              to={`/movies/${movie.id.toString()}`}
              state={{ from: location }}
              className={s.film}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                height={400}
                onError={(e) => {
                  e.target.parentElement.parentElement.style.display = "none"; // Приховати весь li, якщо зображення не завантажилось
                }}
              />
              {movie.title}
            </Link>
          </li>
        ) : null
      )}
    </ul>
  );
};

export default MovieList;
