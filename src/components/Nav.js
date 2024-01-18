import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { get } from "../services/api";
export default function Nav({isScrolling}) {
  const nav = ['Popular', 'Top Rated', 'Upcomming']
  const movieList = ['popular', 'top_rated', 'upcoming']
  const [data, setData] = useState(null)
  const navigate = useNavigate();
  useEffect(() => {
    const url = 'https://api.themoviedb.org/3/genre/movie/list?language=en';
    get('get', url)
      .then(resp =>
        setData(resp)
      )
  }, []);
  const handleChange = (event) => {
    const selectedGenre = data.genres.find(genre => genre.id === Number(event.target.value));
    navigate(`${selectedGenre.name}/page/1`)
  };
  const handleClick = (item) => {
    console.log(nav.indexOf(item))
    const movieListName = movieList[nav.indexOf(item)]
    console.log(movieListName)
    navigate(`${movieListName}/page/1`)
  }
  const handleClickHome = () => {
    navigate(`/react-film-route`)
  }
  console.log(isScrolling)
  return (
    <div className={`nav-container ${isScrolling ? `` : ''}`}>
      <div className={`z-index-0 nav-bg ${isScrolling ? `nav-bg-opacity-4` : 'nav-bg-show'}`}></div>
      <div className="container nav-contain-position z-index-5">
        <div className="home" onClick={handleClickHome}>
          <Link to='/react-film-route' className="nav-home-group">
            <i class="fa-solid fa-house"></i>
            <p className="nav-text">Home</p>
          </Link>
        </div>
        <div className="nav-list-contain">
          <ul className="nav-list">
            {nav.map((item, index) => { return <li key={`nav-list ${index}`} className="nav-genres-item nav-text" onClick={() => handleClick(item)}>{item}</li> })}
          </ul>
        </div>
        {/*data ?
          <ul className='nav-genres-list'>
            {data.genres.map((genre, index) => (
              <li key={index} value={genre.id} onClick={handleClickGen} className='nav-genres-item'>{genre.name}</li>
            ))}
            </ul> : 'loading movie'*/}
        {data ?
          <select className='nav-genres-list nav-text' onChange={handleChange}>
            <option disabled selected className="nav-text">Select genres</option>
            {data.genres.map((genre, index) => (
              <option key={`nav-select ${index}`} value={genre.id} className='nav-genres-item nav-text'>{genre.name}</option>
            ))}
          </select> : 'loading movie'}
      </div>
    </div>
  )
}