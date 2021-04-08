import { useState, useEffect, useContext} from 'react';
import { Link } from 'react-router-dom';
import { FaRegCheckCircle } from 'react-icons/fa';

import CreateComment from '../Comment/CreateComment';

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
    }, [user, book])

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
                        ?  <Link className='action-link remove' to='#' onClick={RemoveFromOwned}>Remove from  OWNED list</Link>
                        :  <Link className='action-link' to='#' onClick={AddToOwned}>Add to OWNED list</Link>}
                    {wished && !owned
                        ? <Link className='action-link remove' to='#' onClick={RemoveFromWished}>Remove from WISH list</Link>
                        : ''}
                    {!wished && !owned
                        ? <Link className='action-link' to='#' onClick={AddToWished}>Add to WISH list</Link>
                        : ''
                    }   
                </div>
            </div>

            <div className="book-details-main">
                <div className="details-title-container" >
                    <h1 className="details-title">{book.title}</h1>
                    <FaRegCheckCircle className={owned ? 'check owned' : ( wished ? 'check wished' : 'check')}/>
                </div>
                <div className="details-rating"></div>
                <h3 className="details-author">by: {book.author?.name}</h3>
                <p className="details-description">{book.description}</p>
                <p className="details-info">language: {book.language}</p>
                <p className="details-info">published: {book.year}</p>
                <div className='details-info'>genre: {book.genre}</div>
                <div className='details-comments'>
                    <CreateComment />              
                </div>
            </div>
            
        </div>
    )
}

export default BookDetails;