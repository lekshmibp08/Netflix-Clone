import React, { useEffect, useState } from 'react';
import YouTube from 'react-youtube';  
import './Banner.css';
import axios from '../../axios';
import { API_KEY, imageUrl } from '../../Constants/Constants';

function Banner() {
  const [movie, setMovie] = useState();
  const [trailerUrl, setTrailerUrl] = useState('');  

  useEffect(() => {
    axios.get(`trending/all/week?api_key=${API_KEY}&language=en-US`)
      .then((response) => {
        const results = response.data.results;
        const randomIndex = Math.floor(Math.random() * results.length);
        setMovie(results[randomIndex]);
      });
  }, []);

  const handlePlayTrailer = (movieId) => {
    axios.get(`/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`)
      .then((response) => {
        const trailers = response.data.results;
        if (trailers.length > 0) {
          setTrailerUrl(trailers[0].key);  
        } else {
          alert('Trailer not available');
        }
      })
      .catch(() => {
        alert('Failed to fetch trailer');
      });
  };

  const handleCloseVideo = () => {
    setTrailerUrl('');  // Clear the trailer URL to close the video
  };

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div 
      style={{backgroundImage: `url(${movie ? imageUrl + movie.backdrop_path : ''})`}}
      className='banner'
    >
      <div className='content'>
        <h1 className='title'>{movie ? movie.original_name || movie.original_title : ''}</h1>
        <div className='banner-buttons'>
          <button className='button' onClick={() => handlePlayTrailer(movie.id)}>Play</button>
          <button className='button'>My list</button>
        </div>
        <h1 className='description'>{movie ? movie.overview : ''}</h1>
      </div>
      <div className="fade-bottom"></div>
      
      {/* Render YouTube player if trailerUrl is available */}
      {trailerUrl && (
        <div className="video-overlay">
          <button className="close-button" onClick={handleCloseVideo}>X</button>
          <YouTube videoId={trailerUrl} opts={opts} />
        </div>
      )}
    </div>
  );
}

export default Banner;
