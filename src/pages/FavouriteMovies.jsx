import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import { get } from "../services/api";
import { useNavigate, useOutletContext } from "react-router-dom";

export default function FavouriteMovies( {isScrolling} ) {
    //get data of movie genres from API
    const [data, setData] = useState(null)
    useEffect(() => {
        const url = 'https://api.themoviedb.org/3/genre/movie/list?language=en';
        get('get', url)
            .then(resp =>
                setData(resp)
            )
    }, []);
    //get all favourite movies data from Cookies.get('favouriteFilms')
    const [favouriteFilmsId, setFavouriteFilmsId] = useState();
    useEffect(() => {
        // Get the existing favourite films
        let favouriteFilms = Cookies.get('favouriteFilms');
        // Parse it as JSON
        favouriteFilms = favouriteFilms ? JSON.parse(favouriteFilms) : [];
        setFavouriteFilmsId(favouriteFilms);
    }, []);
    //get all movies data from favouriteFilmsId
    const [favouriteFilmsData, setFavouriteFilmsData] = useState();
    useEffect(() => {
        if (favouriteFilmsId && favouriteFilmsId.length > 0) {
            const urls = [];
            for (let id of favouriteFilmsId) {
                urls.push(`https://api.themoviedb.org/3/movie/${id}`)
            }
            console.log(urls)
            Promise.all(urls.map(url =>
                get('get', url)
                    .then(response => {
                        return response
                    })
            )).then(response => {
                setFavouriteFilmsData(response)
            })
        }
    }, [favouriteFilmsId])
    //define navigate
    const navigate = useNavigate();
    const handleClick = (movie) => {
        if (movie.genre_ids && movie.genre_ids[0]) {
            const selectedGenre = data.genres.find(genre => genre.id === Number(movie.genre_ids[0]));
            navigate(`/react-film-route/${selectedGenre ? selectedGenre.name : 'no-genres'}/${movie.id}`)
        } else {
            navigate(`/react-film-route/search/${movie.id}`)
        }
    }
    //const { isScrolling } = useOutletContext();
    console.log(isScrolling)
    //remove movies from Favourite
    const handleClickRemove = (movie) => {
        let currentFavouriteMovies = Cookies.get('favouriteFilms') ? JSON.parse(Cookies.get('favouriteFilms')) : [];
        if (favouriteFilmsId.includes(String(movie.id))) {
            currentFavouriteMovies = favouriteFilmsId.filter(id => id != movie.id)
        } else { console.log('not include', favouriteFilmsId) }
        Cookies.set('favouriteFilms', JSON.stringify(currentFavouriteMovies));
        setFavouriteFilmsId(currentFavouriteMovies)
    }
    return (
        <>
            <div className={`z-index-4 pageSetup home-bg position-relative`}>
                <div className={`z-index-0 ${isScrolling ? `top-11rem-height` : 'top-11rem-height'}`}></div>
                <div className='container'>
                    <div className='main-search-page-container fav-page-container'>
                        <div className='text-above-search-result'>
                            <p><span>"{'Favourite Movies'}"</span></p>
                        </div>
                        <ul className="search-page-inside movie-grid">
                            {favouriteFilmsData ? favouriteFilmsData.map((movie, index) =>
                                <li
                                    className='movie-item'
                                    key={`fav-movie ${index}`}
                                >
                                    <div className="remove-from-fav">
                                        <button
                                            className="remove-fav-button"
                                            onClick={() => handleClickRemove(movie)}
                                            title="Remove item"  // Add this line
                                        >
                                            <i class="fa-solid fa-xmark"></i>
                                        </button>
                                    </div>
                                    <div
                                        className={`movie-title z-index-1 ${0 ? 'bigger2' : ''}`}
                                        onClick={() => handleClick(movie)}
                                    >
                                        <p>{movie.title}</p>
                                    </div>
                                    <img
                                        className={`movie-bg movie-img ${0 ? 'bigger' : ''}`}
                                        onClick={() => handleClick(movie)}
                                        src={
                                            movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` :
                                                movie.backdrop_path ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}` :
                                                    `https://image.tmdb.org/t/p/w500/qF0ZIAe1DRe49ql02KaYl04gnxt.jpg`}
                                        alt='movie poster'
                                    />
                                </li>
                            ) : `${favouriteFilmsData && JSON.stringify(favouriteFilmsData)} CONSTRUCTING`}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}