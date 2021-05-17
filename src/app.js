import React, {useState} from 'react';
import { Route, Switch, Redirect } from 'react-router';
import { Login } from './screens/login';
import { Actividades } from './screens/actividades'
import { Articulo } from './screens/articulo'
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
        <Route exact path="/actividades/" component={Actividades} />
        <Route path="/actividades/:id" component={Actividades} />
        <Route path="/articulo/:id" component={Articulo} />
        <Route exact path="/consultas/" component={Consultas} />
        <Route exact path="/compartidos/" component={Compartidos} />
        <Route exact path="/entregas/" component={Entregas} />
        <Redirect to="/" />
      </Switch>
    </Layout>
  );
}

export default App;