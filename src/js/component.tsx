import React, { useState } from 'react';
import type { DragStartEvent } from '@dnd-kit/core';
import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { SortableContext } from '@dnd-kit/sortable';
import { createPortal } from 'react-dom';
import { Container } from './Container';
import { DragContainer } from './DragContainer';

const items = ['a', 'b', 'c', 'd', 'e'];

export const Component = () => {
  const [selectedItems, setSelectedItems] = useState<Array<string>>([]);
  const [draggingItems, setDraggingItems] = useState<Array<string>>([]);
  const [filteredItems, setFilteredItems] = useState<Array<string>>(items);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        delay: 100,
        tolerance: 5,
      },
    }),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor)
  );

  const onSelect = (item: string, multiple = false) => {
    if (multiple) {
      setSelectedItems((state) => {
        const slides = [...state];
        if (slides.includes(item)) {
          return slides.filter((id) => id !== item);
        }
        slides.push(item);
        return slides;
      });
    } else {
      setSelectedItems([item]);
    }
  };

  const onDragStart = (event: DragStartEvent) => {
    const activeId = event.active.id as string;
    if (!selectedItems.includes(activeId)) {
      setSelectedItems([activeId]);
    } else {
      const orderedSelected = selectedItems.filter((s) => s !== activeId);
      orderedSelected.unshift(activeId);
      setDraggingItems(orderedSelected);
      setFilteredItems(items.filter((i) => i === activeId || !selectedItems.includes(i)));
    }
  };

  const onDragEnd = () => {
    setSelectedItems(draggingItems);
    setDraggingItems([]);
    setFilteredItems(items);
  };

  return (
    <div className="w-[100px] mt-20 ml-20 h-[800px]">
      <div className="flex h-full select-none flex-col border">
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis]}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
          >
            <SortableContext items={items}>
              {filteredItems.map((i) => (
                <Container key={i} id={i} onClick={onSelect} selected={selectedItems.includes(i)} />
              ))}
            </SortableContext>

            {createPortal(
              <DragOverlay>{draggingItems.length > 0 ? <DragContainer id={draggingItems[0]} /> : null}</DragOverlay>,
              document.body
            )}
          </DndContext>
        </div>
      </div>
    </div>
  );
};
