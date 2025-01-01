'use client';

interface ResizeHandleProps {
  position: 'top' | 'right' | 'bottom' | 'left' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  onResizeStart: (e: React.MouseEvent) => void;
}

const positionStyles = {
  'top': 'top-0 left-0 right-0 h-1 cursor-n-resize',
  'right': 'right-0 top-0 bottom-0 w-1 cursor-e-resize',
  'bottom': 'bottom-0 left-0 right-0 h-1 cursor-s-resize',
  'left': 'left-0 top-0 bottom-0 w-1 cursor-w-resize',
  'top-left': 'top-0 left-0 w-2 h-2 cursor-nw-resize',
  'top-right': 'top-0 right-0 w-2 h-2 cursor-ne-resize',
  'bottom-left': 'bottom-0 left-0 w-2 h-2 cursor-sw-resize',
  'bottom-right': 'bottom-0 right-0 w-2 h-2 cursor-se-resize',
};

export function ResizeHandle({ position, onResizeStart }: ResizeHandleProps) {
  return (
    <div
      className={`absolute bg-transparent hover:bg-blue-500/50 ${positionStyles[position]}`}
      onMouseDown={onResizeStart}
    />
  );
}