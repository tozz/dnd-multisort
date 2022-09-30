import type { MouseEvent } from 'react';
import React, { useCallback } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import classNames from 'classnames';

interface ContainerProps {
  id: string;
  onClick: (id: string, multiple: boolean) => void;
  selected?: boolean;
}

export const Container = ({ id, selected, onClick }: ContainerProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const handleClick = useCallback(
    (event: MouseEvent) => {
      onClick(id, event.nativeEvent.metaKey);
    },
    [id, onClick]
  );

  const containerClasses = classNames('group flex cursor-pointer w-full justify-center transition-colors', {
    'bg-blue-200': selected,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div className={containerClasses} ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div className="flex flex-1 p-2" onClick={handleClick}>
        <div className="flex flex-1">
          <div className="aspect-video w-full border bg-white group-hover:border-blue-400"></div>
        </div>
      </div>
    </div>
  );
};
