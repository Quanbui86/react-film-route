import React, { useEffect, useState } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import '../style/reset.css'
import '../style/style.css'
import { get } from '../services/api';
import Aside from '../components/Aside';
import Carousel from '../components/Carousel';
import ChangePage from '../components/ChangePage';
import MovieGrid from '../components/MovieGrid';


export default function Genres() {

  //Main subject and their title
  const movieList = ['popular', 'top_rated', 'upcoming', 'now_playing']
  const navTitle = ['New', 'Popular', 'Top Rated', 'Upcomming', 'Now Playing']

  //Dùng useParams để get các biến từ URL
  const { movieListItem } = useParams()
  const { page } = useParams()

  //Movies Data state
  const [allmovieData, setAllmovieData] = useState(null)

  //Defined Navigate
  const navigate = useNavigate();

  //Scroll to top first render
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //get Data from Body to Outlet
  const outletData = useOutletContext()
  const genresData = outletData.genresData
  const isScrolling = outletData.isScrolling

  // Get data from 3 API:
  //1.Main subject
  //2. from film genres
  //3. from now playing as Home
  useEffect(() => {
    let url;
    if (movieListItem && movieList.includes(movieListItem)) {
      url = `https://api.themoviedb.org/3/movie/${movieListItem}?page=${page}`;
    } else if (genresData && genresData.genres.find(obj => obj.name === movieListItem)) {
      let genreId = genresData.genres.find(obj => obj.name === movieListItem).id;
      url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${genreId}`
    } else {
      url = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}`;
    }
    get('get', url)
      .then(response => {
        setAllmovieData(response)
      })
      .catch(err => console.error(err));
  }, [genresData, movieListItem, page])

  //Chose movie list Name
  let ListName;
  if (movieList.indexOf(movieListItem) != -1) {
    ListName = navTitle[movieList.indexOf(movieListItem)]
  } else {
    ListName = movieListItem
  }
  //Navigate to Detail Page
  const handleClick = (movie) => {
    const selectedGenre = genresData.genres.find(genre => genre.id === Number(movie.genre_ids[0]));
    navigate(`/react-film-route/${selectedGenre.name}/${movie.id}`)
  }

  return (
    <div className={`z-index-4 pageSetup home-bg position-relative ${isScrolling ? `` : ''}`}>
      <div className={`z-index-0 ${isScrolling ? `top-11rem-height` : 'top-11rem-height'}`}></div>
      <Carousel />
      <div className='scroll-bg-fix'></div>
      <div className='container'>
        <div className='main-container home-contain'>
          <div className='main-title'>
            <h3>{ListName} Movies<div className='line'></div></h3>
            <div className='black-line'></div>
          </div>
          <MovieGrid allmovieData={allmovieData} handleClick={handleClick} />
          <ChangePage allmovieData={allmovieData} page={page} />
        </div>
        <div className='aside-container home-contain'>
          <Aside />
        </div>
      </div>
    </div>
  )
}

/* Ví dụ sử dụng Promise.all
 useEffect(() => {
   let urls = [];
   if (movieListItem === 'changes' && allmovieData) {
     for (let result of allmovieData.results) {
       let filmId = Number(result.id);
       let url = `https://api.themoviedb.org/3/movie/${filmId}?language=en-US`;
       urls.push(url);
     }
   }
   Promise.all(urls.map(url =>
     get('get', url)
       .then(response => {
         return response;
       })
       .catch(err => console.error(err))
   ))
     .then(responses => {
       setChangesData(responses)
     }
     )
     .catch(err => console.error(err));
 }, [allmovieData]);
 */