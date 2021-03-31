import { useHistory } from 'react-router-dom';
import authService from '../../services/authService';

const Login = ({ loginUser }) => {

    const history  = useHistory(); 
    const  submitHandler = (e) => {
        e.preventDefault();
        let user = {
            email: e.target.email.value,
            password: e.target.password.value,
        };

        //TODO validate user
        
        authService.login(user)
        .then((logedUser) => {
            console.log(logedUser);
            localStorage.setItem('username', logedUser.username)
            localStorage.setItem('id', logedUser._id)

            loginUser(logedUser);

            history.push('/books')
        })
        .catch();

        e.target.email.value ='';
        e.target.password.value ='';


    }

    return (
        <div className='form-container'>
            <form className='form form-register' onSubmit={submitHandler}>
                {/* <div>{error.error ? error.error : ''}</div> */}
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