import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import ToggleSwitch from '../components/form/ToggleSwitch';
import SimpleActionButton from '../components/SimpleActionButton';
import SimpleHeader from '../components/SimpleHeader';
import useDarkTheme from '../hooks/useDarkTheme';

import '../styles/pages/Create.css';

const Settings: React.FC = ({ children }) => {
  const { darkTheme, setDarkTheme } = useDarkTheme();

  const history = useHistory();

  return (
    <div className="flex justify-center items-center dark:bg-black w-full min-h-screen h-full">
      <section id="settings" className="max-w-sm w-full px-4">
        <SimpleHeader>
          <SimpleActionButton icon={FiArrowLeft} onClick={() => history.goBack()} />
        </SimpleHeader>
        <div className="w-full pt-4 pb-6">
          <h1 className="text-4xl font-semibold text-gray-700 dark:text-gray-300">Settings</h1>
          <ToggleSwitch id="toggle-dark-theme" label="Dark Theme" isChecked={darkTheme} setIsChecked={setDarkTheme} />
          {children}
        </div>
      </section>
    </div>
  );
};

export default Settings;
