import { useEffect, useState } from "react";
import { fetchPopularMovies } from "../../services/api";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import s from "./HomePage.module.css";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchPopularMovies()
      .then((data) => {
        setMovies(data.results);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch popular movies.", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loader />; // Запускаємо Loader
  }

  if (error) {
    return <div className={s.error}>{error}</div>; // Показуємо помилку, якщо вона сталася
  }

  return (
    <div>
      <h2 className={s.title}>Trending today</h2>
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
