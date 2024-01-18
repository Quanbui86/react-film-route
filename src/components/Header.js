import React, { useState, useEffect } from "react";
import '../style/style.css'
import logo from '../img/logo.png'
import pnglogo from '../img/pnglogo.png'
import { Link, NavLink, useNavigate } from "react-router-dom";
import Nav from "./Nav";
import UncontrolledExample from "./Carousel";

import Search from "./Search";
export default function Header({ isScrolling }) {
    const navigate = useNavigate();
    console.log(isScrolling)

    const goBack = () => {
        navigate(-1)
    }
    const goFoward = () => {
        navigate(+1)
    }

    return (
        <section className={`z-index-5 pageSetup header-container ${isScrolling ? `position-fixed top-go-up-6rem` : 'position-fixed top-0'}`}>
            <div className={`header-top-bg ${isScrolling ? `` : ''}`}>
                <div className={`container header-top-contain `}>
                    <div className="logo">
                        <Link to='/react-film-route' className={`${isActive => isActive ? '' : ''}`}>
                            <img src={pnglogo} alt='pnglogo' />
                        </Link>
                    </div>
                    <Search isScrolling={isScrolling} />
                    <div className="user-icon">
                        <NavLink to='/react-film-route/user' className={`fa-regular fa-user not-active-class ${({ isActive }) => isActive ? "active" : ""}`}></NavLink>
                        <NavLink to='/react-film-route/favourite' className={`fa-regular fa-bookmark not-active-class ${({ isActive }) => isActive ? "active" : ""}`}></NavLink>
                    </div>
                </div>
            </div>
            <Nav isScrolling={isScrolling} />
            {/**/}
        </section>
    )
}