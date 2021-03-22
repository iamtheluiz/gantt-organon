import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

interface HeaderProps {
  title: string;
  subtitle?: string;
  backTo: string;
}

const Header: React.FC<HeaderProps> = ({
  title, subtitle, children, backTo,
}) => (
  <header className="flex items-center p-4 bg-white shadow-md">
    <Link to={backTo} className="w-7 flex justify-center items-center">
      <FiArrowLeft className="w-full h-full text-gray-700" />
    </Link>
    <div id="logo" className="flex justify-center items-center h-10 w-10 ml-4 rounded-md">
      {children}
    </div>
    <div className="ml-2 flex flex-col justify-center">
      <h1 className="font-serif text-base">{title}</h1>
      {subtitle && <span className="text-sm font-light">{subtitle}</span>}
    </div>
  </header>
);

export default Header;
