'use client';

interface SizeIndicatorProps {
  width: number;
  height: number;
}

export function SizeIndicator({ width, height }: SizeIndicatorProps) {
  return (
    <div className="absolute bottom-[-24px] left-0 text-xs text-gray-600 whitespace-nowrap">
      {Math.round(width)} × {Math.round(height)}
    </div>
  );
}