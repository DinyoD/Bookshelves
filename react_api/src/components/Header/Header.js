import { Link } from "react-router-dom";
// import { useState, useEffect } from 'react';

const Header = ({ user, logoutUser }) => {

    console.log(user);
    return (
        <header className='header'>
            <h2>Bookshelves</h2>
            <div className='header-nav'>
                <Link className='header-nav-link' to='/home'>Home</Link>
                {user.id 
                    ? <Link className='header-nav-link' to='#'>{user.username}</Link>
                    : <Link className='header-nav-link' to='/register'>Register</Link>}
                {user.id 
                    ? <Link className='header-nav-link' to='#' onClick={logoutUser}>Logout</Link> 
                    : <Link className='header-nav-link' to='/Login'>Login</Link>}
                
                
            </div>
        </header>
    )
};

export default Header;
