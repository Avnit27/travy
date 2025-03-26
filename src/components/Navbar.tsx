import React, { useState } from 'react';
import { Menu, User, LogIn, UserPlus, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import GeminiKeyModal from './GeminiKeyModal';

const Navbar: React.FC<{ apiKey: string; updateApiKey: (key: string) => void }> = ({ 
  apiKey, 
  updateApiKey 
}) => {
  const [keyModalOpen, setKeyModalOpen] = useState(false);
  
  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <a href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-travel-600 bg-gradient-to-r from-travel-500 to-travel-700 bg-clip-text text-transparent">
              Travy
            </span>
          </a>
        </div>

        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setKeyModalOpen(true)}
            className={cn(
              navigationMenuTriggerStyle(),
              "text-sm bg-transparent hover:bg-gray-100"
            )}
          >
            API Key
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <LogIn className="mr-2 h-4 w-4" />
                <span>Sign In</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <UserPlus className="mr-2 h-4 w-4" />
                <span>Sign Up</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer text-red-500 hover:text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <GeminiKeyModal 
        open={keyModalOpen}
        onOpenChange={setKeyModalOpen}
        currentApiKey={apiKey}
        onSave={updateApiKey}
      />
    </nav>
  );
};

export default Navbar;
