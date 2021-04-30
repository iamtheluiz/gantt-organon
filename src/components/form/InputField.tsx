/* eslint-disable react/jsx-props-no-spreading */
import React, { HTMLProps } from 'react';

interface InputFieldProps extends HTMLProps<HTMLInputElement> {
  label: string;
  id: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label, id, type = 'text', ...props
}) => (
  <div className="flex flex-1 flex-col py-2">
    <label htmlFor={id} className="pb-1 text-base font-medium text-gray-800 dark:text-gray-400">{label}</label>
    <input
      id={id}
      style={{ backgroundColor: '#dde9f3' }}
      className="placeholder-gray-400 border-gray-300 dark:border-gray-400 border-b-2 text-base px-2.5 py-3.5 rounded-md"
      type={type}
      {...props}
    />
  </div>
);

export default InputField;
