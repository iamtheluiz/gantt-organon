import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Create from './pages/Create';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/create" exact component={Create} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
