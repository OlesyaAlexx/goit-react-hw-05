import { Suspense, useEffect, useRef, useState } from "react";
import { NavLink, Outlet, useLocation, useParams } from "react-router-dom";
import { fetchMovieDetails } from "../../services/api";
import Loader from "../../components/Loader/Loader";
import s from "./MovieDetailsPage.module.css";
import clsx from "clsx";

const buildLinkClass = ({ isActive }) => {
  return clsx(s.link, isActive && s.active);
};

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const goBackRef = useRef(location?.state?.from ?? "/movies");

  useEffect(() => {
    setLoading(true);
    fetchMovieDetails(movieId)
      .then((data) => {
        setMovie(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching details:", err); // Обробляємо помилку, якщо запит провалився
        setError("Error fetching details");
      });
  }, [movieId]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={s.containerDetails}>
      <div className={s.topSection}>
        <div className={s.leftSide}>
          <NavLink to={goBackRef.current} className={buildLinkClass}>
            Go back!
          </NavLink>
          <img
            className={s.img}
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
        </div>
        <div className={s.rightSide}>
          <h2 className={s.filmName}>{movie.title}</h2>
          <p className={s.description}>
            <span className={s.text}>Runtime: </span>
            {movie.runtime} minutes
          </p>
          <p className={s.description}>
            <span className={s.text}>Popularity: </span>
            {movie.popularity}
          </p>
          <p className={s.description}>
            <span className={s.text}>Overview: </span>
            {movie.overview}
          </p>
        </div>
      </div>
      <div className="flex">
        <NavLink to="cast" className={buildLinkClass}>
          Cast
        </NavLink>
        <NavLink to="reviews" className={buildLinkClass}>
          Reviews
        </NavLink>
      </div>
      <Suspense fallback={<Loader />}>
        <div className={s.outletContainer}>
          <Outlet />
        </div>
      </Suspense>
    </div>
  );
};

export default MovieDetailsPage;
