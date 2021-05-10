import React, {useState} from 'react';
import { Route, Switch, Redirect } from 'react-router';
import { Layout } from './pages/layout';
import { Login } from './pages/login';
import { Feed } from './pages/feed';

function App() {
  const [isLoginOn, setLoginOn] = useState(false);
  return (
    <Layout isLoginOn={isLoginOn}>
      <Switch>
        <Route exact path="/">
          <Login setLoginOn={isLoginOn, setLoginOn} />
        </Route> 
        <Route exact path="/feed/" component={Feed} />
        <Redirect to="/" />
      </Switch>
    </Layout>
  );
}

export default App;