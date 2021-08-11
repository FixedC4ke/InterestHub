import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { LoginPage, MainPage, RegisterPage, ProfilePage } from './pages/pages'; 
import Header from './Header';

function PrivateRoute({component: Component, isLoggedIn, ...rest}){
  return (
    <Route {...rest} render={
      props => isLoggedIn?<Component {...props}/>:<Redirect to="/login"/>
    } />
  );
}

function App() {
  let [state, setState] = React.useState(null);
  useEffect(()=>{
    fetch('/getcurrentuser')
      .then(res=>res.json())
      .then(data=>{ 
        setState(data);
      });
  }, []);
  if (!state) return null;
  return (
    <div>
      <Header isLoggedIn={state.isAuthenticated}/>
      <BrowserRouter>
        <Switch>
          <Route component={LoginPage} path='/login/'/>
          <Route component={RegisterPage} path='/register'/>
          <PrivateRoute component={ProfilePage} path='/profile/:id' isLoggedIn={state.isAuthenticated}/>
          <Route path='/profile'>
            <Redirect to={`/profile/${state.id}`}/>
          </Route>
          <Route path='/' component={MainPage}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
