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
    className="projectItem"
    style={{ '--active-color': color } as CSSProperties}
    onClick={handleUserClick}
    onKeyDown={handleUserClick}
    role="button"
    tabIndex={0}
  >
    <div className="iconContainer">
      {children}
    </div>
    <strong>{title}</strong>
    <span>{subtitle}</span>
  </div>
);

export default ProjectItem;
