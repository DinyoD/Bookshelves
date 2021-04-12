import {useState, useEffect} from 'react'

import data from '../../data/data';
import authorsService from '../../services/authorsService';
import bookService from '../../services/booksService';
import CreateAuthor from '../Author/CreateAuthor';

const CreateBook = ({history}) => {

    const [authors, setAuthors] = useState([]);
    const [newAuthor, setNewAuthor] = useState(false);   
    const [author, setAuthor ] = useState({});
    const [genres, setGenres] = useState([]);
    const [language, SetLanguage] = useState([]);

    useEffect(() => {
        authorsService.getAll()
            .then(all => setAuthors([{_id: 0, name: data.authorInput.defautValue}, {_id: 1,name: data.authorInput.addAuthorValue}, ...all]));
        setGenres(['-- select genre --', ...data.genres]);
        SetLanguage(['-- select language --', ...data.language])
    },[])

    const submitHandler = async(e) => {
        e.preventDefault();

        let book = {
            title: e.target.title.value,
            genre: e.target.genre.value,
            year: e.target.year.value,
            language: e.target.language.value,
            description: e.target.description.value,
            coverUrl: e.target.coverUrl.value,
            author: author          
        }
        
        let createdBook = await bookService.create(book)
        
        history.push(`/books/details/${createdBook._id}`)
    }

    const handleChange = (e) => {
        console.log(e.target.value);
        if (e.target.value === data.authorInput.addAuthorValue) {
            setNewAuthor(true)
        }else(
            setAuthor(authors.find(x=>x.name === e.target.value))
        )
    }

    const createAuthor = (author) => {
        setNewAuthor(false);
        setAuthor(author)
    }

    return (

        <div className='form-container'>
            <form className='form' onSubmit={submitHandler}>
                {/* <div>{error.error ? error.error : ''}</div> */}

                <div className='form-control'>
                    <label htmlFor='author'>Author:</label>
                    <select 
                        className='form-input-book'  
                        id='author' 
                        name='author'
                        onChange={handleChange} >
                            {authors.map(x => (<option key={x._id} className='form-option' value={x.name}>{x.name}</option>))}
                    </select>
                </div>

                <div className='form-control'>
                    <label htmlFor='title'>Book title:</label>
                    <input className='form-input-book' type="text" id='title' name='title' placeholder=''/>
                </div>

                <div className='form-control'>
                    <label htmlFor='genre'>Genre:</label>
                    <select className='form-input-book' type="text" id='genre' name='genre' defaultValue='genre'>
                        {genres.map((x, index) => (<option key={index} className='form-option' value={x}>{x}</option>))}
                    </select>
                </div>

                <div className='form-control'>
                    <label htmlFor='language'>Language:</label>
                    <select className='form-input-book' type="text" id='language' name='language' >
                        {language.map((x , index) => (<option key={index} className='form-option' value={x}>{x}</option>))}
                    </select>
                </div>

                <div className='form-control'>
                    <label htmlFor='year'>Publication year:</label>
                    <input className='form-input-book' type="number" id='year' name='year' placeholder=''/>
                </div>

                <div className='form-control'>
                    <label htmlFor='coverUrl'>Book cover:</label>
                    <input className='form-input-book' type="text" id='coverUrl' name='coverUrl' placeholder=''/>
                </div>

                <div className='form-control'>
                    <label htmlFor='description'>Description:</label>
                    <textarea className='form-textarea-book' type="text" id='description' name='description' placeholder=''/>
                </div>

                <input type="submit" className='btn form-btn' value='Submit Book'/>
            </form>
            {newAuthor && <CreateAuthor  createAuthor={createAuthor}/>}
        </div>

    )
}

export default CreateBook;