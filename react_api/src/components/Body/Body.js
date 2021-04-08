import { Route, Redirect} from 'react-router-dom';

import Register from '../AuthForms/Register';
import Login from '../AuthForms/Login';
import Books from '../Books/Books';

function Body({loginUser, user}){
    return (
        <div className='body-container'>

            <Route exact path='/' render={() => (<Redirect to='/books' />)} />

            <Route path='/register' render={(props) => <Register {...props} loginUser={loginUser}/>}/>
 
            <Route path='/login'  render={(props) => <Login {...props} loginUser={loginUser}/>}/>

            <Route path='/books' render={(props) =>  <Books {...props} user={user}/>}/>

        </div>
    )
};

export default Body;