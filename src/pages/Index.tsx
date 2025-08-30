import { useState } from "react";
import { ComponentPalette } from "@/components/platform/ComponentPalette";
import { DesignCanvas } from "@/components/platform/DesignCanvas";
import { PropertiesPanel } from "@/components/platform/PropertiesPanel";
import { AIAssistant } from "@/components/platform/AIAssistant";
import { PlatformHeader } from "@/components/platform/PlatformHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Database, Code, Rocket, Bot } from "lucide-react";
import type { CanvasComponent } from "@/types/platform";

const Index = () => {
  const [selectedComponent, setSelectedComponent] = useState<CanvasComponent | null>(null);
  const [canvasComponents, setCanvasComponents] = useState<CanvasComponent[]>([]);
  const [activeTab, setActiveTab] = useState("design");

  const addComponent = (component: CanvasComponent) => {
    setCanvasComponents([...canvasComponents, component]);
  };

  const updateComponent = (id: string, updates: Partial<CanvasComponent>) => {
    setCanvasComponents(components =>
      components.map(comp => comp.id === id ? { ...comp, ...updates } : comp)
    );
  };

  const deleteComponent = (id: string) => {
    setCanvasComponents(components => components.filter(comp => comp.id !== id));
    if (selectedComponent?.id === id) {
      setSelectedComponent(null);
    }
  };

  return (
    <div className="h-screen bg-background flex flex-col font-inter">
      <PlatformHeader />
      
      <div className="flex-1 flex">
        {/* Left Sidebar - Component Palette */}
        <div className="w-80 border-r border-border bg-card">
          <Tabs defaultValue="design" className="h-full">
            <TabsList className="grid w-full grid-cols-4 bg-muted/50">
              <TabsTrigger value="design">Design</TabsTrigger>
              <TabsTrigger value="database"><Database className="w-4 h-4" /></TabsTrigger>
              <TabsTrigger value="code"><Code className="w-4 h-4" /></TabsTrigger>
              <TabsTrigger value="deploy"><Rocket className="w-4 h-4" /></TabsTrigger>
            </TabsList>
            
            <TabsContent value="design" className="h-full">
              <ComponentPalette onAddComponent={addComponent} />
            </TabsContent>
            
            <TabsContent value="database" className="h-full p-4">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Database Schema</h3>
                <div className="bg-gradient-canvas rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">
                    AI-powered database designer coming soon...
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="code" className="h-full p-4">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Generated Code</h3>
                <div className="bg-gradient-canvas rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">
                    Auto-generated code will appear here...
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="deploy" className="h-full p-4">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Deploy Your App</h3>
                <div className="bg-gradient-canvas rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">
                    One-click deployment options will be here...
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Main Canvas Area */}
        <div className="flex-1 flex flex-col">
          <DesignCanvas
            components={canvasComponents}
            selectedComponent={selectedComponent}
            onSelectComponent={setSelectedComponent}
            onUpdateComponent={updateComponent}
            onDeleteComponent={deleteComponent}
          />
        </div>

        {/* Right Sidebar - Properties Panel */}
        <div className="w-80 border-l border-border bg-card">
          <PropertiesPanel
            selectedComponent={selectedComponent}
            onUpdateComponent={updateComponent}
          />
        </div>
      </div>

      {/* AI Assistant Floating Button */}
      <AIAssistant />
    </div>
  );
};

export default Index;