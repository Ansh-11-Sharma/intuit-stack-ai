import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Save, Share, Settings } from "lucide-react";

export const PlatformHeader = () => {
  return (
    <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm flex items-center justify-between px-6">
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-ai rounded-lg flex items-center justify-center">
            <span className="text-sm font-bold text-white">AI</span>
          </div>
          <div>
            <h1 className="text-lg font-bold">NoCode AI Builder</h1>
            <p className="text-xs text-muted-foreground">Untitled Project</p>
          </div>
        </div>
        
        <Badge variant="secondary" className="text-xs">
          <div className="w-2 h-2 bg-success rounded-full mr-2"></div>
          Auto-saved
        </Badge>
      </div>

      <div className="flex items-center space-x-3">
        <Button variant="outline" size="sm">
          <Save className="w-4 h-4 mr-2" />
          Save
        </Button>
        
        <Button variant="outline" size="sm">
          <Play className="w-4 h-4 mr-2" />
          Preview
        </Button>
        
        <Button variant="default" size="sm" className="bg-gradient-primary hover:opacity-90">
          <Share className="w-4 h-4 mr-2" />
          Deploy
        </Button>
        
        <Button variant="ghost" size="sm">
          <Settings className="w-4 h-4" />
        </Button>
      </div>
    </header>
  );
};