import { useState, useEffect } from 'react';

const serverUrl = 'http://localhost:5000/api/v1/auth/register';

const Register = () => {

    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const  submitHandler = (e) => {
        e.preventDefault();
        setUser({
            username: e.target.username.value,
            email: e.target.email.value,
            password: e.target.password.value,
            confirmPassword: e.target.confirmPassword.value
        })
        
        e.target.username.value ='';
        e.target.email.value ='';
        e.target.password.value ='';
        e.target.confirmPassword.value ='';
    }
    
    useEffect( () => {
        const register = async () => {
            await fetchData(user);

        };
        
        register();
    },[user])

    const fetchData = async(user) => {
        const res = await fetch(
            serverUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'                       
                },
                body: JSON.stringify(user)
            }
        );
        return await res.json()
    };



    return (
        <div className='form-container'>
            <form className='form form-register' onSubmit={submitHandler}>
                {/* <div>{error.error ? error.error : ''}</div> */}
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
                    <input className='form-input' type="text" id='password' name='password' placeholder='At least 5 symbols. Require alfabet and digit...'/>
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