import {useState, useEffect} from 'react'

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

    const [book, setBook] = useState({
        title: '',
        author: { name: data.authorInput.defautValue},
        genre: '-- select genre --',
        language: '-- select language --',
        year: '',
        coverUrl: '',
        description: ''
    });

    useEffect(() => {

        authorsService.getAll()
            .then(all => setAuthorsList([{_id: 0, name: data.authorInput.defautValue}, {_id: 1,name: data.authorInput.addAuthorValue}, ...all]));

        setGenresList(['-- select genre --', ...data.genres]);
        setLanguagesList(['-- select language --', ...data.language])

        if (update) {
            booksService.getOne(match.params.id)
                .then( b => {
                    setBook(b);
                });
        }
    },[])

    const submitHandler = async(e) => {

        e.preventDefault();

        let newBook = await AddAdminComment(book, update)

        console.log(newBook);
        
        let createdBook = update ? await booksService.edit(newBook) : await booksService.create(newBook)
        
        history.push(`/books/details/${createdBook._id}`)
    }

    const handleAuthorChange = (e) => {
        console.log(e.target.value);
        if (e.target.value === data.authorInput.addAuthorValue) {
            setNewAuthor(true)
        }else{
            let author = authorsList.find(x=>x.name === e.target.value);
            setBook(b => ({
                ...b,
                author: author
            }))
        }
    }

    const createAuthor = (author) => {
        setNewAuthor(false);
        setBook(b => ({
            ...b,
            author: author
        }))
    }

    const changeValue = (e) => {
        setBook(b => ({
            ...b,
            [e.target.name]: e.target.value
        }))
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
                    <label htmlFor='author'>Author:</label>
                    <select 
                        className='form-input-book'  
                        id='author' 
                        name='author'
                        onChange={handleAuthorChange} 
                        value ={book?.author?.name}>
                            {authorsList.map(x => (<option key={x._id} className='form-option' value={x.name}>{x.name}</option>))}
                    </select>
                </div>

                <div className='form-control'>
                    <label htmlFor='title'>Book title:</label>
                    <input className='form-input-book' type="text" id='title' name='title' value ={book.title} placeholder='' onChange={changeValue}/>
                </div>

                <div className='form-control'>
                    <label htmlFor='genre'>Genre:</label>
                    <select className='form-input-book' type="text" id='genre' name='genre' value ={book.genre} onChange={changeValue}>
                        {genresList.map((x, index) => (<option key={index} className='form-option' value={x}>{x}</option>))}
                    </select>
                </div>

                <div className='form-control'>
                    <label htmlFor='language'>Language:</label>
                    <select className='form-input-book' type="text" id='language' name='language' value ={book.language} onChange={changeValue}>
                        {languagesList.map((x , index) => (<option key={index} className='form-option' value={x}>{x}</option>))}
                    </select>
                </div>

                <div className='form-control'>
                    <label htmlFor='year'>Publication year:</label>
                    <input className='form-input-book' type="number" id='year' name='year' value ={book?.year} placeholder='' onChange={changeValue}/>
                </div>

                <div className='form-control'>
                    <label htmlFor='coverUrl'>Book cover:</label>
                    <input className='form-input-book' type="text" id='coverUrl' name='coverUrl' value ={book?.coverUrl} placeholder='' onChange={changeValue}/>
                </div>

                <div className='form-control'>
                    <label htmlFor='description'>Description:</label>
                    <textarea className='form-textarea-book' type="text" id='description' name='description' value ={book?.description} placeholder='' onChange={changeValue}/>
                </div>

                <input type="submit" className='btn form-btn' value={update ? 'Edit Book Info' : 'Submit Book'}/>
            </form>

            {newAuthor && <CreateAuthorForm  createAuthor={createAuthor}/>}
        </div>
    )
}

export default CreateBook;