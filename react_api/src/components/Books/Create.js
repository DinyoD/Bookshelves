import {useState, useEffect} from 'react'

import data from '../../data/data';
import authorsService from '../../services/authorsService';

const Create = () => {
    const [authors, setAuthors] = useState([]);

    useEffect(() => {
        authorsService.getAll()
            .then(a => setAuthors([{name: '-- select author --'}, ...a]))
    },[])

    const submitHandler = async(e) => {
        e.preventDefault();

        let authorId;
        if (e.target.newAuthor.value) {
            let author = await authorsService.create(e.target.newAuthor.value)
            authorId = author._id
        }else{
            authorId = e.target.author.value;
        }

        let book = {
            title: e.target.title.value,
            genre: e.target.genre.value,
            year: e.target.year.value,
            language: e.target.language.value,
            description: e.target.description.value,
            coverUrl: e.target.coverUrl.value,
            author: authorId           
        }
        console.log(book);
    }

    return (
        <div className='form-container'>
            <form className='form' onSubmit={submitHandler}>
                {/* <div>{error.error ? error.error : ''}</div> */}
                <div className='form-control'>
                    <label htmlFor='title'>Book title:</label>
                    <input className='form-input-book' type="text" id='title' name='title' placeholder=''/>
                </div>

                <div className='form-control'>
                    <label htmlFor='genre'>Genre:</label>
                    <select className='form-input-book' type="text" id='genre' name='genre' >
                        {data.genres.map((x , index) => (<option key={index} className='form-option' value={x}>{x}</option>))}
                    </select>
                </div>

                <div className='form-control'>
                    <label htmlFor='language'>Language:</label>
                    <select className='form-input-book' type="text" id='language' name='language' >
                        {data.language.map((x , index) => (<option key={index} className='form-option' value={x}>{x}</option>))}
                    </select>
                </div>

                <div className='form-control'>
                    <label htmlFor='year'>Publication year:</label>
                    <input className='form-input-book' type="number" id='year' name='year' placeholder=''/>
                </div>

                

                <div className='form-control'>
                    <label htmlFor='description'>Description:</label>
                    <textarea className='form-textarea-book' type="text" id='description' name='description' placeholder=''/>
                </div>

                <div className='form-control'>
                    <label htmlFor='coverUrl'>Book cover:</label>
                    <input className='form-input-book' type="text" id='coverUrl' name='coverUrl' placeholder=''/>
                </div>

                <div className='form-control'>
                    <label htmlFor='author'>Author:</label>
                    <select className='form-input-book' type="text" id='author' name='author' value="author" >
                        {authors.map(x => (<option key={x._id} className='form-option' value={x._id}>{x.name}</option>))}
                    </select>
                </div>

                <div className='form-control'>
                    <label htmlFor='newAuthor'>Add new Author:</label>
                    <input className='form-input-book' type="text" id='newAuthor' name='newAuthor' placeholder='add new author manualy...'/>
                </div>

                <input type="submit" className='btn form-btn' value='Submit'/>
            </form>
        </div>
    )
}

export default Create;