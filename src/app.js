import React, { useState } from 'react';
import { Route, Switch, Redirect } from 'react-router';

import { Login } from './screens/login';
import { Activities } from './screens/activities';
import { Articles } from './screens/articles';
import { Article } from './screens/article';
import { Draft } from './screens/draft';
import { Layout } from './screens/layout';
import { RequestsBoard } from './screens/requests';
import { Tasks } from './screens/tasks';
import { Exams } from './screens/exams';
import { Exam } from './screens/exam';
import { Forum } from './screens/forum';
import { Request } from './screens/request';
import { Topic } from './screens/topic';
import { Quizzes } from './screens/quizzes';
import { Quiz } from './screens/quiz';
import { Homeworks } from './screens/homeworks';
import { Homework } from './screens/homework';

function App() {
  const [isLoginOn, setLoginOn] = useState(false);

  return (
    <Layout isLoginOn={isLoginOn} setLoginOn={setLoginOn}>
      <Switch>
        <Route exact path="/">
          <Login isLogin={isLoginOn} setLoginOn={setLoginOn} />
        </Route>
        <Route exact component={Activities} path="/activities/" />
        <Route component={Activities} path="/activities/:id" />
        <Route exact component={Articles} path="/articles/" />
        <Route component={Articles} path="/articles/:id" />
        <Route component={Article} path="/article/:id" />
        <Route component={Draft} path="/draft/:id" />
        <Route exact component={RequestsBoard} path="/requests-board/" />
        <Route component={Request} path="/request/:id" />
        <Route exact component={Tasks} path="/tasks/" />
        <Route exact component={Exams} path="/exams/" />
        <Route component={Exam} path="/exam/:id" />
        <Route exact component={Forum} path="/forum/" />
        <Route component={Topic} path="/topic/:id" />
        <Route exact component={Quizzes} path="/quizzes/" />
        <Route component={Quiz} path="/quiz/:id" />
        <Route exact component={Homeworks} path="/homeworks/" />
        <Route component={Homework} path="/homework/:id" />
        <Redirect to="/" />
      </Switch>
    </Layout>
  );
}

export default App;
