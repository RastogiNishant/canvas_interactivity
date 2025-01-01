'use client';

interface ResizeOverlayProps {
  width: number;
  height: number;
  x: number;
  y: number;
}

export function ResizeOverlay({ width, height, x, y }: ResizeOverlayProps) {
  return (
    <div
      className="absolute border-2 border-blue-500 border-dashed pointer-events-none"
      style={{
        width: `${width}px`,
        height: `${height}px`,
        left: `${x}px`,
        top: `${y}px`,
      }}
    />
  );
}