'use client';

import { useState, useEffect } from 'react';
import type { CanvasElement } from '@/types/canvas';
import { initialCoordinates } from '@/data/initial-coordinates';

export const useCoordinateCanvas = () => {
  const [elements, setElements] = useState<CanvasElement[]>([]);

  useEffect(() => {
    // Initialize elements from coordinates
    const initialElements: CanvasElement[] = initialCoordinates.map((coord, index) => ({
      id: `element-${index}`,
      type: 'rectangle',
      ...coord
    }));
    setElements(initialElements);
  }, []);

  const updateElement = (id: string, updates: Partial<CanvasElement>) => {
    setElements(prev =>
      prev.map(element =>
        element.id === id ? { ...element, ...updates } : element
      )
    );
  };

  return {
    elements,
    updateElement
  };
};