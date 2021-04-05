import { Route, Redirect} from 'react-router-dom';

import Register from '../AuthForms/Register';
import Login from '../AuthForms/Login';
import Books from '../Books/Books';

function Body({loginUser, user}){
    return (
        <div className='body-container'>
            <Route path='/home' render={() => (<Redirect to='/books' />)} />
            <Route path='/register'>
                <Register loginUser={loginUser}/>
            </Route>
            <Route path='/login' >
                <Login loginUser={loginUser}/>
            </Route>
            <Route path='/books' render={(props) =>  <Books {...props} user={user}/>}>
        	   
            </Route>
        </div>
    )
};

export default Body;