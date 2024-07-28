import { useState, useEffect } from "react";
import { fetchMovies } from "../../services/api";
import MovieList from "../../components/MovieList/MovieList";
import SearchBar from "../../components/SearchBar/SearchBar";
import Loader from "../../components/Loader/Loader";
import { useSearchParams } from "react-router-dom";

const MoviesPage = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const searchQuery = searchParams.get("query");
    if (searchQuery) {
      setQuery(searchQuery);
      setLoading(true);
      fetchMovies(searchQuery)
        .then((data) => {
          setMovies(data.results);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching movies:", error);
          setError("Failed to fetch movies.");
          setLoading(false);
        });
    }
  }, [searchParams]);

  const handleSearch = () => {
    setLoading(true);
    fetchMovies(query)
      .then((data) => {
        setMovies(data.results);
        setLoading(false);
        setSearchParams({ query });
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
        setError("Failed to fetch movies.");
        setLoading(false);
      });
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <SearchBar
        query={query}
        setQuery={setQuery}
        handleSearch={handleSearch}
      />
      <MovieList movies={movies} />
    </div>
  );
};

export default MoviesPage;
