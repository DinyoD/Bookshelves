import { useState, useEffect, useContext } from 'react';

import BookCard from './BookCard';
import booksService from '../../services/booksService';
import { booksGroup } from '../../data/data.json';
import userContext from '../Contexts/UserContext';

const AllBooks = ({clickBook, group}) => {

    const [user] = useContext(userContext);
    const [books, setBooks] = useState([]);

    useEffect(() => {
        switch (group) {
            case booksGroup.all:               
                booksService.getAll()
                    .then(allBooks => setBooks(allBooks));
                break;
        
            case booksGroup.myBooks:

                let userBooksIdList = user.ownedBooks.map(x=> x._id)

                booksService.getAll()
                    .then(allBooks => setBooks(allBooks.filter(x => userBooksIdList.includes(x._id))));

                break;

            case booksGroup.wishList:

                let userWishedIdList = user.wishList.map(x=> x._id)

                booksService.getAll()
                    .then(allBooks => setBooks(allBooks.filter(x => userWishedIdList.includes(x._id))));
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