export interface CanvasComponent {
  id: string;
  type: 'text' | 'button' | 'input' | 'image' | 'container';
  x: number;
  y: number;
  width: number;
  height: number;
  properties: Record<string, any>;
}