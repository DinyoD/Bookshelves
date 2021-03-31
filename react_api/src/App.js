import {useState } from 'react';

import Header from './components/Header/Header';
import Body from './components/Body/Body';
import Footer from './components/Footer/Footer';


function App() {
  const[user, setUser] = useState({});

  const  loginUser = (newUser) => {
    let { username, _id: id} = newUser;
    setUser({username, id});
  }
  const logoutUser = () => {
    console.log('logout');
    setUser({})
  }

  return (
    <div className="container">
        <Header user={user} logoutUser={loginUser}/>       
        <Body user={user} loginUser={loginUser} logoutUser={logoutUser}/>
        <Footer />
    </div>
  );
}

export default App;
