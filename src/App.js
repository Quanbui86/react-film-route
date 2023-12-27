import logo from './logo.svg';
import './App.css';
import Root from './components/Root'
import Film from './pages/filmDetailPage';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Home from './pages/Home';
import Genres from './pages/Genres';
const appRouter = createBrowserRouter(createRoutesFromElements(
<Route path='/' element={<Root/>}>
  <Route index element={<Home/>}/>
  <Route path="/:genreName" element={<Genres/>}/>
  <Route path="/:genreName/:filmId" element={<Film/>}/>
</Route>
))
function App() {
  return (
    <RouterProvider router={appRouter}/>
  );
}

export default App;
