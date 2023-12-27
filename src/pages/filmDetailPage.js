import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate, useParams, Redirect } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import '../style/reset.css'
import '../style/style.css'
export default function Film() {
  const [data, setData] = useState(null)
  const [page1Data, setPage1Data] = useState(null)
  const [filmData, setFilmData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isFilmLoading, setIsFilmLoading] = useState(false)
  const navigate = useNavigate();
  const { filmId } = useParams()
  const { genreName } = useParams()
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
  }, [])

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
          setFilmData(response.results.find(film => film.id === Number(filmId)))
          setIsFilmLoading(true)
        })
        .catch(err => console.error(err));
    }
  }, [data, filmId])

  /*
  
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
        console.log(response)
        setPage1Data(response)
        setIsFilmLoading(true)
        console.log(genreId)
      })
      .catch(err => console.error(err));
      
    }
    */
  //<h1>{page1Data ? page1Data.results.find(obj=>obj.id === Number(filmId)).title : 'loading'}</h1>
  /*
  <div className='filmList'>
            <h3>{`${genreName} Film List`}</h3>
            <ul>{
              page1Data.results.map((film, index) =>
                <li key={index}>
                  <Link to={`/${genreName}/${film.id}`}>{film.title}</Link>
                </li>)}
            </ul>
          </div>
  */
  return (
    <section className='detailPage'>
      {filmData ?
        <div className="group">
          <div className="container">
            <h3>Film Title</h3>
            <h1>{filmData.title}</h1>
            <img src={`https://image.tmdb.org/t/p/w500${filmData.poster_path}`} alt='film poster' />
            <h3>Film overview</h3>
            <p>{filmData.overview}</p>
          </div>
        </div> : 
        <div>
          <p>Invalid Film</p>
          <NavLink to="/" replace>To Home Page</NavLink> 
        </div>
        
      }
    </section>
  )
}