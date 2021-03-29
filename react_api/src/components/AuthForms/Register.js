
import authService from '../../services/authService';

const Register = ({history}) => {


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
        .then((newUser) => {
            localStorage.setItem('username', newUser.username)
            localStorage.setItem('id', newUser._id)
            history.push('/home');
        })
        .catch();

        e.target.username.value ='';
        e.target.email.value ='';
        e.target.password.value ='';
        e.target.confirmPassword.value ='';

    }


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