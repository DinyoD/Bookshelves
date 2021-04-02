import {useState } from 'react';

import Header from './components/Header/Header';
import Body from './components/Body/Body';
import Footer from './components/Footer/Footer';


function App() {
  const[user, setUser] = useState({});

  const  loginUser = (newUser) => {
    setUser(newUser.username)
  }
  const logoutUser = () => {
    console.log('logout');
    localStorage.removeItem('username');
    localStorage.removeItem('id')
    setUser('');
  }

  return (
    <div className="container">
        <Header user={localStorage.username} logoutUser={logoutUser}/>       
        <Body user={user} loginUser={loginUser} logoutUser={logoutUser}/>
        <Footer />
    </div>
  );
}

export default App;
