/* eslint-disable no-unused-vars */
import React, { createContext, useContext } from 'react';

import { Database } from '@nozbe/watermelondb';
import LokiJSAdapter from '@nozbe/watermelondb/adapters/lokijs';

import schema from '../model/schema';
import ProjectModel from '../model/Project';
import TaskModel from '../model/Task';

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
    onQuotaExceededError: (error) => {
    // Browser ran out of disk space -- do something about it
      console.warn(error);
    },
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
    throw new Error('useHorse must be used within a HorseProvider');
  }

  return context;
}

export { DatabaseProvider, useDatabase };
