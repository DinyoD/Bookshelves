import { useContext } from 'react';
import { Link } from "react-router-dom";

import UserContext from '../Contexts/UserContext';

const Header = ({ logoutUser }) => {

    const [ user ] =useContext(UserContext);
    console.log(user)

    return (
        <header className='header'>
            <h2>Bookshelves</h2>
            <div className='header-nav'>
                <Link className='header-nav-link' to='/'>Home</Link>
                <Link className='header-nav-link' to='/'>Genres</Link>
                <Link className='header-nav-link' to='/'>Authors</Link>

                {user ? <Link className='header-nav-link' to='/books/create'>Add Book</Link> : ''}
                {user 
                    ? <Link className='header-nav-link' to='/books'>{user.username} books</Link>
                    : <Link className='header-nav-link' to='/register'>Register</Link>}
                {user
                    ? <Link className='header-nav-link' to='#' onClick={logoutUser}>Logout</Link> 
                    : <Link className='header-nav-link' to='/Login'>Login</Link>}
                
                
            </div>
        </header>

    )
};

export default Header;
