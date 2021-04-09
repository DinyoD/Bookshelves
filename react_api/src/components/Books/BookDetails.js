import { useState, useEffect, useContext} from 'react';
import { FaRegCheckCircle} from 'react-icons/fa';

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
        setOwned(user?.ownedBooks?.some( x=> x._id === book._id || x === book._id ));
        setWished(user?.wishList?.some( x=> x._id === book._id || x === book._id))
    }, [book._id, user])

    const AddToOwned = () => {
        usersService.addBookToOwnedList(book, user)
        .then(updatedUser => {
            setOwned(true);
            usersService.removeBookFromWishedList(book, updatedUser)
                .then(() => {
                    setWished(false);
                    setUser(prevUser =>
                            ({
                                ...prevUser, 
                                ownedBooks: [...prevUser.ownedBooks, book], 
                                wishList: [...prevUser.wishList.filter(x => x._id !== book._id)]
                            })
                        )
            })
        });  
    }

    const AddToWished = () => {
        usersService.addBookToWishList(book, user)
        .then(() => {
            setWished(true);
            setUser(prevUser => ({...prevUser, wishList: [...prevUser.wishList, book]}));
        })  
    }

    const RemoveFromOwned = () => {
        usersService.removeBookFromOwnedList(book, user)
        .then(() => {
            setOwned(false);
            setUser(prevUser => ({...prevUser, ownedBooks: [...prevUser.ownedBooks.filter(x => x._id !== book._id)] }))
        })
    }

    const RemoveFromWished = () => {
        usersService.removeBookFromWishedList(book, user)
        .then(() => {
            setWished(false);
            setUser(prevUser => ({...prevUser, wishList: [...prevUser.wishList.filter(x => x._id !== book._id)]}))
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
                        ?  <button className='action-link remove' to='#' onClick={RemoveFromOwned}>Remove from My Books</button>
                        :  <button className='action-link' to='#' onClick={AddToOwned}>Add to My Books</button>}
                    {wished && !owned
                        ? <button className='action-link remove' to='#' onClick={RemoveFromWished}>Remove from Wish list</button>
                        : ''}
                    {!wished && !owned
                        ? <button className='action-link' to='#' onClick={AddToWished}>Add to Wish list</button>
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