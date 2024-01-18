import React, { useRef, useState, useEffect } from 'react';
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
// register Swiper custom elements

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import '../style/carousel.css';

// import required modules
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';

import { get } from '../services/api';
import { Link, useNavigate } from 'react-router-dom';

export default function Carousel() {
    register();
    const carouselArray = ['Slide xx', 'Slide 2', 'Slide 3', 'Slide 4', 'Slide 5', 'Slide 6']
    const [data, setData] = useState(null)
    const [trending, setTrending] = useState([])
    const navigate = useNavigate()
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
            url = 'https://api.themoviedb.org/3/trending/all/day?language=en-US'
        }
        get('get', url)
            .then(resp => {
                setTrending(resp)
                console.log(resp)
            })
    }, [])
    const handleClickViewDetail = (slide) => {
        navigate(`/react-film-route/trending/${slide.id}`)
    }
    //<div className='sm-carousel-buttons'>
    //<button className='sm-carousel-button1'><i class="fa-solid fa-crown sm-carousel-button-icon"></i>Register package</button>
    //<button className='sm-carousel-button2'><i className="fa-regular fa-bookmark sm-carousel-button-icon"></i>Add to list</button>
    //</div>
    const [mouseOverIndex, setMouseOverIndex] = useState(null);
    const mouseOverHandle = (index) => {
        setMouseOverIndex(index)
    }
    const mouseOutHandle = () => {
        setMouseOverIndex(-1);
    };
    return (
        <>
            <Swiper
                slidesPerView={2}
                spaceBetween={0}
                rewind='true'
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                speed={500}
                autoplay={{
                    delay: 5000, // Thêm dòng này để tự động chuyển slide sau mỗi 5 giây
                    disableOnInteraction: false,
                  }}
                className="sm-carousel z-index-5"
            >
                <div className={`sm-background-top-gradient`}></div>
                {trending && trending.results && trending.results.slice(1, 20).map(((slide, index) =>
                    <div onMouseOver={() => mouseOverHandle(index)} onMouseOut={mouseOutHandle} className='swiper-slide'>
                        <SwiperSlide className='sm-swiper-slide'>
                            
                            <div className={`sm-fore-ground-carousel ${mouseOverIndex === index ? '' : ''}`}></div>
                            <img className={`${mouseOverIndex === index ? '' : ''}`} src={`https://image.tmdb.org/t/p/original${slide.backdrop_path}`} alt='poster' />
                            <div className='sm-carousel-group'>
                                <div className='sm-carousel-title'>{slide.title ? slide.title : slide.name}</div>
                                <div className='sm-carousel-overview'>
                                    <div className='sm-carousel-overview-text'>{slide.overview.substring(0, 0)} <span className='sm-carousel-view-detail' onClick={() => handleClickViewDetail(slide)}>{`View Details `}<i className="fa-solid fa-angle-right sm-carousel-view-icon"></i></span></div>
                                </div>
                            </div>
                        </SwiperSlide>
                    </div>
                ))}
                <div className={`sm-background-gradient ${1 > 0 ? '' : ''}`}></div>
            </Swiper>
            
            <div className={`${mouseOverIndex === 999 ? 'movie-info-to-show' : 'hide'}`}></div>
        </>

    );
}
