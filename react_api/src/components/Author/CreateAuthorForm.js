import {useState} from 'react';
import { BiError } from 'react-icons/bi';

import authorsService from '../../services/authorsService';

const CreateAuthorForm = ({createAuthor}) => {

    const [error, setError] = useState([]);
    const maxAuthorYearOfBirth = (new Date().getFullYear() - 10);

    const submitHandler = async(e)=> {
        e.preventDefault();

        let author = {
            name: e.target.name.value,
            pictureUrl: e.target.pictureUrl.value,
            yearOfBirth: e.target.yearOfBirth.value
        }

        if (AuthorIsValid(author)) {
            
            let createdAuthor = await authorsService.create(author);
    
            createAuthor(createdAuthor);
        }

    }

    const ValidateInput = (e) => {


        if (e.target.type !== 'number' && ( e.target.value === '' || e.target.value.trim() === '')) {
            
            if (!error.find(x=>x.input === e.target.name)) {
                
                setError(prev => ([...prev, { input: e.target.name, value: 'is required!'}]))
            }

        }else if (e.target.type === 'number' && (e.target.value > maxAuthorYearOfBirth || e.target.value === '' || !Number.isInteger(Number(e.target.value)))) {

            if (!error.find(x=>x.input === e.target.name)) {
                
                setError(prev => ([...prev, { input: e.target.name, value: `is required, must be valid and before ${maxAuthorYearOfBirth}.`}]))
            }
            

        }else{
            setError(prev => ([...(prev.filter(x=>x.input !== e.target.name))]))
        }
    }

    const AuthorIsValid = (author) => {

        let valid = true;

        if (author.name.trim() ===''|| author.name.length < 2) {
            if (!error.find(x=>x.input === 'Author name')) {
                
                setError(prev => ([...prev, { input: 'Author name', value: 'is required and must be 2 symbols at least!'}]))
            }
            valid = false;
        }
        if ( !Number.isInteger(Number(author.yearOfBirth)) || author.yearOfBirth === '' || author.yearOfBirth > maxAuthorYearOfBirth) {
            if (!error.find(x=>x.input === 'Year of Birth')) {
                
                setError(prev => ([...prev, { input: 'Year of Birth', value: `is required, must be valid and before ${maxAuthorYearOfBirth}.`}]))
            }
            valid = false;
        }
        return valid;
    }

    return(

        <form className='form' onSubmit={submitHandler}>
            <h2 className="form-control">Create New Book's Author:</h2>
            <div className="form-control">
                <label htmlFor="name">Author name: *</label>
                <input className='form-input-book' type="text" id='name' name='Author name' onBlur={ValidateInput}/>
            </div>

            <div className="form-control">
                <label htmlFor="yearOfBirth">Author's year of Birth: *</label>
                <input className='form-input-book' type="number" id='yearOfBirth' name='Year of Birth' onBlur={ValidateInput}/>
            </div>

            <div className="form-control">
                <label htmlFor="pictureUrl">Author picture: </label>
                <input className='form-input-book' type="text" id='pictureUrl' name='pictureUrl'/>
            </div>
            <span className='form-ps'> * is required</span>
            <input type="submit" className='btn form-btn' value='Submit New Author'/>
            {error.length > 0 
                    ? error.map(x=> <div key={x.input} className='form-error'><BiError className='form-error-icon'/>{`${x.input} - ${x.value}`}</div> )
                    : ''}
        </form>

    )
}

export default CreateAuthorForm;