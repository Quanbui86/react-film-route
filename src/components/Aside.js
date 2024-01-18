import React, { useEffect, useState } from 'react';
import { get } from '../services/api';
import { useNavigate } from 'react-router-dom';
export default function Aside() {
    const navigate = useNavigate()
    const [data, setData] = useState(null)
    const [trending, setTrending] = useState([])
    useEffect(() => {
        const url = 'https://api.themoviedb.org/3/genre/movie/list?language=en';
        get('get', url)
          .then(resp =>
            setData(resp)
          )
      }, []);
    useEffect(() => {
        let url;
        if (1 > 0) {
            url = 'https://api.themoviedb.org/3/trending/all/week?language=en-US'
        }
        get('get', url)
            .then(resp => {
                setTrending(resp)
            })
    }, [])
    const handleClick = (movie) => {
        console.log(movie.genre_ids[0])
        const selectedGenre = data.genres.find(genre => genre.id === Number(movie.genre_ids[0]));
        navigate(`/react-film-route/trending/${movie.id}`)
      }
    return (
        <>
            <div className='main-title'>
                <h3>Trending Movies<div className='line'></div></h3>
                <div className='black-line'></div>
            </div>
            {trending && trending.results ?
                <ul className='aside-movie-grid'>
                    {trending.results.slice(1, 5).map((movie, index) =>
                            <li key={index} className='aside-movie-item' onClick={() => handleClick(movie)}>
                                <div className='aside-movie-title'>
                                    <p>{movie.title ? movie.title : movie.name}</p>
                                </div>
                                <div className='aside-movie-bg'>
                                    <img className='movie-img' src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt='movie poster' />
                                </div>
                            </li>
                    )}
                </ul> : ''
            }
        </>

    )
}