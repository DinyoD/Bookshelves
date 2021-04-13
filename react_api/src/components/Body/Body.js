import { useContext } from 'react';
import { Route, Redirect, Switch} from 'react-router-dom';

import Register from '../AuthForms/Register';
import Login from '../AuthForms/Login';
import PublicHome from '../Home/PublicHome';
import UsersHome from '../Home/UsersHome';
import AllBooks from '../Books/AllBooks';
import NoContent from '../Shared/NoContent';

import UserContext from '../Contexts/UserContext';

//TODO SWitch

function Body({loginUser}){

    const [user] = useContext(UserContext);

    return (
        <div className='body-container'>

            <Switch>

                <Route exact path='/' render={() => (<Redirect to='/books' />)} />

                <Route path='/register' render={(props) => <Register {...props} loginUser={loginUser}/>}/>
    
                <Route path='/login'  render={(props) => <Login {...props} loginUser={loginUser}/>}/>

                <Route exact path='/books/no-content' component={NoContent} />


                { user
                    ? <Route path='/books' component={UsersHome}/>
                    : <Route path='/books' component={PublicHome}/>
                }

                <Route path='/filter/:categorie/:filter' component={AllBooks} />

            </Switch>

        </div>
    )
};

export default Body;