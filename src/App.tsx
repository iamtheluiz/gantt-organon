import Routes from './routes';

import { DatabaseProvider } from './contexts/database';
import { ProjectProvider } from './contexts/project';

import './styles/global.css';

function App() {
  return (
    <DatabaseProvider>
      <ProjectProvider>
        <Routes />
      </ProjectProvider>
    </DatabaseProvider>
  );
}

export default App;
