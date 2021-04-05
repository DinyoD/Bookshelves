import {useState, useEffect } from 'react';
import { useHistory} from 'react-router-dom';

import Header from './components/Header/Header';
import Body from './components/Body/Body';
import Footer from './components/Footer/Footer';

import userService from './services/usersService';


function App() {
  const[user, setUser] = useState({});
  let history = useHistory();

  useEffect(() => {
    userService.getOne(localStorage.id)
    .then(u => setUser(u))
  },[])


  const  loginUser = (newUser) => {
    setUser(newUser)
  }

  const logoutUser = () => {
    console.log('logout');
    localStorage.removeItem('username');
    localStorage.removeItem('id')
    setUser('');
    history.push('/books')
  }



  return (
    <div className="container">
        <Header user={user.username} logoutUser={logoutUser}/>       
        <Body user={user} loginUser={loginUser} logoutUser={logoutUser}/>
        <Footer />
    </div>
  );
}

export default App;
