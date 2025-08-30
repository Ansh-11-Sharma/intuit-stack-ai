import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  Type, 
  MousePointer, 
  Square, 
  Image, 
  Layout,
  Palette,
  Sparkles
} from "lucide-react";
import type { CanvasComponent } from "@/types/platform";

interface ComponentPaletteProps {
  onAddComponent: (component: CanvasComponent) => void;
}

export const ComponentPalette = ({ onAddComponent }: ComponentPaletteProps) => {
  const components = [
    {
      type: 'text' as const,
      name: 'Text',
      icon: Type,
      description: 'Add text content'
    },
    {
      type: 'button' as const,
      name: 'Button',
      icon: MousePointer,
      description: 'Interactive button'
    },
    {
      type: 'input' as const,
      name: 'Input',
      icon: Square,
      description: 'Text input field'
    },
    {
      type: 'image' as const,
      name: 'Image',
      icon: Image,
      description: 'Add images'
    },
    {
      type: 'container' as const,
      name: 'Container',
      icon: Layout,
      description: 'Layout container'
    }
  ];

  const handleAddComponent = (type: CanvasComponent['type']) => {
    const newComponent: CanvasComponent = {
      id: `${type}-${Date.now()}`,
      type,
      x: 100,
      y: 100,
      width: type === 'text' ? 200 : type === 'button' ? 120 : 300,
      height: type === 'text' ? 40 : type === 'button' ? 40 : type === 'input' ? 40 : 200,
      properties: {
        text: type === 'text' ? 'Sample Text' : type === 'button' ? 'Click me' : type === 'input' ? 'placeholder' : '',
        backgroundColor: type === 'container' ? '#1a1a1a' : 'transparent',
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'normal',
        padding: 12,
        borderRadius: 8,
      }
    };
    
    onAddComponent(newComponent);
  };

  return (
    <div className="h-full p-4 space-y-6">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold flex items-center">
          <Palette className="w-5 h-5 mr-2" />
          Components
        </h2>
        <p className="text-sm text-muted-foreground">
          Drag and drop to build your app
        </p>
      </div>

      <Separator />

      <div className="space-y-3">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
          Basic Elements
        </h3>
        
        <div className="grid gap-2">
          {components.map((component) => (
            <Card 
              key={component.type}
              className="cursor-pointer hover:bg-accent/50 transition-colors group"
              onClick={() => handleAddComponent(component.type)}
            >
              <CardContent className="p-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <component.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{component.name}</h4>
                    <p className="text-xs text-muted-foreground">{component.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Separator />

      <div className="space-y-3">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide flex items-center">
          <Sparkles className="w-4 h-4 mr-2" />
          AI Suggestions
        </h3>
        
        <Card className="bg-gradient-ai/10 border-primary/20">
          <CardContent className="p-3">
            <p className="text-sm text-center text-muted-foreground">
              AI will suggest components based on your design...
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};