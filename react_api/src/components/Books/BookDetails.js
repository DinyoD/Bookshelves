import { useState, useEffect, useContext} from 'react';
import { Link } from 'react-router-dom'

import booksService from '../../services/booksService';
import usersService from '../../services/usersService';
import UserContext from '../Contexts/UserContext';

const BookDetails = ({match}) => {

    const [user, setUser] = useContext(UserContext);

    const [book, setBook ] = useState({})
    const [owned, setOwned] = useState(false)
    const [wished, setWished] = useState(false)



    useEffect(()=> {
        booksService.getOne(match.params.id)
            .then( b => setBook(b))
    },[match.params.id]);

    useEffect(() => {
        console.log(user);
        setOwned(user?.ownedBooks?.some( x=> x._id === book._id || x === book._id ));
        setWished(user?.wishList?.some( x=> x._id === book._id || x === book._id))
    }, [])

    const AddToOwned = () => {
        usersService.addBookToOwnedList(book._id, user)
        .then(() => {
            setOwned(true);
            usersService.removeBookFromWishedList(book._id, user)
                .then(() => {
                    setWished(false);
                    setUser(
                        {
                            ...user, 
                            ownedBooks: [...user.ownedBooks, book._id], 
                            wishList: [...user.wishList.filter(x => x._id !== book._id && x !== book._id)]
                        })
            })
        })
        .then(() => console.log(user))      
    }

    const AddToWished = () => {
        usersService.addBookToWishList(book._id, user)
        .then(() => {
            setWished(true);
            setUser({...user, wishList: [...user.wishList, book._id]});
        })  
    }

    const RemoveFromOwned = () => {
        usersService.removeBookFromOwnedList(book._id, user)
        .then(() => {
            setOwned(false);
            setUser({...user, ownedBooks: [...user.ownedBooks.filter(x => x._id !== book._id && x !== book._id)]})
        })
    }
    const RemoveFromWished = () => {
        usersService.removeBookFromWishedList(book._id, user)
        .then(() => {
            setWished(false);
            setUser({...user, wishList: [...user.wishList.filter(x => x._id !== book._id && x !== book._id)]})
        })
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
                        ?  <Link className='action-link' to='#' onClick={RemoveFromOwned}>Remove from owned list</Link>
                        :  <Link className='action-link' to='#' onClick={AddToOwned}>Add to owned list</Link>}
                    {wished && !owned
                        ? <Link className='action-link' to='#' onClick={RemoveFromWished}>Remove from wish list</Link>
                        : ''}
                    {!wished && !owned
                        ? <Link className='action-link' to='#' onClick={AddToWished}>Add to wish list</Link>
                        : ''
                    }   
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