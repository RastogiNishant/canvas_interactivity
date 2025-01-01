'use client';

import { useCoordinateCanvas } from '@/hooks/use-coordinate-canvas';
import { CanvasElementComponent } from './canvas-element';

export function CoordinateCanvas() {
  const { elements, updateElement } = useCoordinateCanvas();

  return (
    <div className="relative w-full h-[calc(100vh-4rem)] bg-gray-50 overflow-hidden border border-gray-200 rounded-lg">
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