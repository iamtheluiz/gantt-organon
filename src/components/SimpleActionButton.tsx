/* eslint-disable react/jsx-props-no-spreading */
import React, { HTMLAttributes } from 'react';
import { IconType } from 'react-icons';

import '../styles/components/SimpleActionButton.css';

interface SimpleActionButtonProps extends HTMLAttributes<HTMLButtonElement> {
  icon: IconType
}

const SimpleActionButton: React.FC<SimpleActionButtonProps> = ({ icon, ...props }) => {
  const Icon = icon;

  return (
    <button type="button" className="linkHover w-7 flex justify-center items-center" {...props}>
      <Icon className="w-full h-full text-gray-700 dark:text-gray-300" />
    </button>
  );
};

export default SimpleActionButton;
