import { useState, useEffect } from 'react';
import { isPersistedState } from '../storage';
import { fetchMovie, fetchCredits } from '../API';

export const useMovieFetch = movieID => {
  const [state, setState] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getMovie = async () => {
      try {
        setLoading(true);
        setError(false);
        const movie = await fetchMovie(movieID);
        const credits = await fetchCredits(movieID);
        const directors = credits.crew.filter(
          member => member.job === 'Director'
        );
        setState({
          ...movie,
          actors: credits.cast,
          directors
        });

        setLoading(false);
      } catch (error) {
        setError(true);
      }
    }

    const sessionState = isPersistedState(movieID);

    if (sessionState) {
      setState(sessionState);
      setLoading(false);
      return
    }

    getMovie();
  }, [movieID]);

  useEffect(() => {
    sessionStorage.setItem(movieID, JSON.stringify(state));
  }, [movieID, state])
  return { state, loading, error }
};