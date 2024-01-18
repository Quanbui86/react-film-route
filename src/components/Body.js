import React, {useState, useEffect} from "react";
import Header from "./Header";
import Footer from "./Footer";
import Feature from "./Feature"
import Nav from "./Nav";
import { Outlet } from "react-router-dom";
import { get } from "../services/api";

export default function Body(){
  // Checking Scroll state
    const [isScrolling, setIsScrolling] = useState(false);
    useEffect(() => {
        const checkScroll = () => {
          if (window.scrollY > 0) {
            setIsScrolling(true);
          } else {
            setIsScrolling(false);
          }
        };
    
        window.addEventListener('scroll', checkScroll);
        return () => {
          window.removeEventListener('scroll', checkScroll);
        };
      }, []);
  //Lấy danh sách thể loại phim 'genres'
  const [genresData, setGenresData] = useState(null)
  useEffect(() => {
    const url = 'https://api.themoviedb.org/3/genre/movie/list?language=en';
    get('get', url)
      .then(response => {
        setGenresData(response)
      })
      .catch(err => console.error(err));
  }, [])
  //Lấy danh sách thể loại phim 'genres' - END
    return (
        <>
            <Header isScrolling={isScrolling}/> 
            <Outlet context={{ isScrolling, genresData }}/>
            <Footer/>
        </>
    )
}