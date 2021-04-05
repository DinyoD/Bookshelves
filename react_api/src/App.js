import {useState, useEffect } from 'react';

import Header from './components/Header/Header';
import Body from './components/Body/Body';
import Footer from './components/Footer/Footer';

import userService from './services/usersService';


function App() {
  const[user, setUser] = useState({});

  const  loginUser = (newUser) => {
    setUser(newUser)
  }
  const logoutUser = () => {
    console.log('logout');
    localStorage.removeItem('username');
    localStorage.removeItem('id')
    setUser('');
  }

  useEffect(() => {
    userService.getOne(localStorage.id)
    .then(u => setUser(u))
  },[])


  return (
    <div className="container">
        <Header user={localStorage.username} logoutUser={logoutUser}/>       
        <Body user={user} loginUser={loginUser} logoutUser={logoutUser}/>
        <Footer />
    </div>
  );
}

export default App;
