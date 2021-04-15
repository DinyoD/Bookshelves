import {useState, useEffect} from 'react'
import { BiError } from 'react-icons/bi';

import CreateAuthorForm from '../Author/CreateAuthorForm';

import authorsService from '../../services/authorsService';
import booksService from '../../services/booksService';
import commentsService from '../../services/commentsService';

import data from '../../data/data';

const CreateBook = ({history, match, update}) => {

    const [newAuthor, setNewAuthor] = useState(false);   
    
    const [authorsList, setAuthorsList] = useState([]);
    const [genresList, setGenresList] = useState([]);
    const [languagesList, setLanguagesList] = useState([]);

    const [error, setError] = useState([]);

    const [book, setBook] = useState({
        title: '',
        author: { name: data.authorInput.defautValue},
        genre: data.genreInput.defautValue,
        language: data.languageInput.defautValue,
        year: '',
        coverUrl: '',
        description: ''
    });

    useEffect(() => {

        authorsService.getAll()
            .then(all => setAuthorsList([{_id: 1, name: data.authorInput.defautValue}, {_id: 2,name: data.authorInput.addAuthorValue}, ...all]));

        setGenresList([data.genreInput.defautValue, ...data.genres]);
        setLanguagesList([data.languageInput.defautValue, ...data.language])

        if (update) {
            booksService.getOne(match.params.id)
                .then( b => {
                    setBook(b);
                });
        }
    },[])

    const submitHandler = async(e) => {

        e.preventDefault();

        if (BookIsValid(book)) {
            
            let newBook = await AddAdminComment(book, update)
    
            console.log(newBook);
            
            let createdBook = update ? await booksService.edit(newBook) : await booksService.create(newBook)
            
            history.push(`/books/details/${createdBook._id}`)
        }

    }

    const handleAuthorChange = (e) => {

        if (e.target.value === data.authorInput.addAuthorValue) {
            setNewAuthor(true)
            setBook(prev => ({...prev, author: { name: data.authorInput.addAuthorValue},}))
        }else{
            setNewAuthor(false)
            let author = authorsList.find(x=>x.name === e.target.value);
            setBook(b => ({
                ...b,
                author: author
            }))
        }
    }

    const createAuthor = (author) => {
        setNewAuthor(false);

        setAuthorsList(prev => ([{_id: 0,name: author.name}, ...prev]))

        setBook(b => ({
            ...b,
            author: author
        }))
    }

    const changeValue = (e) => {
        
        setBook(b => ({
            ...b,
            [e.target.id]: e.target.value
        }));
    }

    const ValidateInput = (e) => {
        if (e.target.type !== 'number' && (e.target.value === data.authorInput.defautValue 
            || e.target.value === data.genreInput.defautValue 
            || e.target.value === data.languageInput.defautValue
            || e.target.value === ''
            || e.target.value.trim() === '')) {
            
            if (!error.find(x=>x.input === e.target.name)) {
                
                setError(prev => ([...prev, { input: e.target.name, value: 'is required!'}]))
            }

        }else if (e.target.type === 'number' && 
                (e.target.value < 0 || e.target.value > new Date().getFullYear() || e.target.value === '' || !Number.isInteger(Number(e.target.value)))) {

            if (!error.find(x=>x.input === e.target.name)) {
                
                setError(prev => ([...prev, { input: e.target.name, value: 'is required and must be valid!'}]))
            }
            

        }else{
            setError(prev => ([...(prev.filter(x=>x.input !== e.target.name))]))
        }
    }

    const BookIsValid = (book) => {

        let valid = true;

        if (book.author.name === data.authorInput.defautValue) {
            if (!error.find(x=>x.input === 'Author')) {
                
                setError(prev => ([...prev, { input: 'Author', value: 'is required!'}]))
            }
            valid = false;
        }
        if (book.author.name === data.authorInput.addAuthorValue) {
            if (!error.find(x=>x.input === 'Author')) {
                
                setError(prev => ([...prev, { input: 'Author', value: 'create or choose'}]))
            }
            valid = false;
        } 
        if (book.title === '' || book.title.trim() === '') {
            if (!error.find(x=>x.input === 'Book title')) {
                
                setError(prev => ([...prev, { input: 'Book title', value: 'is required!'}]))
            }
            valid = false;
        }
        if (book.genre === data.genreInput.defautValue) {
            if (!error.find(x=>x.input === 'Genre')) {
                
                setError(prev => ([...prev, { input: 'Genre', value: 'is required!'}]))
            }
            valid = false;
        }
        if (book.language === data.languageInput.defautValue) {
            if (!error.find(x=>x.input === 'Language')) {
                
                setError(prev => ([...prev, { input: 'Language', value: 'is required!'}]))
            }
            valid = false;
        }
        if (book.year === '' || !Number.isInteger(Number(book.year))|| book.year < 0 || book.year > new Date().getFullYear()) {
            if (!error.find(x=>x.input === 'Publication year')) {
                
                setError(prev => ([...prev, { input: 'Publication year', value: 'is required and must be valid!'}]))
            }
            valid = false;
        }
        return valid;
    }
    
    const AddAdminComment = async (book, update) =>{

        let currenUser = localStorage.username;

        let comment = {
            user: 'Admin',
            text: `This book info is ${update ? 'edited' : 'created'} by ${currenUser}`
        }

        let createdComment = await commentsService.create(comment)
        let newBook = update ? {...book, comments: [...book.comments, createdComment]} :   {...book, comments: [createdComment]}
        return newBook;
    }

    return (
        <div className='form-container'>
            <form className='form' onSubmit={submitHandler}>

                <div className='form-control'>
                    <label htmlFor='author'>Author: *</label>
                    <select 
                        className='form-input-book'  
                        id='author' 
                        name='Author'
                        onChange={handleAuthorChange} 
                        onBlur={ValidateInput}
                        value ={book?.author?.name}>
                            {authorsList.map(x => (<option key={x._id} className='form-option' value={x.name}>{x.name}</option>))}
                    </select>
                </div>

                <div className='form-control'>
                    <label htmlFor='title'>Book title: *</label>
                    <input className='form-input-book' type="text" id='title' name='Book title' placeholder='' 
                            value ={book.title}  onChange={changeValue} onBlur={ValidateInput}/>
                </div>

                <div className='form-control'>
                    <label htmlFor='genre'>Genre: *</label>
                    <select className='form-input-book' type="text" id='genre' name='Genre' value ={book.genre} onChange={changeValue} onBlur={ValidateInput}>
                        {genresList.map((x, index) => (<option key={index} className='form-option' value={x}>{x}</option>))}
                    </select>
                </div>

                <div className='form-control'>
                    <label htmlFor='language'>Language: *</label>
                    <select className='form-input-book' type="text" id='language' name='Language' value ={book.language} onChange={changeValue} onBlur={ValidateInput}>
                        {languagesList.map((x , index) => (<option key={index} className='form-option' value={x}>{x}</option>))}
                    </select>
                </div>

                <div className='form-control'>
                    <label htmlFor='year'>Publication year: *</label>
                    <input className='form-input-book' type="number" id='year' name='Publication year' value ={book?.year} placeholder='' onChange={changeValue} onBlur={ValidateInput}/>
                </div>

                <div className='form-control'>
                    <label htmlFor='coverUrl'>Book cover:</label>
                    <input className='form-input-book' type="text" id='coverUrl' name='coverUrl' value ={book?.coverUrl} placeholder='' onChange={changeValue}/>
                </div>

                <div className='form-control'>
                    <label htmlFor='description'>Description:</label>
                    <textarea className='form-textarea-book' type="text" id='description' name='description' value ={book?.description} placeholder='' onChange={changeValue}/>
                </div>
                <span className='form-ps'> * is required</span>
                <input type="submit" className='btn form-btn' value={update ? 'Edit Book Info' : 'Submit Book'}/>

                {error.length > 0 
                    ? error.map(x=> <div key={x.input} className='form-error'><BiError className='form-error-icon'/>{`${x.input} - ${x.value}`}</div> )
                    : ''}
            </form>

            {newAuthor && <CreateAuthorForm  createAuthor={createAuthor}/>}
        </div>
    )
}


export default CreateBook;