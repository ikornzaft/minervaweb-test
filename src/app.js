import React, { useState } from 'react';
import { Route, Switch, Redirect } from 'react-router';
import { Login } from './screens/login';
import { Activities } from './screens/activities';
import { Articles } from './screens/articles';
import { Article } from './screens/article';
import { Draft } from './screens/draft'
import { Layout } from './screens/layout';
import { RequestsBoard } from './screens/requests';
import { Tasks } from './screens/tasks';
import { Exams } from './screens/exams';
import { Feed } from './screens/feed';
import { Request } from './screens/request'

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
        <Route exact path="/articles/" component={Articles} />
        <Route path="/articles/:id" component={Articles} />
        <Route path="/article/:id" component={Article} />
        <Route path="/draft/:id" component={Draft} />
        <Route exact path="/requests-board/" component={RequestsBoard} />
        <Route path="/request/:id" component={Request} />
        <Route exact path="/tasks/" component={Tasks} />
        <Route exact path="/exams/" component={Exams} />
        <Route exact path="/feed/" component={Feed} />
        <Redirect to="/" />
      </Switch>
    </Layout>
  );
}

export default App;
