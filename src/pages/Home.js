import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../style/reset.css'
import '../style/style.css'
import Aside from '../components/Aside';
import { get } from '../services/api';
import { useOutletContext } from 'react-router-dom';
import Carousel from '../components/Carousel';
import ChangePage from '../components/ChangePage';
import MovieGrid from '../components/MovieGrid';
function Home() {
  const { isScrolling, genresData } = useOutletContext();
  const [allmovieData, setAllmovieData] = useState(null)
  const [page, setPage] = useState(1)
  const navigate = useNavigate();

  useEffect(() => {
    let url = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${1}`;
    get('get', url)
      .then(resp => {
        setAllmovieData(resp)
      })
  }, [page]);
  const handleClick = (movie) => {
    const selectedGenre = genresData.genres.find(genre => genre.id === Number(movie.genre_ids[0]));
    navigate(`${selectedGenre.name}/${movie.id}`)
  }

  return (
    <div className={`z-index-4 pageSetup home-bg position-relative`}>
      <div className={`z-index-0 ${isScrolling ? `top-11rem-height` : 'top-11rem-height'}`}></div>
      <Carousel />
      <div className='container'>
        <div className='main-container home-contain'>
          <div className='main-title'>
            <h3>Now Playing Movies<div className='line'></div></h3>
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

export default Home;
