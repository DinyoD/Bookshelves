import { Link } from 'react-router-dom';

const NoContent = ({text}) =>{
    return ( text 
        ? <h2 className='no-content'>{text}</h2>
        : (<div className='no-content no-content-container'>
            <h2>Page not found.</h2>
            <h4>Our apologies, this is almost certainly not the page you were looking for.</h4>
            <h4>Please try the links, above, or visit our <Link to="/">home page</Link>.</h4>
          </div>))
}

export default NoContent;