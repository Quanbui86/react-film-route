import logo from './logo.svg';
import './App.css';
import Body from './components/Body'
import Film from './pages/filmDetailPage';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Home from './pages/Home';
import Genres from './pages/Genres';
import SearchPage from './pages/SearchPage';
import FavouriteMovies from './pages/FavouriteMovies';
import User from './pages/User';
const appRouter = createBrowserRouter(createRoutesFromElements(
<Route path='/react-film-route' element={<Body/>}>
  <Route index element={<Home/>}/>
  <Route path=":movieListItem/page/:page" element={<Genres/>}/>
  <Route path=":genreName/:filmId" element={<Film/>}/>
  <Route path="search/:filmId" element={<Film/>}/>
  <Route path="search-results/page/:page" element={<SearchPage/>}/>
  <Route path="favourite" element={<FavouriteMovies/>}/>
  <Route path="user" element={<User/>}/>
</Route>
))
//  <Route path=":movieListName" element={<Home/>}/>

function App() {
  return (
    <RouterProvider router={appRouter}/>
  );
}

export default App;
