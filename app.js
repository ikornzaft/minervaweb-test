import React, {useState} from 'react';
import { Route, Switch, Redirect } from 'react-router';
import { Login } from './screens/login';
import { Actividades } from './screens/actividades'
import { Layout } from './screens/layout';
import { Feed } from './screens/feed';
import { Form } from './screens/form';
import { MixedElements } from './screens/mixedElements';
import { DeTodo } from './screens/deTodo';

function App() {
  const [isLoginOn, setLoginOn] = useState(false);
  return (
    <Layout isLoginOn={isLoginOn}>
      <Switch>
        <Route exact path="/">
          <Login isLogin={isLoginOn} setLoginOn={setLoginOn} />
        </Route> 
        <Route exact path="/actividades/" component={Actividades} />
        <Route exact path="/feed/" component={Feed} />
        <Route exact path="/form/" component={Form} />
        <Route exact path="/mix/" component={MixedElements} />
        <Route exact path="/detodo/" component={DeTodo} />
        <Redirect to="/" />
      </Switch>
    </Layout>
  );
}

export default App;