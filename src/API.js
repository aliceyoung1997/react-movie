import {
  SEARCH_BASE_URL,
  POPULAR_BASE_URL,
  API_URL,
  API_KEY,
} from './config';

const fetchMovies = async (searchTerm, page) => {
  const endpoint = searchTerm
    ? `${SEARCH_BASE_URL}${searchTerm}&page=${page}`
    : `${POPULAR_BASE_URL}&page=${page}`;
  return await (await fetch(endpoint)).json();
}

const fetchMovie = async movieID => {
  const endpoint = `${API_URL}movie/${movieID}?api_key=${API_KEY}`;
  return await (await fetch(endpoint)).json();
}

const fetchCredits = async movieID => {
  const creditsEndpoint = `${API_URL}movie/${movieID}/credits?api_key=${API_KEY}`;
  return await (await fetch(creditsEndpoint)).json();
}

export {
  fetchMovies,
  fetchMovie,
  fetchCredits
};
