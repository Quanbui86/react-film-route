import React from "react";
import '../style/style.css'
import logo from '../img/logo.png'
import { Link } from "react-router-dom";
export default function Header(){
    const nav = ['Address', 'Contact', 'About']
    return (
        <section className="header">
            <div className="logo"><Link to='/'><img src={logo} alt='logo'/></Link></div>
            <ul className="nav">
                <li className="navItem"><Link to='/'><h3>Home</h3></Link></li>
                {nav.map((item, index)=>{return <li key={index} className="navItem">{item}</li>})}
            </ul>  
        </section>
    )
}