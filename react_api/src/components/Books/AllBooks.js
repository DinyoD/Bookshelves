import { useState, useEffect } from 'react';

import BookCard from './BookCard';
import booksService from '../../services/booksService';

const AllBooks = () => {

    const [books, setBooks] = useState([]);

    useEffect(() => {
        booksService.getAll()
            .then(allBooks => setBooks(allBooks))
    },[])

    console.log(books);
    console.log('all books page');

    return (
        <div>
                {books.map(x=> <BookCard />)}
        </div>
    )
}

export default AllBooks;