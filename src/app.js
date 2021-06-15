import React, { useState } from 'react';
import { Route, Switch, Redirect } from 'react-router';
import { Login } from './screens/login';
import { Activities } from './screens/activities';
import { Article } from './screens/article';
import { Layout } from './screens/layout';
import { RequestsBoard } from './screens/requests';
import { Compartidos } from './screens/compartidos';
import { Entregas } from './screens/entregas';

function App() {
  const [isLoginOn, setLoginOn] = useState(false);
  const [requests, setRequests] = useState([]);
  return (
    <Layout isLoginOn={isLoginOn}>
      <Switch>
        <Route exact path="/">
          <Login isLogin={isLoginOn} setLoginOn={setLoginOn} />
        </Route>
        <Route exact path="/activities/" component={Activities} />
        <Route path="/activities/:id" component={Activities} />
        <Route path="/article/:id">
          <Article requests={requests} setRequests={setRequests} />
        </Route>
        <Route exact path="/requests-board/">
          <RequestsBoard requests={requests} setRequests={setRequests} />
        </Route>
        <Route exact path="/compartidos/" component={Compartidos} />
        <Route exact path="/entregas/" component={Entregas} />
        <Redirect to="/" />
      </Switch>
    </Layout>
  );
}

export default App;
