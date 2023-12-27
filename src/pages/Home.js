import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import '../style/reset.css'
import '../style/style.css'
import Genres from './Genres';


function Home() {
  const [data, setData] = useState(null)
  const [filmData, setFilmData] = useState(null)
  const [selectedGenreName, setSelectedGenreName] = useState('');
  const [selectedGenreId, setSelectedGenreId] = useState('');
  const [isLoading, setIsLoading] = useState(false)
  const [isFilmLoading, setIsFilmLoading] = useState(false)
  const navigate = useNavigate();
  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkODhlZmU3YTIyZmM1NWJlM2IyOTg3ZjE1ZWNmNDFlNCIsInN1YiI6IjY1NGYyNjQ0MjkzODM1NDNmNDg2MDkyNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FWHK4DfBohjiYyiqykkvprCiNY1BvLDR2mbePlzhzII'
      }
    };
    fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
      .then(response => response.json())
      .then(response => {
        setData(response)
        setIsLoading(true)
      })
      .catch(err => console.error(err));

    if (isLoading) {
      fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${selectedGenreId}`, options)
        .then(response => response.json())
        .then(response => {
          console.log(response)
          setFilmData(response)
          setIsFilmLoading(true)
        })
        .catch(err => console.error(err));

    }
  }, [selectedGenreId])
  const handleSelectChange = (event) => {
    const selectedGenre = data.genres.find(genre => genre.id === Number(event.target.value));
    setSelectedGenreId(selectedGenre.id);
    setSelectedGenreName(selectedGenre.name);
    navigate(`/${selectedGenre.name}`)
  };
  /*
    <Genres
    isFilmLoading={isFilmLoading} 
    isLoading={isLoading}
    data={data}
    handleSelectChange={handleSelectChange}
    filmData={filmData}
    selectedGenreId={selectedGenreId}
    selectedGenreName={selectedGenreName}
    />
  */
 
  return (
    <div>
      {<select onChange={handleSelectChange}>
        <option value="">Choose one...</option>
        {isLoading ? data.genres.map((genre, index) => (
          <option key={index} value={genre.id}>
            {genre.name}
          </option>
        )) : 'loading film'}
      </select>}
      {selectedGenreId &&
        filmData &&
        <ul>{filmData.results.map((film, index) => <li key={index}><Link to={`/${selectedGenreName}/${film.id}`}>{film.title}</Link></li>)}</ul>}
    </div>
  )
}

export default Home;
