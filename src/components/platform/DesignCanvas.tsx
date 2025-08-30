import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Copy, Move } from "lucide-react";
import type { CanvasComponent } from "@/types/platform";

interface DesignCanvasProps {
  components: CanvasComponent[];
  selectedComponent: CanvasComponent | null;
  onSelectComponent: (component: CanvasComponent | null) => void;
  onUpdateComponent: (id: string, updates: Partial<CanvasComponent>) => void;
  onDeleteComponent: (id: string) => void;
}

export const DesignCanvas = ({
  components,
  selectedComponent,
  onSelectComponent,
  onUpdateComponent,
  onDeleteComponent,
}: DesignCanvasProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent, component: CanvasComponent) => {
    e.preventDefault();
    setIsDragging(true);
    onSelectComponent(component);
    
    const rect = e.currentTarget.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !selectedComponent || !canvasRef.current) return;
    
    const canvasRect = canvasRef.current.getBoundingClientRect();
    const newX = e.clientX - canvasRect.left - dragOffset.x;
    const newY = e.clientY - canvasRect.top - dragOffset.y;
    
    onUpdateComponent(selectedComponent.id, { x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const renderComponent = (component: CanvasComponent) => {
    const isSelected = selectedComponent?.id === component.id;
    
    const baseStyle = {
      left: component.x,
      top: component.y,
      width: component.width,
      height: component.height,
    };

    const commonClasses = `absolute border-2 ${
      isSelected ? 'border-primary shadow-ai' : 'border-transparent hover:border-primary/50'
    } transition-all cursor-move`;

    switch (component.type) {
      case 'text':
        return (
          <div
            key={component.id}
            className={`${commonClasses} flex items-center justify-center bg-transparent`}
            style={baseStyle}
            onMouseDown={(e) => handleMouseDown(e, component)}
          >
            <span 
              style={{
                color: component.properties.color,
                fontSize: component.properties.fontSize,
                fontWeight: component.properties.fontWeight,
              }}
            >
              {component.properties.text}
            </span>
          </div>
        );
      
      case 'button':
        return (
          <div
            key={component.id}
            className={commonClasses}
            style={baseStyle}
            onMouseDown={(e) => handleMouseDown(e, component)}
          >
            <Button
              variant="default"
              className="w-full h-full bg-primary hover:bg-primary/90"
              style={{
                borderRadius: component.properties.borderRadius,
              }}
            >
              {component.properties.text}
            </Button>
          </div>
        );
      
      case 'input':
        return (
          <div
            key={component.id}
            className={commonClasses}
            style={baseStyle}
            onMouseDown={(e) => handleMouseDown(e, component)}
          >
            <input
              type="text"
              placeholder={component.properties.text}
              className="w-full h-full bg-input border border-border rounded-md px-3 text-foreground"
              style={{
                borderRadius: component.properties.borderRadius,
              }}
            />
          </div>
        );
      
      case 'container':
        return (
          <div
            key={component.id}
            className={`${commonClasses} bg-gradient-canvas rounded-lg`}
            style={{
              ...baseStyle,
              backgroundColor: component.properties.backgroundColor,
              borderRadius: component.properties.borderRadius,
            }}
            onMouseDown={(e) => handleMouseDown(e, component)}
          >
            <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
              Container
            </div>
          </div>
        );
      
      case 'image':
        return (
          <div
            key={component.id}
            className={`${commonClasses} bg-muted rounded-lg flex items-center justify-center`}
            style={baseStyle}
            onMouseDown={(e) => handleMouseDown(e, component)}
          >
            <span className="text-muted-foreground text-sm">Image Placeholder</span>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Canvas Toolbar */}
      <div className="h-12 border-b border-border bg-card/50 flex items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">Canvas</span>
          {selectedComponent && (
            <>
              <span className="text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">
                {selectedComponent.type} selected
              </span>
            </>
          )}
        </div>
        
        {selectedComponent && (
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Copy className="w-4 h-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onDeleteComponent(selectedComponent.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Canvas Area */}
      <div className="flex-1 bg-gradient-canvas overflow-hidden">
        <div
          ref={canvasRef}
          className="w-full h-full canvas-grid relative"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              onSelectComponent(null);
            }
          }}
        >
          {/* Canvas Content */}
          <div className="absolute inset-0">
            {components.map(renderComponent)}
          </div>
          
          {/* Empty State */}
          {components.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Card className="p-8 bg-card/50 backdrop-blur-sm">
                <div className="text-center space-y-4">
                  <Move className="w-12 h-12 text-muted-foreground mx-auto" />
                  <div>
                    <h3 className="text-lg font-semibold">Start Building</h3>
                    <p className="text-muted-foreground">
                      Drag components from the palette to begin
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};