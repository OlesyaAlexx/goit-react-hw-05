import axios from "axios";

const API_URL = "https://api.themoviedb.org/3";
const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZDc1YjBiYTdkYTNkMmI2M2MyZmU4ZGMyZjFlNDlhYiIsIm5iZiI6MTcyMjA5OTE0NS4yMDcyNTUsInN1YiI6IjY2YTUxYzE2MDFlY2NhN2QwNzJmZmYzYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wYcyysTrJXANPplNsPdTJAu-u-PGV5r8ylYhvs7a91Q";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
});

export const fetchMovies = async (query) => {
  try {
    const response = await axiosInstance.get(`/search/movie`, {
      params: {
        query: query,
        include_adult: false,
        language: "en-US",
        page: 1,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

export const fetchPopularMovies = async () => {
  try {
    const response = await axiosInstance.get(`/movie/popular`, {
      params: {
        language: "en-US",
        page: 1,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    throw error;
  }
};

export const fetchMovieDetails = async (movieId) => {
  try {
    const response = await axiosInstance.get(`/movie/${movieId}`, {
      params: {
        language: "en-US",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};

export const fetchReviewsById = async (movieId) => {
  try {
    const response = await axiosInstance.get(`/movie/${movieId}/reviews`, {
      params: {
        language: "en-US",
        page: 1,
      },
    });

    return response.data.results;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error;
  }
};

export const fetchCreditsById = async (movieId) => {
  try {
    const response = await axiosInstance.get(`/movie/${movieId}/credits`, {
      params: {
        language: "en-US",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching credits:", error);
    throw error;
  }
};
