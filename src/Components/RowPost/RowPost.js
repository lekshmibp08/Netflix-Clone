import React, { useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import './RowPost.css';
import axios from '../../axios';
import { API_KEY, imageUrl } from '../../Constants/Constants';

function RowPost(props) {
  const [movies, setMovies] = useState([]);
  const [urlId, setUrlId] = useState(null);  // Initially set to null instead of empty string
  const [trailerError, setTrailerError] = useState(false);  // New state for handling error message

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };

  useEffect(() => {
    axios.get(props.url)
      .then((Response) => {
        setMovies(Response.data.results);
      })
      .catch(err => {
        alert('Network Error');
      });
  }, [props.url]);

  const handleMovieTrailer = (id) => {
    axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`)
      .then((Response) => {
        if (Response.data.results.length !== 0) {
          setUrlId(Response.data.results[0]);  // Set the video ID for YouTube
          setTrailerError(false);  // Reset the error state if a trailer is available
        } else {
          setUrlId(null);  // No trailer available
          setTrailerError(true);  // Set error to true
        }
      })
      .catch(() => {
        setTrailerError(true);  // Handle any API errors
      });
  };

  return (
    <div className='row'>
      <h2>{props.title}</h2>
      <div className="posters">
        {movies.map((movie, index) =>
          <img key={index}
            className={props.isSmall ? 'smallPoster' : 'poster'}
            src={`${imageUrl + movie.backdrop_path}`} alt="Poster"
            onClick={() => handleMovieTrailer(movie.id)}
          />
        )}
      </div>
      {urlId ? (
        <YouTube videoId={urlId.key} opts={opts} />
      ) : trailerError && (
        <div className="no-trailer-message">
          <p>No trailer is available</p> 
        </div>
      )}
    </div>
  );
}

export default RowPost;
