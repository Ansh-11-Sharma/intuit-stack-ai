import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings, Palette, Box } from "lucide-react";
import type { CanvasComponent } from "@/types/platform";

interface PropertiesPanelProps {
  selectedComponent: CanvasComponent | null;
  onUpdateComponent: (id: string, updates: Partial<CanvasComponent>) => void;
}

export const PropertiesPanel = ({ selectedComponent, onUpdateComponent }: PropertiesPanelProps) => {
  const updateProperty = (key: string, value: any) => {
    if (!selectedComponent) return;
    
    onUpdateComponent(selectedComponent.id, {
      properties: {
        ...selectedComponent.properties,
        [key]: value,
      },
    });
  };

  const updateDimension = (key: 'width' | 'height' | 'x' | 'y', value: number) => {
    if (!selectedComponent) return;
    
    onUpdateComponent(selectedComponent.id, {
      [key]: value,
    });
  };

  if (!selectedComponent) {
    return (
      <div className="h-full p-4 flex items-center justify-center">
        <Card className="w-full bg-card/50">
          <CardContent className="p-6 text-center">
            <Settings className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Selection</h3>
            <p className="text-muted-foreground text-sm">
              Select a component to edit its properties
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="h-full p-4 space-y-6 overflow-y-auto">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold flex items-center">
          <Settings className="w-5 h-5 mr-2" />
          Properties
        </h2>
        <p className="text-sm text-muted-foreground">
          {selectedComponent.type} • {selectedComponent.id}
        </p>
      </div>

      <Separator />

      {/* Position & Size */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center">
            <Box className="w-4 h-4 mr-2" />
            Position & Size
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label className="text-xs">X Position</Label>
              <Input
                type="number"
                value={selectedComponent.x}
                onChange={(e) => updateDimension('x', parseInt(e.target.value) || 0)}
                className="h-8"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Y Position</Label>
              <Input
                type="number"
                value={selectedComponent.y}
                onChange={(e) => updateDimension('y', parseInt(e.target.value) || 0)}
                className="h-8"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label className="text-xs">Width</Label>
              <Input
                type="number"
                value={selectedComponent.width}
                onChange={(e) => updateDimension('width', parseInt(e.target.value) || 0)}
                className="h-8"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Height</Label>
              <Input
                type="number"
                value={selectedComponent.height}
                onChange={(e) => updateDimension('height', parseInt(e.target.value) || 0)}
                className="h-8"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content Properties */}
      {(selectedComponent.type === 'text' || selectedComponent.type === 'button' || selectedComponent.type === 'input') && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Content</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-xs">
                {selectedComponent.type === 'input' ? 'Placeholder' : 'Text'}
              </Label>
              <Input
                value={selectedComponent.properties.text || ''}
                onChange={(e) => updateProperty('text', e.target.value)}
                className="h-8"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-xs">Font Size</Label>
              <div className="px-2">
                <Slider
                  value={[selectedComponent.properties.fontSize || 16]}
                  onValueChange={([value]) => updateProperty('fontSize', value)}
                  min={12}
                  max={48}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>12px</span>
                  <span>{selectedComponent.properties.fontSize || 16}px</span>
                  <span>48px</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label className="text-xs">Font Weight</Label>
              <Select
                value={selectedComponent.properties.fontWeight || 'normal'}
                onValueChange={(value) => updateProperty('fontWeight', value)}
              >
                <SelectTrigger className="h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="semibold">Semibold</SelectItem>
                  <SelectItem value="bold">Bold</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Style Properties */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center">
            <Palette className="w-4 h-4 mr-2" />
            Style
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-xs">Text Color</Label>
            <div className="flex items-center space-x-2">
              <div
                className="w-8 h-8 rounded border border-border"
                style={{ backgroundColor: selectedComponent.properties.color }}
              />
              <Input
                value={selectedComponent.properties.color || '#ffffff'}
                onChange={(e) => updateProperty('color', e.target.value)}
                className="h-8"
                placeholder="#ffffff"
              />
            </div>
          </div>
          
          {selectedComponent.type === 'container' && (
            <div className="space-y-2">
              <Label className="text-xs">Background Color</Label>
              <div className="flex items-center space-x-2">
                <div
                  className="w-8 h-8 rounded border border-border"
                  style={{ backgroundColor: selectedComponent.properties.backgroundColor }}
                />
                <Input
                  value={selectedComponent.properties.backgroundColor || 'transparent'}
                  onChange={(e) => updateProperty('backgroundColor', e.target.value)}
                  className="h-8"
                  placeholder="#1a1a1a"
                />
              </div>
            </div>
          )}
          
          <div className="space-y-2">
            <Label className="text-xs">Border Radius</Label>
            <div className="px-2">
              <Slider
                value={[selectedComponent.properties.borderRadius || 8]}
                onValueChange={([value]) => updateProperty('borderRadius', value)}
                min={0}
                max={24}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>0px</span>
                <span>{selectedComponent.properties.borderRadius || 8}px</span>
                <span>24px</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};