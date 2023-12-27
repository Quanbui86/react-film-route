import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate, useParams, Redirect } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import '../style/reset.css'
import '../style/style.css'
/*
export default function Genres({data, isLoading, handleSelectChange, isFilmLoading, filmData, selectedGenreId, selectedGenreName}){
    return (
        <div>
          {<select onChange={handleSelectChange}>
          <option value="">Choose one...</option>
          {isLoading?data.genres.map((genre, index)=>(
            <option key={index} value={genre.id}>
              {genre.name}
            </option>
          )):'loading film'}
          </select>}
          {selectedGenreId&&
          filmData&&
          <ul>{filmData.results.map((film, index)=><li key={index}><Link to={`/${selectedGenreName}/${film.id}`}>{film.title}</Link></li>)}</ul>}
        </div>
      )
}
*/
/*
{selectedGenreId &&
                filmData &&
                <ul>{filmData.results.map((film, index) => <li key={index}>
                    <Link to={`/${selectedGenreName}/${film.id}`}>{film.title}</Link></li>)}
                </ul>}
*/
export default function Genres() {
  const [data, setData] = useState(null)
  const [page1Data, setPage1Data] = useState(null)
  const [AllfilmData, setAllFilmData] = useState(null)
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
      })
      .catch(err => console.error(err));
  }, [])
  const { genreName } = useParams()
  useEffect(() => {
    if (data) {
      let genreId = data.genres.find(obj => obj.name === genreName).id;
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkODhlZmU3YTIyZmM1NWJlM2IyOTg3ZjE1ZWNmNDFlNCIsInN1YiI6IjY1NGYyNjQ0MjkzODM1NDNmNDg2MDkyNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FWHK4DfBohjiYyiqykkvprCiNY1BvLDR2mbePlzhzII'
        }
      };
      fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genreId}`, options)
        .then(response => response.json())
        .then(response => {
          setPage1Data(response)
          setAllFilmData(response.results)
        })
        .catch(err => console.error(err));
    }
  }, [data, genreName])
  return (
    <section>
      {page1Data ?
        <div className='filmList'>
          <div>
            <h1>All {genreName} film</h1>
          </div>
          <ul>{page1Data.results.map((film, index) =>
            <Link to={`/${genreName}/${film.id}`} key={index}>
              <li className='filmItem'>
                <div className='left'>
                  {film.title}
                </div>
                <div className='right'>
                  <img src={`https://image.tmdb.org/t/p/w500${film.backdrop_path}`} alt='film poster' />
                </div>
              </li>
            </Link>)
          }</ul>
        </div>
        : ''}
    </section>
  )
}