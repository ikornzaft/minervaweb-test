import React, {useState} from 'react';
import { Route, Switch, Redirect } from 'react-router';
import { Layout } from './screens/layout';
import { Login } from './screens/login';
import { Feed } from './screens/feed';
import { Form } from './screens/form';
import { MixedElements } from './screens/mixedElements';

function App() {
  const [isLoginOn, setLoginOn] = useState(false);
  return (
    <Layout isLoginOn={isLoginOn}>
      <Switch>
        <Route exact path="/">
          <Login isLogin={isLoginOn} setLoginOn={setLoginOn} />
        </Route> 
        <Route exact path="/feed/" component={Feed} />
        <Route exact path="/form/" component={Form} />
        <Route exact path="/mix/" component={MixedElements} />
        <Redirect to="/" />
      </Switch>
    </Layout>
  );
}

export default App;