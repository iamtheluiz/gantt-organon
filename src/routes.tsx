import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Create from './pages/Create';
import Project from './pages/Project';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/create" exact component={Create} />
        <Route path="/project/:id" component={Project} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
