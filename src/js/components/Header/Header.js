import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.css'

const paths = [
    {
        title: "Главная",
        path: "/main"
    }, 
    {
        title: "Гонки",
        path: "/races"
    }
]

export default class Header extends Component {
    render() {
        return (
            <header>
                <nav className='header-block' >
                    {paths.map(item => (
                            <div className='header-link'>
                                <NavLink  to={item.path}> {item.title} </NavLink>
                            </div>
                    ))}
                </nav>
            </header>
        )
    }
}