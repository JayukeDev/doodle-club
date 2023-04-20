import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { LoginForm } from './components/LoginForm';
import { UserType } from './types/UserType'
import { UserContextType } from './types/UserContextType';
import { Login } from './pages/Login';
import { Lobby } from './pages/Lobby';

import "./pages/styles.css";

export const UserContext = React.createContext<UserContextType>({});

const App = () => {
  const [user, setUser] = useState<UserType>();


  return (
    <div className="App">
      <UserContext.Provider value={{ user: user, setUser: setUser }}>
        {!user && <Login />}
        {user && <Lobby />}
      </UserContext.Provider>
    </div>
  );
}

export default App;
