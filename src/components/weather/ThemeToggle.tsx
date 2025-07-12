import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  onThemeChange: (isDarkMode: boolean) => void;
}

export const ThemeToggle = ({ onThemeChange }: ThemeToggleProps) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('weather-theme');
    if (savedTheme) {
      const isDark = savedTheme === 'dark';
      setIsDarkMode(isDark);
      onThemeChange(isDark);
    }
  }, [onThemeChange]);

  const toggleTheme = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    onThemeChange(newDarkMode);
    localStorage.setItem('weather-theme', newDarkMode ? 'dark' : 'light');
  };

  return (
    <div className="relative z-50">
      <Button
        onClick={toggleTheme}
        variant="outline"
        size="icon"
        className="bg-white/20 border-white/30 hover:bg-white/30 text-white backdrop-blur-sm"
      >
        {isDarkMode ? (
          <Sun className="w-4 h-4" />
        ) : (
          <Moon className="w-4 h-4" />
        )}
      </Button>
    </div>
  );
};