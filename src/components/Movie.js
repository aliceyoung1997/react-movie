import React from 'react';
import { useParams } from 'react-router-dom';
import { IMAGE_BASE_URL, POSTER_SIZE } from '../config';
import BreadCrumb from './BreadCrumb';
import Grid from './Grid';
import Spinner from './Spinner';
import MovieInfo from './MovieInfo';
import MovieInfoBar from './MovieInfoBar';
import Actor from './Actor';
import NoImage from '../images/no_image.jpg';
import { useMovieFetch } from '../hooks/useMovieFetch';

const Movie = () => {
  const { movieID } = useParams();
  const { state: movie, loading, error } = useMovieFetch(movieID)
  if (loading) return <Spinner />
  if (error) return <div>Oops! Something went wrong ...</div>
  return (
    <>
      <BreadCrumb movieTitle={movie.original_title} />
      <MovieInfo movie={movie} />
      <MovieInfoBar
        time={movie.runtime}
        budget={movie.budget}
        revenue={movie.revenue}
      />
      <Grid header='Actors'>
        {movie.actors.map(actor => (
          <Actor
            key={actor.credit_id}
            name={actor.name}
            character={actor.character}
            imageUrl={
              actor.profile_path
                ? `${IMAGE_BASE_URL}${POSTER_SIZE}${actor.profile_path}`
                : NoImage
            }
          />
        ))}
      </Grid>
    </>
  )
}

export default Movie;