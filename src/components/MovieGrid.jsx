export default function MovieGrid({allmovieData, handleClick }) {
    return (
        <>
        { allmovieData && allmovieData.results ?
            <>
                <ul className='movie-grid' >{allmovieData.results.map((movie, index) =>
                    <li
                        className='movie-item'
                        onClick={() => handleClick(movie)}
                        key={`movie ${index}`}
                    >
                        <div className={`movie-title z-index-1`}>
                            <p>{movie.title}</p>
                        </div>
                        <img
                            className={`movie-bg movie-img`}
                            src={movie.poster_path ?
                                `https://image.tmdb.org/t/p/w500${movie.poster_path}` :
                                movie.backdrop_path ?
                                    `https://image.tmdb.org/t/p/w500${movie.backdrop_path}` :
                                    `https://image.tmdb.org/t/p/w500/qF0ZIAe1DRe49ql02KaYl04gnxt.jpg`}
                            alt='movie poster'
                        />
                    </li>
                )}
                </ul>
            </> : ''}
        </>
        
    )
}