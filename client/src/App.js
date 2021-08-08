import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {LoginPage, MainPage, RegisterPage} from './pages/pages'; 
import Header from './Header';

function App() {
  
  return (
    <div>
      <Header/>
      <BrowserRouter>
        <Switch>
          <Route path='/login'>
            <LoginPage/>
          </Route>
          <Route path='/register'>
            <RegisterPage/>
          </Route>
          <Route path='/'>
            <MainPage/>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
