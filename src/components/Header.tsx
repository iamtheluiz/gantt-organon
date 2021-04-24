import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiSettings } from 'react-icons/fi';

interface HeaderProps {
  projectId: string;
  backTo: string;
}

const Header: React.FC<HeaderProps> = ({
  backTo, children, projectId,
}) => (
  <header className="flex justify-center w-full bg-white dark:bg-gray-800 shadow-md">
    <div className="max-w-screen-2xl w-full flex justify-between p-4">
      <div className="flex flex-1 items-center">
        <Link to={backTo} className="linkHover w-7 flex justify-center items-center">
          <FiArrowLeft className="w-full h-full text-gray-700 dark:text-gray-300" />
        </Link>
        {children}
      </div>
      <Link to={`/settings/${projectId}`} className="linkHover w-7 flex justify-center items-center">
        <FiSettings className="w-full h-full text-gray-700 dark:text-gray-300" />
      </Link>
    </div>
  </header>
);

export default Header;
