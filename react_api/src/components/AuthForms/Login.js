import authService from '../../services/authService';

const Login = ({ history }) => {

    const  submitHandler = (e) => {
        e.preventDefault();
        let user = {
            username: e.target.username.value,
            password: e.target.password.value,
        };

        //TODO validate user
        
        authService.login(user)
        .then(() => history.push('/home'));

        e.target.username.value ='';
        e.target.password.value ='';


    }

    return (
        <div className='form-container'>
            <form className='form form-register' onSubmit={submitHandler}>
                {/* <div>{error.error ? error.error : ''}</div> */}
                <div className='form-control'>
                    <label htmlFor='username'>Name:</label>
                    <input className='form-input' type="text" id='username' name='username' placeholder='Type your name...'/>
                </div>

                <div className='form-control'>
                    <label htmlFor='password'>Password:</label>
                    <input className='form-input' type="text" id='password' name='password' placeholder='Type your password...'/>
                </div>

                <input type="submit" className='btn form-btn' value='Submit'/>
            </form>
        </div>
    )
};

export default Login;