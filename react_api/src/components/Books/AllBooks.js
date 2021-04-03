import { useState, useEffect } from 'react';

import BookCard from './BookCard';
import booksService from '../../services/booksService';
// import Login from '../AuthForms/Login';

const AllBooks = ({clickBook}) => {

    const [books, setBooks] = useState([]);

    useEffect(() => {
        booksService.getAll()
            .then(allBooks => setBooks(allBooks))
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