import { Route} from 'react-router-dom';

import Body from './components/Body';
import Register from './components/Register';
import Login from './components/Login';

const AppRouter = () => (
    <div className='body-container'>
        <Route path='/home' component={Body}/>
        <Route path='/register' component={Register}/>
        <Route path='/login' component={Login} />
    </div>
);

export default AppRouter;