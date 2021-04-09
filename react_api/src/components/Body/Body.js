import { useContext } from 'react';
import { Route, Redirect} from 'react-router-dom';

import Register from '../AuthForms/Register';
import Login from '../AuthForms/Login';
import PublicHome from '../Home/PublicHome';
import UsersHome from '../Home/UsersHome';

import UserContext from '../Contexts/UserContext';

function Body({loginUser}){

    const [user] = useContext(UserContext);

    return (
        <div className='body-container'>

            <Route exact path='/' render={() => (<Redirect to='/books' />)} />

            <Route path='/register' render={(props) => <Register {...props} loginUser={loginUser}/>}/>
 
            <Route path='/login'  render={(props) => <Login {...props} loginUser={loginUser}/>}/>

            { user
                ? <Route path='/books' component={UsersHome}/>
                : <Route path='/books' component={PublicHome}/>
            }

        </div>
    )
};

export default Body;