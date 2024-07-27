import axios from "axios";

const API_KEY = "Z2eE_V1HTKJvUTiQaFLonregXuxW0jPKkwibMznfvxk";
const BASE_URL = "https://api.unsplash.com/";

const fetchImages = async (query, page = 1, per_page = 5) => {
  const response = await axios.get(`${BASE_URL}search/photos`, {
    headers: {
      Authorization: `Client-ID ${API_KEY}`,
    },
    params: {
      query: query,
      page,
      per_page,
    },
  });
  return response.data;
};

export default fetchImages;
