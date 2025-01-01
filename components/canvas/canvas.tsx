'use client';

import { useCanvasElement } from '@/hooks/use-canvas-element';
import { CanvasElementComponent } from './canvas-element';
import { Button } from '@/components/ui/button';
import { Plus, Circle, Square, Type } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Canvas() {
  const { elements, addElement, updateElement } = useCanvasElement();

  const handleAddElement = (type: 'rectangle' | 'circle' | 'text') => {
    addElement({
      type,
      x: 100,
      y: 100,
      width: 150,
      height: 150,
      content: type === 'text' ? 'Double click to edit' : undefined,
    });
  };

  return (
    <div className="relative w-full h-[calc(100vh-4rem)] bg-gray-50 overflow-hidden">
      <div className="absolute top-4 left-4 z-10">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => handleAddElement('rectangle')}>
              <Square className="mr-2 h-4 w-4" />
              Rectangle
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleAddElement('circle')}>
              <Circle className="mr-2 h-4 w-4" />
              Circle
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleAddElement('text')}>
              <Type className="mr-2 h-4 w-4" />
              Text
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      {elements.map((element) => (
        <CanvasElementComponent
          key={element.id}
          element={element}
          onUpdate={(updates) => updateElement(element.id, updates)}
        />
      ))}
    </div>
  );
}