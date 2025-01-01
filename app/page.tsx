'use client';

import { CoordinateCanvas } from '@/components/canvas/coordinate-canvas';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto py-4">
        <h1 className="text-2xl font-bold mb-4">Interactive Canvas</h1>
        <p className="text-gray-600 mb-6">
          Drag, resize, and interact with the elements on the canvas.
        </p>
        <CoordinateCanvas />
      </div>
    </main>
  );
}