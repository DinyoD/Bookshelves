import React, {useState, useEffect } from 'react';
import { useHistory} from 'react-router-dom';

import Header from './components/Header/Header';
import Body from './components/Body/Body';
import Footer from './components/Footer/Footer';
import UserContext from './components/Contexts/UserContext';

import userService from './services/usersService';

function App() {

  const[user, setUser] = useState({});
  let history = useHistory();

  useEffect(() => {
    userService.getOne(localStorage.id)
    .then(u => setUser(u))
  },[])


  const  loginUser = (newUser) => {
    setUser(newUser);
    localStorage.setItem('username', newUser.username)
    localStorage.setItem('id', newUser._id)
  }

  const logoutUser = () => {

    setUser({});
    localStorage.removeItem('username');
    localStorage.removeItem('id')
    history.push('/books')
  }



  return (
    <div className="container">
        <UserContext.Provider value={[user , setUser]}>
          <Header user={user.username} logoutUser={logoutUser}/>       
          <Body user={user} loginUser={loginUser} />
          <Footer />
        </UserContext.Provider>
    </div>
  );
}

export default App;
