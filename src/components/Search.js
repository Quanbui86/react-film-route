import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { get } from "../services/api"
import "../style/style.css"
import SearchPage from "../pages/SearchPage"
export default function Search({ isScrolling }) {
    const [searchParams, setSearchParams] = useState({})
    const [searchData, setSeachData] = useState()
    const [showTab, setShowTab] = useState(false);
    const debounce = (func, delay) => {
        let debounceTimer;
        return function () {
            const context = this;
            const args = arguments;
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => func.apply(context, args), delay);
        }
    }
    const handleChange = (e) => {
        setSearchParams({
            ...searchParams,
            [e.target.name]: e.target.value
        })
    }
    console.log(searchParams.search)
    const debouncedHandleChange = debounce(handleChange, 200);

    const handleSubmit = e => {
        e.preventDefault();
        setTimeout(() => {
            setShowTab(false);
        }, 200)
        navigate(`/react-film-route/search-results/page/${page}?query=${searchParams.search}`)
    }
    const [page, setPage] = useState(1)
    useEffect(() => {
        const url = `https://api.themoviedb.org/3/search/multi?query=${searchParams.search}&include_adult=false&language=en-US&page=${page}`
        get('get', url)
            .then(resp => {
                setSeachData(resp)
                console.log(resp)
            }
            )
    }, [searchParams.search])
    const handleFocus = (e) => {
        setShowTab(true);
        window.scrollTo(0, 0);
        e.target.focus({ preventScroll: true });
        document.body.style.overflow = 'auto';
    };

    const handleBlur = () => {
        setTimeout(() => {
            setShowTab(false);
            document.body.style.overflow = 'auto';
        }, 200);

    };
    const navigate = useNavigate()
    const handleClick = (movie) => {
        navigate(`/react-film-route/search/${movie.id}?query=${searchParams.search}`)
    }


    return (
        <div className="search-contain">
            <form onSubmit={handleSubmit}>
                <input
                    id='searchBar'
                    className='searchBar'
                    onChange={debouncedHandleChange}
                    name='search'
                    placeholder="Search for a movie, tv show, person......"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                >
                </input>
                <button type="sunbmit" className="search-icon"><i className="fa-solid fa-magnifying-glass"></i></button>
            </form>
            <>  
                <div className={`search-hide-background z-index-5 ${showTab ? 'show-search z-index-5' : 'hide-search z-index-5'}`}></div>
                <div className={`triangle z-index-6 ${showTab ? 'show-search z-index-6' : 'hide-search z-index-6'}`}></div>
                <div className={`search-tab ${showTab ? 'show-search z-index-6' : 'hide-search z-index-6'}`}>
                    {searchData && searchData.results.length ? searchData.results.map((movie, index) =>
                        <div className="search-movie-item" onClick={() => handleClick(movie)} key={`search ${index}`}>
                            <div className="search-movie-title display-flex-center">{movie.title?movie.title:movie.name?movie.name:movie.original_name}</div>
                            <img
                                className={`search-movie-img display-flex-center ${1 ? '' : ''}`}
                                src={
                                    movie.poster_path ?
                                        `https://image.tmdb.org/t/p/w342${movie.poster_path}` :
                                        movie.backdrop_path ?
                                            `https://image.tmdb.org/t/p/w300${movie.backdrop_path}` :
                                            `https://image.tmdb.org/t/p/original/qF0ZIAe1DRe49ql02KaYl04gnxt.jpg`}
                                alt='movie poster' />
                        </div>
                    ) :
                        <div className="search-movie-item">Searching</div>}
                </div>
            </>
        </div>
    )
}