import { NavLink as Link } from "react-router-dom";

const Header = () => (
        <header className='header'>
            <h2>Bookshelves</h2>
            <div className='header-nav'>
                <Link className='header-nav-link' to='/home'>Home</Link>
                <Link className='header-nav-link' to='/register'>Register</Link>
                <Link className='header-nav-link' to='/Login'>Login</Link>
                <Link className='header-nav-link' to='/home'>Logout</Link>
            </div>
        </header>
    );

export default Header;
