import '../style/style.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { useSearchParams, useParams } from 'react-router-dom'

export default function ChangePage({ allmovieData }) {
  const [searchParams] = useSearchParams();
  const search = searchParams.get('query');
  const { page } = useParams()
  const navigate = useNavigate();
  const location = useLocation()
  const navigateToPage = (pageNumber) => {
    const newPathname = location.pathname.replace(page, pageNumber) + location.search;
    navigate(newPathname);
  }
  console.log(location.pathname)
  let nextPage = () => { };
  let prevPage = () => { };
  let handlePageButton = () => { };
  if (location.pathname != '/react-film-route') {
    nextPage = () => navigateToPage(parseInt(page) + 1);
    prevPage = () => navigateToPage(parseInt(page) - 1);
    handlePageButton = (item) => {
      navigateToPage(parseInt(item));
    }
  } else {
    nextPage = () => navigate('/react-film-route/now_playing/page/2')
    handlePageButton = (item) => {
      navigate(`/react-film-route/now_playing/page/${item}`);
    }
  }
  let pageCheck = true;
  if (!page || isNaN(page)) {
    pageCheck = false;
  }
  console.log(pageCheck)
  //Các nút để chọn trang
  let buttonArray = [];
  let totalPages;
  if (allmovieData && allmovieData.total_pages) {
    totalPages = allmovieData.total_pages;
    if (totalPages >= 9 && pageCheck) {
      switch (Number(page)) {
        case 1:
          buttonArray = [1, 2, 3, '...', totalPages];
          break;
        case 2:
          buttonArray = [1, 2, 3, 4, '...', totalPages];
          break;
        case 3:
          buttonArray = [1, 2, 3, 4, 5, '...', totalPages];
          break;
        case 4:
          buttonArray = [1, 2, 3, 4, 5, 6, '...', totalPages];
          break;
        case (totalPages - 1):
        case (totalPages - 2):
        case (totalPages - 3):
          buttonArray = [1, 2, '...', totalPages - 5, totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
          break;
        case totalPages:
          buttonArray = [1, 2, '...', totalPages - 5, totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
          break;
        // Add more cases as needed
        default:
          buttonArray = [1, '...', Number(page) - 1, Number(page), Number(page) + 1, '...', totalPages];
          break;
      }
    } else if (pageCheck === false) {
      buttonArray = [1, 2, 3, '...', totalPages];
    } else buttonArray = Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  return (
    <>
      <div className='buttonPages'>
        <button className={1 === Number(page) ? 'button hidden' : 'button'} onClick={prevPage}>{String('<')}</button>
        {buttonArray && buttonArray.map((item, index) => (
          <button key={`page ${index}`} className={`button ${item === Number(page) ? 'active' : ''}`} onClick={() => handlePageButton(item)}>
            {item}
          </button>
        ))}
        <button className={totalPages === Number(page) ? 'button hidden' : 'button'} onClick={nextPage}>{String('>')}</button>
      </div>
      <form className='hidden'>
        <label htmlFor='pageInput'>Page</label>
        <input id='pageInput' className='pageInput' ></input>
        <input type='submit' className='button'></input>
      </form>
    </>
  )
}