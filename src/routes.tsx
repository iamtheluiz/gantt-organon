import { HashRouter } from 'react-router-dom';
import useDarkTheme from './hooks/useDarkTheme';

import { AnimatedRoutes, RouteTransition } from './components/AnimatedRoutes';

import Home from './pages/Home';
import Create from './pages/Create';
import Project from './pages/Project';
import Settings from './pages/Settings';
import ProjectSettings from './pages/ProjectSettings';
import Export from './pages/Export';
import NewTask from './pages/Task';

function Routes() {
  // Load theme
  useDarkTheme();

  return (
    <HashRouter>
      <AnimatedRoutes exitBeforeEnter initial={false}>
        <RouteTransition path="/" exact>
          <Home />
        </RouteTransition>
        <RouteTransition path="/create" exact>
          <Create />
        </RouteTransition>
        <RouteTransition path="/project/:id/task/:task_id" slideUp={80}>
          <NewTask />
        </RouteTransition>
        <RouteTransition path="/project/:id/task" slideUp={80}>
          <NewTask />
        </RouteTransition>
        <RouteTransition path="/project/:id">
          <Project />
        </RouteTransition>
        <RouteTransition path="/settings" exact slideUp={80}>
          <Settings />
        </RouteTransition>
        <RouteTransition path="/settings/:id" slideUp={80}>
          <ProjectSettings />
        </RouteTransition>
        <RouteTransition path="/export/:id">
          <Export />
        </RouteTransition>
      </AnimatedRoutes>
    </HashRouter>
  );
}

export default Routes;
