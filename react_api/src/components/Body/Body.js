import { Route} from 'react-router-dom';

import Home from '../Home/Home';
import Register from '../AuthForms/Register';
import Login from '../AuthForms/Login';
import Book from '../Books/Book';

function Body({loginUser}){
    return (
        <div className='body-container'>
            <Route path='/home' component={Home}/>
            <Route path='/register'>
                <Register loginUser={loginUser}/>
            </Route>
            <Route path='/login' >
                <Login loginUser={loginUser}/>
            </Route>
            <Route path='/books' component={Book} />

        </div>
    )
};

export default Body;