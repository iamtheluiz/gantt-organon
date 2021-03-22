import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Create from './pages/Create';
import Project from './pages/Project';
import Settings from './pages/Settings';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/create" exact component={Create} />
        <Route path="/project/:id" component={Project} />
        <Route path="/settings" component={Settings} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
