import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { BiError } from 'react-icons/bi';

import authService from '../../services/authService';

const Register = ({loginUser}) => {

    const [error, setError] = useState([]);
    const history  = useHistory(); 

    const  submitHandler = (e) => {
        e.preventDefault();

        let user = {
            username: e.target.username.value,
            email: e.target.email.value,
            password: e.target.password.value,
            confirmPassword: e.target.confirmPassword.value
        };


       if(ValidUserInputs(user)){

           authService.register(user)
           .then((logedUser) => {
               if (logedUser.message) {
                   if (!error.find(x=> x === logedUser.message.error)) {
                       
                       setError(prev => ([...prev, logedUser.message.error]))
                   }
               }else{
                   setError([])
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
    }

    const ValidUserInputs = (user) =>{
        let result = true;
        if (user.username === '' || user.username.trim() === '') {
            if (!error.find(x=> x === 'Username is required')) {
                       
                setError(prev => ([...prev, 'Username is required!']))
            }
            result = false;
        }else{
            setError(prev => ([...prev.filter(x=>x !== 'Username is required!')]))
        }

        if (user.email === '' || user.email.trim() === '') {
            if (!error.find(x=> x === 'Email is required!')) {
                       
                setError(prev => ([...prev, 'Email is required!']))
            }
            result = false;
        }else{
            setError(prev => ([...prev.filter(x=>x !== 'Email is required!')]))
        }

        if (user.confirmPassword !== user.password || user.password === '' || user.password.trim() === '') {
            if (!error.find(x=> x === 'Passwords fields are required and must match!')) {
                       
                setError(prev => ([...prev, 'Passwords fields are required and must match!']))
            }
            result = false;
        }else{
            setError(prev => ([...prev.filter(x=>x !== 'Passwords fields are required and must match!')]))
        }
        return result;
    }


    return (
        <div className='form-container'>
            <form className='form form-register' onSubmit={submitHandler}>

            {error.length > 0 
                        ? error.map(x=> <div key={x} className='form-error'><BiError className='form-error-icon'/>{x}</div> )
                        : ''}
                  <br />

                <div className='form-control'>
                    <label htmlFor='username'>Name: *</label>
                    <input className='form-input' type="text" id='username' name='username' placeholder='Choose a name...'/>
                </div>

                <div className='form-control'>
                    <label htmlFor='email'>Email: *</label>
                    <input className='form-input' type="text" id='email' name='email' placeholder='example@mail.com...'/>
                </div>

                <div className='form-control'>
                    <label htmlFor='password'>Password: *</label>
                    <input className='form-input' type="text" id='password' name='password' placeholder='At least 5 symbols...'/>
                </div>

                <div className='form-control'>
                    <label htmlFor='confirmPassword'>Confirm Password *</label>
                    <input className='form-input' type="text" id='confirmPassword' name='confirmPassword' placeholder='Retape your password...'/>
                </div>
                <span className='form-ps'> * required field</span>
                <input type="submit" className='btn form-btn' value='Submit'/>
            </form>
        </div>
    )
}

export default Register;