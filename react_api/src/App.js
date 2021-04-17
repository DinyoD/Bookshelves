import React, {useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Header from './components/Header/Header';
import Body from './components/Body/Body';
import Footer from './components/Footer/Footer';
import AppErrorBoundary from './components/AppErrorBoundery/AppErrorBoundory';

import UserContext from './components/Contexts/UserContext';

import userService from './services/usersService';

function App() {

  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(false)
  let history = useHistory();

  useEffect(() => {
    if (localStorage.id) {     
      userService.getOne(localStorage.id)
      .then(u => {
        console.log(u);
        setUser(u)
      })
    }
  },[isLogin])

  const  loginUser = (newUser) => {
    if (newUser._id !== undefined)  {
      
      localStorage.setItem('username', newUser.username)
      localStorage.setItem('id', newUser._id);
  
      setIsLogin(true);
      history.push('/books');
    }else{
      localStorage.removeItem('username');
      localStorage.removeItem('id');

    }
  }

  const logoutUser = () => {

    localStorage.removeItem('username');
    localStorage.removeItem('id')
    history.push('/books');
    setUser(null);
    setIsLogin(false)
  }

  return (
    <div className="container">
        <UserContext.Provider value={[user, setUser]}>

          <Header  logoutUser={logoutUser}/>     
            
          <AppErrorBoundary>
            <Body  loginUser={loginUser} />
          </AppErrorBoundary>

          <Footer />

        </UserContext.Provider>
    </div>
  );
}

export default App;
