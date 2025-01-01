export interface CanvasElement {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'rectangle' | 'circle' | 'text';
  content?: string;
}

export interface Position {
  x: number;
  y: number;
}