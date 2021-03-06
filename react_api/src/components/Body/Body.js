import { useContext } from 'react';
import { Route, Redirect, Switch} from 'react-router-dom';

import Register from '../AuthForms/Register';
import Login from '../AuthForms/Login';
import PublicHome from '../Home/PublicHome';
import UsersHome from '../Home/UsersHome';
import AllBooks from '../Books/AllBooks';
import NoContent from '../Shared/NoContent';
import UserComments from '../Comment/UserComments';

import UserContext from '../Contexts/UserContext';

function Body({loginUser}){

    const [user] = useContext(UserContext);

    return (
        <div className='body-container'>

            <Switch>

                <Route exact path='/' render={() => (<Redirect to='/books' />)} />

                <Route path='/register' render={(props) => <Register {...props} loginUser={loginUser}/>}/>
    
                <Route path='/login'  render={(props) => <Login {...props} loginUser={loginUser}/>}/>

                <Route path='/no-content'  render={(props) => <NoContent {...props} />} />


                { user
                    ? <Route path='/books' component={UsersHome}/>
                    : <Route path='/books' component={PublicHome}/>
                }

                <Route path='/filter/:categorie/:filter' component={AllBooks} />

                <Route path='/comments/user' component={UserComments} />

                <Route render={(props) => <NoContent {...props}/>} />

            </Switch>

        </div>
    )
};

export default Body;