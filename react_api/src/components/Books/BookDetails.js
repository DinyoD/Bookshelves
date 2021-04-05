import { useState, useEffect} from 'react';
import { Link } from 'react-router-dom'

import booksService from '../../services/booksService';

const BookDetails = ({match, user}) => {

    const [book, setBook ] = useState({})
    const [owned, setOwned] = useState(true)
    const [wished, setWished] = useState(true)



    useEffect(()=> {
        booksService.getOne(match.params.id)
            .then( b => {
                setBook(b)
            });
            

    },[])

    useEffect(() => {
        if(book && user){

            let ownedBook = user.ownedBooks?.includes( x=> x._id === book._id);
            console.log(`owned - ${ownedBook}`);
            setOwned(ownedBook)

            let wishedBook = user.wishList?.includes( x=> x._id === book._id);
            console.log(`wished - ${wishedBook}`);
            setWished(wishedBook)
        }

    },[book])

    console.log(user.ownedBooks);


    const AddtoOwned = () => {
        console.log(user);
    }

    return (
        <div className='book-details-container'>

            <div className='book-details-aside'>
                <div className='book-details-cover'>
                    <img className='image'src={book.coverUrl} alt=""/>
                </div>
                <div className="book-details-actions">                  
                    {/* <Link className='action-link' to='#'>Readed</Link> */}
                    { owned 
                        ?  <Link className='action-link' to='#'>Remove from owned list</Link>
                        :  <Link className='action-link' to='#' onClick={AddtoOwned}>Add to owned list</Link>}
                    {wished
                        ? <Link className='action-link' to='#'>Remove from wish list</Link>
                        : <Link className='action-link' to='#'>Add to wish list</Link>}
                </div>
            </div>

            <div className="book-details-main">
                <h1 className="details-title">{book.title}</h1>
                <div className="details-rating"></div>
                <h3 className="details-author">By: {book.author?.name}</h3>
                <p className="details-description">{book.description}</p>
                <p className="details-info">Language: {book.language}</p>
                <p className="details-info">Published: {book.year}</p>
                <div className='details-info'>Genre: {book.genre}</div>
                <div className='details-comments'>
                        <form className='form'>
                            <label htmlFor="comment">
                                Write your comment:
                                <input className='btn' type="button" value="Submit"/>
                            </label>
                            <br/>
                            <textarea name="comment" id="comment" cols="100" rows="5"></textarea>
                            <br/>
                        </form>                
                </div>
            </div>
            
        </div>
    )
}

export default BookDetails;