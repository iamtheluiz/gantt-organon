import React, { CSSProperties } from 'react';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';

import '../styles/components/ProjectItem.css';

interface ProjectItemProps {
  handleUserClick: () => void;
  color?: string;
  title: string;
  subtitle: string;
}

export const ProjectItem: React.FC<ProjectItemProps> = ({
  handleUserClick, color = '#843794', title, subtitle, children,
}) => (
  <div className="m-2">
    <div
      className="projectItem relative w-full h-0 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 mb-2 transition-all duration-200 cursor-pointer"
      onClick={handleUserClick}
      onKeyDown={handleUserClick}
      role="button"
      tabIndex={0}
      style={{ '--active-color': color } as CSSProperties}
    >
      <div className="content absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center gap-1">
        {children}
        <strong className="text-base text-center text-gray-700 dark:text-gray-300">{title}</strong>
      </div>
      <div className="overlay absolute top-0 transition-all w-full h-full p-2 flex flex-col items-center justify-center">
        <span className="text-base text-center text-gray-100 transition-all">{subtitle}</span>
        <HiOutlineArrowNarrowRight className="text-base text-center text-gray-100" size={20} />
      </div>
    </div>
  </div>
);

export default ProjectItem;
