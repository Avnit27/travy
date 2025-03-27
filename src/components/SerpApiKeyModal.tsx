
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ExternalLink } from 'lucide-react';

interface SerpApiKeyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentApiKey: string;
  onSave: (apiKey: string) => void;
}

const SerpApiKeyModal: React.FC<SerpApiKeyModalProps> = ({
  open,
  onOpenChange,
  currentApiKey,
  onSave,
}) => {
  const [apiKey, setApiKey] = useState(currentApiKey || '');

  const handleSave = () => {
    onSave(apiKey);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>SerpAPI Key</DialogTitle>
          <DialogDescription>
            Enter your SerpAPI key to enable flight data. You can get a key from
            the SerpAPI website.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col space-y-4 py-4">
          <div className="flex flex-col space-y-2">
            <Label htmlFor="serpapi-key">SerpAPI Key</Label>
            <Input
              id="serpapi-key"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your SerpAPI key"
            />
          </div>
          <div className="text-sm text-muted-foreground">
            <p>Don't have a SerpAPI key?</p>
            <a
              href="https://serpapi.com/users/sign_up"
              target="_blank"
              rel="noopener noreferrer"
              className="text-travel-600 hover:text-travel-700 flex items-center mt-1"
            >
              Sign up on SerpAPI
              <ExternalLink className="ml-1 h-3 w-3" />
            </a>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="submit" onClick={handleSave}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SerpApiKeyModal;
