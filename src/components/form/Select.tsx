/* eslint-disable react/jsx-props-no-spreading */
import React, { HTMLProps, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';

import '../../styles/components/Select.css';

interface SelectProps extends HTMLProps<HTMLSelectElement> {
  // eslint-disable-next-line no-unused-vars
  setValue: (value: number) => void;
  options: {
    [key: string]: number
  }
}

const Select: React.FC<SelectProps> = ({
  value, options, setValue,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`select-container flex-col w-full relative ${isOpen ? 'active' : ''}`}>
      <button
        onClick={() => { setIsOpen(!isOpen); }}
        onBlur={() => {
          // Delay to execute other event
          setTimeout(() => {
            setIsOpen(false);
          }, 150);
        }}
        className="select-button flex flex-row items-center w-full px-2 py-2 bg-white border-gray-400 border-2 rounded-md"
      >
        <span className="text-base flex-1 px-7">
          {Object.keys(options).find((key: string) => options[key] === value)}
        </span>
        <FiChevronDown className="text-lg" />
      </button>
      <div className={`select-options flex w-full flex-col z-50 items-center justify-center border-2 border-t-0 rounded-md bg-white border-gray-400 ${!isOpen ? 'hidden' : 'absolute'}`}>
        {Object.keys(options).map((key: string) => (
          <button
            key={key}
            className="select-option py-0.5 w-full hover:text-gray-100"
            onClick={() => {
              setValue(options[key]);
            }}
          >
            <span className="text-center">{key}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Select;
