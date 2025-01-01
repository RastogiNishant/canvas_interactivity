'use client';

import { useState, useCallback } from 'react';
import type { CanvasElement, Position } from '@/types/canvas';

interface UseCanvasElement {
  elements: CanvasElement[];
  addElement: (element: Omit<CanvasElement, 'id'>) => void;
  updateElement: (id: string, updates: Partial<CanvasElement>) => void;
  removeElement: (id: string) => void;
}

export const useCanvasElement = (): UseCanvasElement => {
  const [elements, setElements] = useState<CanvasElement[]>([]);

  const addElement = useCallback((element: Omit<CanvasElement, 'id'>) => {
    const newElement: CanvasElement = {
      ...element,
      id: Math.random().toString(36).substr(2, 9),
    };
    setElements((prev) => [...prev, newElement]);
  }, []);

  const updateElement = useCallback((id: string, updates: Partial<CanvasElement>) => {
    setElements((prev) =>
      prev.map((element) =>
        element.id === id ? { ...element, ...updates } : element
      )
    );
  }, []);

  const removeElement = useCallback((id: string) => {
    setElements((prev) => prev.filter((element) => element.id !== id));
  }, []);

  return {
    elements,
    addElement,
    updateElement,
    removeElement,
  };
};