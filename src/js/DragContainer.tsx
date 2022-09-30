import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import classNames from 'classnames';

interface DragContainerProps {
  id: string;
}

export const DragContainer = ({ id }: DragContainerProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const containerClasses = classNames('group flex cursor-pointer w-full justify-center transition-colors');

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div className={containerClasses} ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div className="flex flex-1 p-2">
        <div className="flex flex-1">
          <div className="aspect-video w-full border bg-yellow-300"></div>
        </div>
      </div>
    </div>
  );
};
