/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';

import '../styles/components/TaskTimeline.css';

interface TaskTimelineContainerProps {
  container?: 'div' | 'scroll';
  [x: string]: any
}

const TaskTimelineContainer: React.FC<TaskTimelineContainerProps> = ({ container = 'scroll', children, ...props }) => (
  container === 'scroll' ? (
    <ScrollContainer {...props}>
      {children}
    </ScrollContainer>
  ) : (
    <div {...props}>
      {children}
    </div>
  )
);

export default TaskTimelineContainer;
