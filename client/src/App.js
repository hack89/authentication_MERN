import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom' 
import GuestState from './context/guestContext/GuestState'
import AuthState from './context/authContext/AuthState'
import './App.css';
import Navbar from './components/layouts/Navbar'
import Home from './components/pages/Home'
import Register from './components/pages/Register'
import Login from './components/pages/Login'
import PrivateRoute from './components/pages/routes/PrivateRoute'
import setToken from './utils/setToken'

if(localStorage.token){
  setToken(localStorage.token)
}

function App() {
  return (
    <AuthState>
    <GuestState>
      <div >
      <Router>
        <Navbar />
        <Switch>
          <PrivateRoute exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
        </Switch>
      </Router>
      </div>
    </GuestState>
    </AuthState>
  );
}

export default App;
