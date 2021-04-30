/* eslint-disable react/jsx-props-no-spreading */
import React, { HTMLProps } from 'react';

interface InputFieldProps extends HTMLProps<HTMLInputElement> {
  id: string;
  label: string;
  isChecked: boolean;
  // eslint-disable-next-line no-unused-vars
  setIsChecked: (arg0: boolean) => void;
}

const ToggleSwitch: React.FC<InputFieldProps> = ({
  id, label, isChecked, setIsChecked, ...props
}) => (
  <div className="flex flex-col py-2">
    <div className="cursor-pointer">
      <label htmlFor={id} className="cursor-pointer flex items-center">
        <span className="text-lg flex-1 dark:text-gray-400">{label}</span>
        <div
          className="w-10 h-6 flex items-center bg-gray-300 rounded-full p-1 transition duration-300 ease-in-out"
          style={isChecked ? { backgroundColor: '#a143b4' } : undefined}
        >
          <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${isChecked ? 'translate-x-4' : ''}`} />
        </div>
      </label>
      <input
        id={id}
        type="checkbox"
        className="hidden"
        checked={isChecked}
        onChange={(event) => setIsChecked(event.currentTarget.checked)}
        {...props}
      />
    </div>
  </div>
);

export default ToggleSwitch;
