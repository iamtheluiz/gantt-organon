import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiSettings } from 'react-icons/fi';

interface HeaderProps {
  title: string;
  subtitle?: string;
  backTo: string;
}

const Header: React.FC<HeaderProps> = ({
  title, subtitle, children, backTo,
}) => (
  <header className="flex justify-between p-4 bg-white dark:bg-gray-800 shadow-md">
    <div className="flex items-center">
      <Link to={backTo} className="linkHover w-7 flex justify-center items-center">
        <FiArrowLeft className="w-full h-full text-gray-700 dark:text-gray-300" />
      </Link>
      <div id="logo" className="flex justify-center items-center h-10 w-10 ml-4 rounded-md">
        {children}
      </div>
      <div className="ml-2 flex flex-col justify-center">
        <h1 className="font-serif text-base dark:text-gray-300">{title}</h1>
        {subtitle && <span className="text-sm font-light dark:text-gray-300">{subtitle}</span>}
      </div>
    </div>
    <Link to="/settings" className="linkHover w-7 flex justify-center items-center">
      <FiSettings className="w-full h-full text-gray-700 dark:text-gray-300" />
    </Link>
  </header>
);

export default Header;
