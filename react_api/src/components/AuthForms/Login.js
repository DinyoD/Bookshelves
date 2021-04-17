import { useState } from 'react';
import { BiError } from 'react-icons/bi';

import authService from '../../services/authService';

const Login = ({ loginUser }) => {

    const [error, setError] = useState(null);

    const  submitHandler = (e) => {
        e.preventDefault();
        
        let user = {
            email: e.target.email.value,
            password: e.target.password.value,
        };
        
        authService.login(user)
        .then((logedUser) => {
            if (logedUser.message) {
                setError(logedUser.message.error)
            }else{
                setError(null)
                loginUser(logedUser);
            }
        })
        .catch((err) => setError('Sorry, something went wrong there. Please, try again...'));

        e.target.email.value ='';
        e.target.password.value ='';


    }

    return (
        <div className='form-container'>
            <form className='form form-register' onSubmit={submitHandler}>
                {error 
                  ? <div className='form-error'><BiError className='form-error-icon'/>{error}</div>
                  : ''}
                  <br />
                <div className='form-control'>
                    <label htmlFor='email'>Email:</label>
                    <input className='form-input' type="text" id='email' name='email' placeholder='enter your email...'/>
                </div>

                <div className='form-control'>
                    <label htmlFor='password'>Password:</label>
                    <input className='form-input' type="text" id='password' name='password' placeholder='enter your password...'/>
                </div>

                <input type="submit" className='btn form-btn' value='Submit'/>
            </form>
        </div>
    )
};

export default Login;