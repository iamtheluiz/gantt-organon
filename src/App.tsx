import Routes from './routes';

import { DatabaseProvider } from './contexts/database';
import { TaskProvider } from './contexts/task';

import './styles/global.css';

function App() {
  return (
    <DatabaseProvider>
      <TaskProvider>
        <Routes />
      </TaskProvider>
    </DatabaseProvider>
  );
}

export default App;
