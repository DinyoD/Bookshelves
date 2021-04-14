import { useState, useEffect, useContext } from 'react';

import BookCard from './BookCard';
import booksService from '../../services/booksService';
import { booksGroup, bookObjectKeys } from '../../data/data.json';
import userContext from '../Contexts/UserContext';
import { useHistory } from 'react-router-dom';



const AllBooks = ({clickBook, group, match}) => {

    const [user] = useContext(userContext);
    const [books, setBooks] = useState([]);
    const history = useHistory();

    useEffect(() => {
      if (group) {
            switch (group) {        
                case booksGroup.myBooks:
                    let userBooksIdList = user.ownedBooks.map(x=> x._id)
                    booksService.getAll()
                            .then(allBooks => setBooks(allBooks.filter(x=>userBooksIdList.includes(x._id))));
                break;
                    
                case booksGroup.wishList:
                    let userWishedIdList = user.wishList.map(x=> x._id)
                    booksService.getAll()
                        .then(allBooks => setBooks(allBooks.filter(x => userWishedIdList.includes(x._id))));
                break;    
                        
                default:
                    booksService.getAll()
                        .then(allBooks => setBooks(allBooks));
                break;
            };
        }else if (match  && Object.keys(match.params).length > 0) {       
            filterBooks(match);
            console.log(2);
        }
    },[match])


    const filterBooks = (match)=> {

        let categorie = match.params.categorie;
        categorie = categorie.slice(0, -1)

        let value = match.params.filter;

        const bookCat = Object.keys(bookObjectKeys)

        if (!bookCat.includes(categorie)) {
            history.push('/no-content')
        }

        if (categorie === 'author') {
            booksService.getAll()
                        .then(allBooks => setBooks(allBooks.filter(x=>x.author.name.toLowerCase() === value)));
            // setBooks(prev => prev.filter(x=>x.author.name.toLowerCase() === value))
        }else if(categorie === 'genre'){
            booksService.getAll()
                        .then(allBooks => setBooks(allBooks.filter(x=>x.genre.toLowerCase() === value)));
            // setBooks(prev => prev.filter(x=>x.genre.toLowerCase() === value));
        }
    }

    const clickBookHandler =(id) => {
        if (user) {
            history.push(`/books/details/${id}`)
        }
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
                    clicked={(id) => clickBookHandler(id)} 
                    />))}
        </div>
    )
}

export default AllBooks;