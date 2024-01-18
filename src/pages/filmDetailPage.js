import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import '../style/reset.css'
import '../style/style.css'
import { get } from '../services/api';
import Aside from '../components/Aside';
import { useOutletContext } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

//import Cookies
import Cookies from 'js-cookie';
export default function Film() {
  const { isScrolling } = useOutletContext();
  const [filmData, setFilmData] = useState(null)
  const { filmId } = useParams()
  const searchParams = useSearchParams()
  console.log(searchParams)
  console.log(filmId)
  const navigate = useNavigate()
  useEffect(() => {
    let url = `https://api.themoviedb.org/3/tv/${filmId}?language=en-US`;
    get('get', url)
      .then(resp => {
        if ((resp.first_air_date || resp.last_air_date || resp.networks) && resp.last_episode_to_air.still_path) {
          setFilmData(resp);
        } else
        throw new Error('API request failed');
      })
      .catch(error => {
        console.error(error);
        url = `https://api.themoviedb.org/3/movie/${filmId}?language=en-US`;
        get('get', url)
          .then(resp => {
            setFilmData(resp);
            console.log(resp);
          })
          .catch(error => {
            console.error(error);
          });
      });
  }, [filmId])
  const handleClickViewDetail = (slide) => {
    navigate(`/react-film-route/trending/${slide.id}`)
  }
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 96)
    }, 300)
  }, [])
  useEffect(() => {
    if (window.scrollY) {
      setTimeout(() => {
        window.scrollTo(0, 96)
      }, 300)
    }
  }, [window.scrollY])

  const [favouriteFilmsId, setFavouriteFilmsId] = useState();
  const [isFavourite, setIsFavourite] = useState();

  // Fetch the favourite films once when the component mounts
  useEffect(() => {
    const curentFavouriteFilms = Cookies.get('favouriteFilms') ? JSON.parse(Cookies.get('favouriteFilms')) : [];
    setFavouriteFilmsId(curentFavouriteFilms);
    setIsFavourite(curentFavouriteFilms.includes(filmId));
  }, [filmId]); // this runs once on mount and everytime filmId change

  const handleClickAddFavourite = () => {
    let curentFavouriteFilms = favouriteFilmsId.includes(filmId)
      ? favouriteFilmsId.filter(id => id !== filmId) // Remove filmId from favourites
      : [...favouriteFilmsId, filmId]; // Add filmId to favourites

    Cookies.set('favouriteFilms', JSON.stringify(curentFavouriteFilms));
    setFavouriteFilmsId(curentFavouriteFilms);
    setIsFavourite(curentFavouriteFilms.includes(filmId));
  }


  console.log(isFavourite)
  return (
    <section className={`pageSetup detailPage-bg detailPage-container position-realtive ${isScrolling ? `top-go-up-5rem` : 'top-0'}`}>
      <div className={`z-index-4 ${isScrolling ? `top-11rem-height` : 'top-11rem-height'}`}></div>
      <CSSTransition
        in={1}
        timeout={500}
        classNames="fade"
      >
        <div className={`${filmData && filmData.backdrop_path ? `movie-detail-container-backdrop` : `movie-detail-container-poster`}`}>
          <div className='movie-detail-background-gradient'></div>
          {filmData &&
            <div className='movie-container'>
              <div className='movie-detail-fore-ground'></div>
              <img src={
                filmData.backdrop_path ?
                  `https://image.tmdb.org/t/p/original${filmData.backdrop_path}` :
                  filmData.poster_path ?
                    `https://image.tmdb.org/t/p/original${filmData.poster_path}` :
                    `https://image.tmdb.org/t/p/original/qF0ZIAe1DRe49ql02KaYl04gnxt.jpg`} alt='poster' />
              <div className='movie-detail-group'>
                <div className='movie-detail-title'>{filmData && (filmData.title ? filmData.title : filmData.name ? filmData.name : '')}</div>
                <div className='movie-detail-buttons'>
                  <button className='movie-detail-button1 display-flex-center'>
                    <i className="fa-solid fa-crown movie-detail-button-icon"></i>
                    Register package
                  </button>
                  <button className={`movie-detail-button2 ${isFavourite ? 'hidden' : 'display-flex-center'}`} onClick={handleClickAddFavourite}>
                    <i className="fa-regular fa-bookmark movie-detail-button-icon"></i>
                    Add to list
                  </button>
                  <button className={`movie-detail-button2 active ${isFavourite ? 'display-flex-center' : 'hidden'}`} onClick={handleClickAddFavourite}>
                    <i className="fa-regular fa-bookmark movie-detail-button-icon"></i>
                    Remove
                  </button>
                </div>
                <div className='movie-detail-overview'>
                  <div className='movie-detail-overview-text'>
                    {filmData.overview && filmData.overview.substring(0, 100)}.
                    <span className='movie-detail-view-detail' onClick={() => handleClickViewDetail(filmData)}>{`View Details `}
                      <i className="fa-solid fa-angle-right movie-detail-view-icon"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>}
        </div>
      </CSSTransition>
      {filmData ?
        <div className="container">
          <div className="main-container detail-contain">
            <div className='detail-group-1'>
              <div className='detail-1'>
                <div className='movie-title-detail'>
                  <h3>{filmData.title}</h3>
                </div>
                <img className='movie-img-detail' src={`https://image.tmdb.org/t/p/w500${filmData.poster_path}`} alt='film poster' />
              </div>
              <div className='detail-2'>
                <p className='info-text'>Title : {filmData.title}</p>
                <p className='info-text'>Year : {filmData.release_date}</p>
                <p className='info-text'>Rated : {filmData.vote_average}/10</p>
                <p className='info-text'>Voted : {filmData.vote_count}</p>
                <p className='info-text'>Status : {filmData.status}</p>
              </div>
            </div>
            <div className='detail-group-2'>
              <h3>Overview</h3>
              <p>{filmData.overview}</p>
            </div>
          </div>
          <div className='aside-container home-contain'>
            <Aside />
          </div>
        </div> :
        <div>
          <p>Please wait</p>
          <NavLink to="/react-film-route" replace>To Home Page</NavLink>
        </div>
      }
      <div className='bottom-5rem-height'>
      </div>
    </section>
  )
}