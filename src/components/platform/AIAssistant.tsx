import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Send, Minimize2, Maximize2 } from "lucide-react";

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

export const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hi! I'm your AI assistant. I can help you build your app, suggest components, generate code, and answer questions. What would you like to create?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: getAIResponse(inputValue),
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const getAIResponse = (input: string): string => {
    const responses = [
      "Great idea! I can help you create that component. Let me suggest the best approach for your design.",
      "I'll generate the necessary code for that feature. Would you like me to add it to your canvas?",
      "Based on your request, I recommend using a container component with these child elements...",
      "Perfect! I can help optimize that layout. Here are some suggestions for better user experience:",
      "That's a common pattern in modern web apps. Let me show you how to implement it effectively.",
      "I notice you might need a backend for that feature. Shall I help you design the API structure?",
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  return (
    <>
      {/* Floating AI Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-ai shadow-ai ai-pulse z-50 ${
          isOpen ? 'scale-0' : 'scale-100'
        } transition-transform`}
      >
        <Bot className="w-6 h-6" />
      </Button>

      {/* AI Assistant Panel */}
      <div
        className={`fixed bottom-6 right-6 w-96 h-[500px] z-50 transition-all duration-300 ${
          isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
        }`}
      >
        <Card className="w-full h-full bg-card/95 backdrop-blur-sm border-primary/20 shadow-ai">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center">
                <div className="w-8 h-8 bg-gradient-ai rounded-lg flex items-center justify-center mr-3">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                AI Assistant
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
              >
                <Minimize2 className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="flex flex-col h-full pb-4">
            {/* Messages */}
            <ScrollArea className="flex-1 pr-4 mb-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.type === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg text-sm ${
                        message.type === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-muted text-muted-foreground p-3 rounded-lg text-sm">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask me anything..."
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                className="flex-1"
              />
              <Button onClick={sendMessage} size="sm" className="bg-gradient-primary">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};