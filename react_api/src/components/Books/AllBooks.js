import { useState, useEffect } from 'react';

import BookCard from './BookCard';
import booksService from '../../services/booksService';
// import Login from '../AuthForms/Login';

const AllBooks = () => {

    const [books, setBooks] = useState([]);

    useEffect(() => {
        booksService.getAll()
            .then(allBooks => setBooks(allBooks))
    },[])


    return (
        <div className='books-container'>
                {books.map(x => <BookCard key={x._id} title={x.title} author={x.author.name} genre={x.genre} coverUrl={x.coverUrl} year={x.year}/>)}
        </div>
    )
}

export default AllBooks;