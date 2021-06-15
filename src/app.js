import React, {useState} from 'react';
import { Route, Switch, Redirect } from 'react-router';
import { Login } from './screens/login';
import { Activities } from './screens/activities'
import { Article } from './screens/article'
import { Layout } from './screens/layout';
import { Consultas } from './screens/consultas';
import { Compartidos } from './screens/compartidos';
import { Entregas } from './screens/entregas';

function App() {
  const [isLoginOn, setLoginOn] = useState(false);
  return (
    <Layout isLoginOn={isLoginOn}>
      <Switch>
        <Route exact path="/">
          <Login isLogin={isLoginOn} setLoginOn={setLoginOn} />
        </Route> 
        <Route exact path="/activities/" component={Activities} />
        <Route path="/activities/:id" component={Activities} />
        <Route path="/article/:id" component={Article} />
        <Route exact path="/consultas/" component={Consultas} />
        <Route exact path="/compartidos/" component={Compartidos} />
        <Route exact path="/entregas/" component={Entregas} />
        <Redirect to="/" />
      </Switch>
    </Layout>
  );
}

export default App;