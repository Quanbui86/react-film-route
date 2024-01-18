import { useSearchParams, useParams, useNavigate, useOutletContext } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { get } from '../services/api';
import ChangePage from '../components/ChangePage';
import MovieGrid from '../components/MovieGrid';

export default function SearchPage() {

  const [searchParams] = useSearchParams();
  const search = searchParams.get('query');

  const { page } = useParams();
  const [searchData, setSearchData] = useState([])


  //get Data from Body to Outlet
  const outletData = useOutletContext()
  const genresData = outletData.genresData
  const isScrolling = outletData.isScrolling

  //get search movies list - searchData.results have 20 movies per page
  useEffect(() => {
    const url = `https://api.themoviedb.org/3/search/multi?query=${search}&include_adult=false&language=en-US&page=${page}`
    //const url = `https://api.themoviedb.org/3/search/keyword?query=${search}&page=${page}`
    get('get', url)
      .then(resp => {
        setSearchData(resp)
      })
  }, [search, page])
  
  //define navigate
  const navigate = useNavigate();
  const handleClick = (movie) => {
    if (movie.genre_ids && movie.genre_ids[0]) {
      const selectedGenre = genresData.genres.find(genre => genre.id === Number(movie.genre_ids[0]));
      navigate(`/react-film-route/${selectedGenre ? selectedGenre.name : 'no-genres'}/${movie.id}`)
    } else {
      navigate(`/react-film-route/search/${movie.id}`)
    }
  }
  //get related key for seach
  const [related, setRelated] = useState()
  useEffect(() => {
    const url = `https://api.themoviedb.org/3/search/keyword?query=${search}&page=1`
    get('get', url)
      .then(response => {
        setRelated(response);
      })
      .catch(err => console.error(err))
  }, [search])
  return (
    <div className={`z-index-4 pageSetup home-bg position-relative`}>
      <div className={`z-index-0 ${isScrolling ? `top-11rem-height` : 'top-11rem-height'}`}></div>
      <div className='container'>
        <div className='main-search-page-container search-page-container'>
          <div className='related-search-result'>
            <p className='text-above-search-result'>Related keywords:</p>
            <div className='related-search-keyword' >
              {related ? related.results.map((movie, index) =>
                <p onClick={() => handleClick(movie)} key={`search ${index}`}>{movie.name}</p>
              ) : ''}
            </div>
          </div>
          <div className='text-above-search-result'>
            <p>Results for search keyword <span>"{search}"</span></p>
          </div>
          <MovieGrid allmovieData={searchData} handleClick={handleClick} />
          <ChangePage allmovieData={searchData} page={page} />
        </div>
      </div>
    </div>

  )
}

/*<ul className="search-page-inside movie-grid">
            {searchData && searchData.results ? searchData.results.map((movie, index) =>
              <li
                className='movie-item'
                onClick={() => handleClick(movie)}
                key={`home-movie ${index}`}
                onMouseOver={() => mouseOverHandle(index)}
                onMouseOut={mouseOutHandle}
              >
                <div className={`movie-title z-index-1 ${mouseOverIndex === index ? 'bigger2' : ''}`}>
                  <p>{movie.title}</p>
                </div>
                <img
                  className={`movie-bg movie-img ${mouseOverIndex === index ? 'bigger' : ''}`}
                  src={
                    movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` :
                      movie.backdrop_path ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}` :
                        `https://image.tmdb.org/t/p/w500/qF0ZIAe1DRe49ql02KaYl04gnxt.jpg`}
                  alt='movie poster'
                />
              </li>
            ) : `${searchData && JSON.stringify(searchData)} CONSTRUCTING`}
          </ul>
          */
/*
  let totalSearchPage = 0;
  const urls = [];
  const [top20, setTop20] = useState()
  //get total page for search query
  
  useEffect(() => {
    const url = `https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US&page=${1}`;
    let urls = [];
    let totalSearchPage = 0;
    get('get', url)
      .then(resp => {
        if (resp.total_pages >= 10) {
          totalSearchPage = 10;
        } else totalSearchPage = resp.total_pages;
        for (let i = 1; i <= totalSearchPage; i++) {
          const url3 = `https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US&page=${i}`;
          urls.push(url3);
        }
        console.log(urls);
        return Promise.all(urls.map(url =>
          get('get', url)
            .then(response => {
              return response.results;
            })
            .catch(err => console.error(err))
        ));
      })
      .then(response => {
        setSearchData(prev => prev.concat(...response));
      });
  }, [search]);

  useEffect(() => {
    if (searchData && searchData.length > 0) {
      let newTop20 = searchData
        .filter(film => typeof film.popularity === 'number')
        .sort((a, b) => b.popularity - a.popularity)
        .slice(0, 20);
      setTop20(newTop20);
      console.log(newTop20);
      if (newTop20 && newTop20.length === 0) {
        console.log('No films with a numeric popularity property were found.');
      } else {

      }
    }

  }, [searchData]);
  //get data of movie genres from API - end
  */
 /*
  //get 20 ids of movie in search list
  const [searchMoviesData, setSearchMoviesData] = useState()
  useEffect(() => {
    if (searchData && searchData.results) {
      const urls = [];
      for (let result of searchData.results) {
        urls.push(`https://api.themoviedb.org/3/movie/${result.id}`)
      }
      Promise.all(urls.map(url =>
        get('get', url)
          .then(response => {
            return response;
          })
          .catch(err => console.error(err))
      ))
        .then(responses => {
          setSearchMoviesData(responses)
        }
        )
        .catch(err => console.error(err));
    }
  }, [searchData, search])
  */