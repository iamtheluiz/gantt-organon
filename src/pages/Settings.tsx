import { FiArrowLeft } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import useDarkTheme from '../hooks/useDarkTheme';

import '../styles/pages/Create.css';

function Settings() {
  const { darkTheme, setDarkTheme } = useDarkTheme();
  const history = useHistory();

  function handleReturnToPreviousPage() {
    history.goBack();
  }

  return (
    <div className="flex justify-center items-center dark:bg-black w-full min-h-screen h-full">
      <section id="settings" className="max-w-sm w-full px-4">
        <header className="w-full py-4 rounded-lg">
          <button onClick={handleReturnToPreviousPage} className="linkHover w-7 flex justify-center items-center">
            <FiArrowLeft className="w-full h-full text-gray-700 dark:text-gray-300" />
          </button>
        </header>
        <div className="w-full pt-4 pb-6">
          <h1 className="text-4xl font-semibold text-gray-700 dark:text-gray-300">Settings</h1>
          <div className="input-field flex flex-col py-2">
            <div className="cursor-pointer">
              <label htmlFor="dark-theme-toggle" className="cursor-pointer flex items-center">
                <span className="text-lg flex-1 dark:text-gray-400">Dark Theme</span>
                <div
                  className="w-10 h-6 flex items-center bg-gray-300 rounded-full p-1 transition duration-300 ease-in-out"
                  style={darkTheme ? { backgroundColor: '#a143b4' } : undefined}
                >
                  <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${darkTheme ? 'translate-x-4' : ''}`} />
                </div>
              </label>
              <input
                type="checkbox"
                name="dark-theme-toggle"
                id="dark-theme-toggle"
                className="hidden"
                checked={darkTheme}
                onChange={(event) => setDarkTheme(event.target.checked)}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Settings;