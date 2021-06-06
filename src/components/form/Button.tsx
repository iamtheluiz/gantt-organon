/* eslint-disable react/jsx-props-no-spreading */
import React, { HTMLProps } from 'react';

import '../../styles/components/Button.css';

interface ButtonProps extends HTMLProps<HTMLButtonElement> {
  type: 'submit' | 'button' | 'reset' | undefined,
  primary?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  type, primary = false, children, className = '', ...props
}) => (
  <button
    type={type}
    className={`button ${primary ? 'primary' : ''} flex justify-center items-center shadow-md ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default Button;
