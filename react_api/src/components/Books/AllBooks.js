import { useState, useEffect, useContext } from 'react';

import BookCard from './BookCard';
import booksService from '../../services/booksService';
import { booksGroup } from '../../data/data.json';
import userContext from '../Contexts/UserContext';

const AllBooks = ({clickBook, group}) => {
    console.log(group);
    const [user] = useContext(userContext);
    const [books, setBooks] = useState([]);

    useEffect(() => {
        switch (group) {
            case booksGroup.all:               
                booksService.getAll()
                    .then(allBooks => setBooks(allBooks));
                break;
        
            case booksGroup.myBooks:
                setBooks(user.ownedBooks)
                break;

            case booksGroup.wishList:
                setBooks(user.wishList)
                break;    

            default:
                break;
        }
    },[])

    const clickHandler =(id) => {
        clickBook(id);
    }

    return (
        <div className='books-container'>
                {books.map(x => (
                    <BookCard 
                    key={x._id}
                    id={x._id}
                    title={x.title} 
                    author={x.author.name} 
                    genre={x.genre} 
                    coverUrl={x.coverUrl} 
                    year={x.year}
                    click={(id) => clickHandler(id)}
                    />))}
        </div>
    )
}

export default AllBooks;