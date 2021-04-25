import React from 'react';
import { FiArrowLeft, FiSettings } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import SimpleActionButton from './SimpleActionButton';

interface SimpleHeaderProps {
  backTo?: string;
  showSettings?: boolean;
}

const SimpleHeader: React.FC<SimpleHeaderProps> = ({
  backTo = '', showSettings = false, children,
}) => {
  const history = useHistory();

  return (
    <header className="flex justify-between w-full py-4 rounded-lg">
      {backTo !== '' ? (
        <SimpleActionButton
          icon={FiArrowLeft}
          onClick={() => history.push(backTo)}
        />
      ) : (children || <div className="w-7" />)}
      {showSettings && (
        <SimpleActionButton
          icon={FiSettings}
          onClick={() => history.push('/settings')}
        />
      )}
    </header>
  );
};

export default SimpleHeader;
