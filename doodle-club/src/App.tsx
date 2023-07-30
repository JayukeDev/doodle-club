import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import { UserContextType } from './types/UserContextType';
import { UserType } from './types/UserType';



import "../node_modules/@blueprintjs/core/lib/css/blueprint.css";
import "../node_modules/@blueprintjs/icons/lib/css/blueprint-icons.css";
import "../node_modules/normalize.css/normalize.css";
import "./pages/styles.css";

import { Main } from './components/Main';
import { Result } from './components/Modal';

export const UserContext = React.createContext<UserContextType>({});
export const Success: Result = { success: true };

const App = () => {
  const [user, setUser] = useState<UserType>();

  return (
    <div className="AppContainer">
      <UserContext.Provider value={{ user: user, setUser: setUser }}>
        <br />
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<Main />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
