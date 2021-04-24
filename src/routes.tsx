import { BrowserRouter, Switch, Route } from 'react-router-dom';
import useDarkTheme from './hooks/useDarkTheme';

import Home from './pages/Home';
import Create from './pages/Create';
import Project from './pages/Project';
import Settings from './pages/Settings';
import ProjectSettings from './pages/ProjectSettings';
import Export from './pages/Export';

function Routes() {
  // Load theme
  useDarkTheme();

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/create" exact component={Create} />
        <Route path="/project/:id" component={Project} />
        <Route path="/settings" exact component={Settings} />
        <Route path="/settings/:id" component={ProjectSettings} />
        <Route path="/export/:id" component={Export} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
