import React, { CSSProperties } from 'react';

import '../styles/pages/Home.css';

interface ProjectItemProps {
  handleUserClick: () => void;
  color?: string;
  title: string;
  subtitle: string;
}

export const ProjectItem: React.FC<ProjectItemProps> = ({
  handleUserClick, color = '#843794', title, subtitle, children,
}) => (
  <div
    className="projectItem flex flex-col items-center rounded-lg cursor-pointer transition-all duration-200 p-4"
    style={{ '--active-color': color } as CSSProperties}
    onClick={handleUserClick}
    onKeyDown={handleUserClick}
    role="button"
    tabIndex={0}
  >
    <div className="iconContainer relative w-full h-0 rounded-2xl border-4 border-dashed border-gray-700 dark:border-gray-300 mb-1 transition-all duration-200">
      {children}
    </div>
    <strong className="text-base text-gray-700 dark:text-gray-300">{title}</strong>
    <span className="text-base font-light text-center dark:text-gray-300">{subtitle}</span>
  </div>
);

export default ProjectItem;
