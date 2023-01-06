import { useState } from 'react';
import './App.css';
import Signin from './Authentication & Authorizaton/SignIn';
import Signup from './Authentication & Authorizaton/SignUp';
import Home from './Home/Home';

function App() {
  const [LoginState , setLoginState  ] = useState(localStorage.getItem('isLogin')!==null);
  const [appState, setAppState] = useState("signup");

  return (
    <>
     {appState=="signup" && !(LoginState) && <Signup setAppState={setAppState} />}
     {appState=="signin" && !(LoginState) && <Signin setLoginState={setLoginState} setAppState={setAppState} />}
     {LoginState  && <Home appState={appState} setAppState={setAppState} />}
    </>
  );
}

export default App;
