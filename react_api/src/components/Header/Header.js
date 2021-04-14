import { useContext, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { FaBookReader } from 'react-icons/fa'

import Dropdown from '../../components/Shared/Dropdown';

import { genres } from '../../data/data.json';
import UserContext from '../Contexts/UserContext';
import authorsService from '../../services/authorsService';

const Header = ({ logoutUser }) => {

    const [ user ] =useContext(UserContext);
    const [authors, setAuthors] = useState([]);

    useEffect(()=> {
        authorsService.getAll()
        .then(all => setAuthors(all.map(x=>x.name)))
    },[]);

    return (
        <header className='header'>
            <div className='header-nav'>
                <Link className='header-nav-link' to='/'>
                    <span className='title'>Bookshelves</span>
                </Link>
            
                <Dropdown name="Genres" data={genres}/>
                <Dropdown name="Authors" data={authors}/>
            </div>
            <div className='header-nav'>

                {user 
                    ? <Link className='header-nav-link' to='/books'>
                        <FaBookReader className='user-icon'/>
                        <span className='user-name'>{user.username}</span>        
                      </Link>
                    : <Link className='header-nav-link' to='/register'>Register</Link>}
                {user ? <Link className='header-nav-link' to='/books/create'>Add Book</Link> : ''}
                {user ? <Link className='header-nav-link' to='/comments/user'>My Comments</Link> : ''}
                {user
                    ? <Link className='header-nav-link' to='#' onClick={logoutUser}>Logout</Link> 
                    : <Link className='header-nav-link' to='/Login'>Login</Link>}
                               
            </div>
        </header>

    )
};

export default Header;
