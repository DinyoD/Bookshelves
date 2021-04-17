import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { BiError } from 'react-icons/bi';

import authService from '../../services/authService';

const Register = ({loginUser}) => {

    const [error, setError] = useState(null);
    const history  = useHistory(); 

    const  submitHandler = (e) => {
        e.preventDefault();

        let user = {
            username: e.target.username.value,
            email: e.target.email.value,
            password: e.target.password.value,
            confirmPassword: e.target.confirmPassword.value
        };


       //TODO validate user
        
        authService.register(user)
        .then((logedUser) => {
            if (logedUser.message) {
                setError(logedUser.message.error)
            }else{
                setError(null)
                loginUser(logedUser);
            }
            // history.push('/books')
        })
        .catch((err) => setError('Sorry, something went wrong there. Please, try again...'));

        e.target.username.value ='';
        e.target.email.value ='';
        e.target.password.value ='';
        e.target.confirmPassword.value ='';

    }


    return (
        <div className='form-container'>
            <form className='form form-register' onSubmit={submitHandler}>

                {error 
                  ? <div className='form-error'><BiError className='form-error-icon'/>{error}</div>
                  : ''}
                  <br />

                <div className='form-control'>
                    <label htmlFor='username'>Name:</label>
                    <input className='form-input' type="text" id='username' name='username' placeholder='Choose a name...'/>
                </div>

                <div className='form-control'>
                    <label htmlFor='email'>Email:</label>
                    <input className='form-input' type="text" id='email' name='email' placeholder='example@mail.com...'/>
                </div>

                <div className='form-control'>
                    <label htmlFor='password'>Password:</label>
                    <input className='form-input' type="text" id='password' name='password' placeholder='At least 5 symbols...'/>
                </div>

                <div className='form-control'>
                    <label htmlFor='confirmPassword'>Confirm Password:</label>
                    <input className='form-input' type="text" id='confirmPassword' name='confirmPassword' placeholder='Retape your password...'/>
                </div>

                <input type="submit" className='btn form-btn' value='Submit'/>
            </form>
        </div>
    )
}

export default Register;