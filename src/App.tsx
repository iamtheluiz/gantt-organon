import Routes from './routes';

import { TaskProvider } from './context/task';

import './styles/global.css';

function App() {
  return (
    <TaskProvider>
      <Routes />
    </TaskProvider>
  );
}

export default App;
