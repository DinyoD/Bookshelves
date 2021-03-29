import { Route} from 'react-router-dom';

import Home from '../Home/Home';
import Register from '../AuthForms/Register';
import Login from '../AuthForms/Login';

const AppRouter = () => (
    <div className='body-container'>
        <Route path='/home' component={Home}/>
        <Route path='/register' component={Register}/>
        <Route path='/login' component={Login} />
    </div>
);

export default AppRouter;