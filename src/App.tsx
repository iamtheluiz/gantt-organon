import Routes from './routes';

import { DatabaseProvider } from './context/database';
import { TaskProvider } from './context/task';

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
