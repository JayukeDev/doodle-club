import React, { useState } from 'react';
import './App.css';
import { Lobby } from './pages/Lobby';
import { Login } from './pages/Login';
import { UserContextType } from './types/UserContextType';
import { UserType } from './types/UserType';

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
