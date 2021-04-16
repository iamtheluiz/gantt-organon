/* eslint-disable no-unused-vars */
import React, { createContext, useContext } from 'react';

import { Database } from '@nozbe/watermelondb';
import LokiJSAdapter from '@nozbe/watermelondb/adapters/lokijs';

import schema from '../models/schema';
import ProjectModel from '../models/Project';
import TaskModel from '../models/Task';

interface DatabaseContextProps {
  database: Database
}

const DatabaseContext = createContext<DatabaseContextProps>({} as DatabaseContextProps);

const DatabaseProvider: React.FC = ({ children }) => {
  // Watermelon Setup
  const adapter = new LokiJSAdapter({
    schema,
    useWebWorker: false,
    useIncrementalIndexedDB: true,
  });

  const database = new Database({
    adapter,
    modelClasses: [
      ProjectModel,
      TaskModel,
    ],
    actionsEnabled: true,
  });

  return (
    <DatabaseContext.Provider value={{
      database,
    }}
    >
      {children}
    </DatabaseContext.Provider>
  );
};

function useDatabase(): DatabaseContextProps {
  const context = useContext(DatabaseContext);

  if (!context) {
    throw new Error('useDatabase must be used within a DatabaseProvider');
  }

  return context;
}

export { DatabaseProvider, useDatabase };
