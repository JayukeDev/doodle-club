import type { AppProps } from 'next/app';
import { CSSProperties, createContext, useState } from 'react';
import './app.css';
import { io } from "socket.io-client";

export const UserContext = createContext({
  user: { name: "", code: "" },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  updateUser: (_name: string, _code: string) => { }
});

export default function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState({ name: "", code: "" });
  const backgroundStyle: CSSProperties = {
    fontFamily: '"Trebuchet MS", sans-serif',
    position: 'absolute',
    top: 0, left: 0,
    width: '100%',
    height: '100%',
    background: `linear-gradient(349deg, rgba(115,111,164,1) 0%, rgba(99,157,132,1) 43%, rgba(96,148,159,1) 100%)`
  };

  const updateUser = (name: string, code: string) => {
    setUser({
      name: name ?? user.name,
      code: code ?? user.code
    });
  }

  const socket = io('http://localhost:3005');

  const value = { user, updateUser };
  return (
    <UserContext.Provider value={value}>
      <div style={backgroundStyle}>
        <link href="./app.css" rel="stylesheet" />
        <Component {...pageProps} socket={socket} />
      </div>
    </UserContext.Provider>
  );
}