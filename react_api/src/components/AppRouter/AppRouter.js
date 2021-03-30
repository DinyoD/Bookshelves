import { Route} from 'react-router-dom';

import Home from '../Home/Home';
import Register from '../AuthForms/Register';
import Login from '../AuthForms/Login';

function AppRouter({loginUser}){
    return (
        <div className='body-container'>
            <Route path='/home' component={Home}/>
            <Route path='/register' render={() => (<Register loginUser={loginUser}/>)} />
            <Route path='/login' render={() => (<Login loginUser={loginUser}/>)} />
        </div>
    )
};

export default AppRouter;