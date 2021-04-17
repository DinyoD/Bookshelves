import { useState, useEffect, useContext} from 'react';
import { Link, Redirect,useHistory } from 'react-router-dom';
import { FaRegCheckCircle} from 'react-icons/fa';

import CreateComment from '../Comment/CreateComment';
import Comments from '../Comment/Comments';
import UserContext from '../Contexts/UserContext';

import booksService from '../../services/booksService';
import usersService from '../../services/usersService';

const BookDetails = ({match}) => {

    const [user, setUser] = useContext(UserContext);
    const [book, setBook ] = useState({});
    const [owned, setOwned] = useState(false);
    const [wished, setWished] = useState(false);
    const [hasComments, setHasComments] = useState(false);

    const history = useHistory()

    useEffect(()=> {
        booksService.getOne(match.params.id)
            .then( b =>{ 
                if (!b.message) {       
                    console.log(b);            
                    setBook(b);
                }else{
                    history.push('/no-content')
                }
            })
    },[]);

    useEffect(() => {
        setOwned(user?.ownedBooks?.some( x=> x._id === book._id || x === book._id ));
        setWished(user?.wishList?.some( x=> x._id === book._id || x === book._id));
        setHasComments(book?.comments?.length > 0)
    }, [book])

    const AddToOwned = async () => {
        try {
            let updatedOwnedBooksUser = await  usersService.addBookToOwnedList(book, user);
            setOwned(true);
            if (wished) {
                await usersService.removeBookFromWishedList(book, updatedOwnedBooksUser);
                setWished(false);
                setUser(prev => ({
                    ...prev,
                    ownedBooks: [...prev.ownedBooks, book],
                    wishList: [...prev.wishList.filter(x=>x._id !== book._id)]
                }) );
                
            }else{
                setUser(prev => ({...prev, ownedBooks: [...prev.ownedBooks, book]}));
            }
        } catch (error) {               
            
        }
    }

    const AddToWished = () => {
        usersService.addBookToWishList(book, user)
            .then(() => {
                setWished(true);
                setUser(prevUser => ({...prevUser, wishList: [...prevUser.wishList, book]}));
            })

    }

    const removeFromOwned = () => {
        usersService.removeBookFromOwnedList(book, user)
            .then(() => {
                setOwned(false);
                setUser(prevUser => ({...prevUser, ownedBooks: [...prevUser.ownedBooks.filter(x => x._id !== book._id)] }))
            })
    }

    const removeFromWished = () => {
        usersService.removeBookFromWishedList(book, user)
            .then(() => {
                setWished(false);
                setUser(prevUser => ({...prevUser, wishList: [...prevUser.wishList.filter(x => x._id !== book._id)]}))
            })
    }

    const addComment = (comment) => {
        setBook(prev => ({
            ...prev,
            comments: [...prev.comments, comment]
        }));
        setHasComments(true);
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
                        ?  <button className='action-link remove' to='#' onClick={removeFromOwned}>Remove from My Books</button>
                        :  <button className='action-link' to='#' onClick={AddToOwned}>Add to My Books</button>}
                    {wished && !owned
                        ? <button className='action-link remove' to='#' onClick={removeFromWished}>Remove from Wish list</button>
                        : ''}
                    {!wished && !owned
                        ? <button className='action-link' to='#' onClick={AddToWished}>Add to Wish list</button>
                        : ''
                    }
                    {owned || wished
                        ? <Link className='action-link' to={`/books/update/${book._id}`} >Edit Book Info</Link>
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
                    <CreateComment book={book} addComment={addComment}/>              
                </div>
                {hasComments

                    ? <Comments comments={book.comments} book={true}/>
                    : <div>This book has no comments yet.</div>
                }
            </div>
            
        </div>
    )
}

export default BookDetails;