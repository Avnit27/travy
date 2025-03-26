
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Key } from "lucide-react";

interface GeminiKeyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentApiKey: string;
  onSave: (apiKey: string) => void;
}

const GeminiKeyModal: React.FC<GeminiKeyModalProps> = ({
  open,
  onOpenChange,
  currentApiKey,
  onSave
}) => {
  const [apiKey, setApiKey] = useState(currentApiKey);
  const [showKey, setShowKey] = useState(false);

  const handleSave = () => {
    onSave(apiKey);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white/95 backdrop-blur-lg border border-travel-100">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-travel-700">
            <Key className="h-5 w-5 text-travel-500" />
            Gemini API Key
          </DialogTitle>
          <DialogDescription className="text-travel-600">
            Enter your Gemini API key to use the AI travel planner.
            You can get one from <a href="https://ai.google.dev/" target="_blank" rel="noopener noreferrer" className="text-travel-500 hover:underline font-medium">Google AI Studio</a>.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="gemini-api-key">API Key</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="gemini-api-key"
                type={showKey ? "text" : "password"}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your Gemini API key"
                className="flex-1 border-travel-200 focus-visible:ring-travel-400"
              />
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowKey(!showKey)}
                className="border-travel-200 hover:bg-travel-50"
              >
                {showKey ? "Hide" : "Show"}
              </Button>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Your API key is stored locally in your browser and never sent to our servers.
          </p>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} className="border-travel-200 hover:bg-travel-50">
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!apiKey.trim()} className="bg-travel-500 hover:bg-travel-600">
            Save API Key
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GeminiKeyModal;
