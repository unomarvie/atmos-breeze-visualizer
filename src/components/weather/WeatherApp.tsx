import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { WeatherCard } from './WeatherCard';
import { WeatherAnimations } from './WeatherAnimations';
import { MapPin, Key } from 'lucide-react';

interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
  visibility: number;
}

export const WeatherApp = () => {
  const [apiKey, setApiKey] = useState('');
  const [city, setCity] = useState('London');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [backgroundClass, setBackgroundClass] = useState('bg-gradient-cloudy');
  const { toast } = useToast();

  const getWeatherBackground = (weatherMain: string) => {
    switch (weatherMain.toLowerCase()) {
      case 'clear':
        return 'bg-gradient-sunny';
      case 'clouds':
        return 'bg-gradient-cloudy';
      case 'rain':
      case 'drizzle':
        return 'bg-gradient-rainy';
      case 'snow':
        return 'bg-gradient-snowy';
      case 'thunderstorm':
        return 'bg-gradient-stormy';
      default:
        return 'bg-gradient-cloudy';
    }
  };

  const fetchWeather = async () => {
    if (!apiKey.trim()) {
      toast({
        title: "API Key Required",
        description: "Please enter your OpenWeatherMap API key",
        variant: "destructive"
      });
      return;
    }

    if (!city.trim()) {
      toast({
        title: "City Required",
        description: "Please enter a city name",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      
      if (!response.ok) {
        throw new Error('Weather data not found');
      }
      
      const data = await response.json();
      setWeatherData(data);
      setBackgroundClass(getWeatherBackground(data.weather[0].main));
      
      toast({
        title: "Weather Updated",
        description: `Weather data for ${data.name} has been loaded`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch weather data. Please check your API key and city name.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast({
        title: "Geolocation not supported",
        description: "Your browser doesn't support geolocation",
        variant: "destructive"
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        if (!apiKey.trim()) {
          toast({
            title: "API Key Required",
            description: "Please enter your OpenWeatherMap API key first",
            variant: "destructive"
          });
          return;
        }

        setLoading(true);
        try {
          const { latitude, longitude } = position.coords;
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
          );
          
          if (!response.ok) {
            throw new Error('Weather data not found');
          }
          
          const data = await response.json();
          setWeatherData(data);
          setCity(data.name);
          setBackgroundClass(getWeatherBackground(data.weather[0].main));
          
          toast({
            title: "Location Weather Updated",
            description: `Weather data for your location (${data.name}) has been loaded`,
          });
        } catch (error) {
          toast({
            title: "Error",
            description: "Failed to fetch weather data for your location",
            variant: "destructive"
          });
        } finally {
          setLoading(false);
        }
      },
      () => {
        toast({
          title: "Location access denied",
          description: "Please allow location access or enter a city manually",
          variant: "destructive"
        });
      }
    );
  };

  // Load API key from localStorage
  useEffect(() => {
    const savedApiKey = localStorage.getItem('openweather-api-key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);

  // Save API key to localStorage
  useEffect(() => {
    if (apiKey.trim()) {
      localStorage.setItem('openweather-api-key', apiKey);
    }
  }, [apiKey]);

  const weatherType = weatherData?.weather[0]?.main?.toLowerCase() || '';

  return (
    <div className={`min-h-screen transition-all duration-700 ${backgroundClass} relative overflow-hidden`}>
      {/* Weather animations overlay */}
      <WeatherAnimations weatherType={weatherType} />
      
      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold mb-4 text-white drop-shadow-lg">
              Weather Studio
            </h1>
            <p className="text-xl text-white/80 drop-shadow">
              Beautiful weather with animated backgrounds
            </p>
          </div>

          {/* Controls */}
          <div className="weather-card max-w-md mx-auto mb-8">
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="api-key" className="flex items-center gap-2">
                  <Key className="w-4 h-4" />
                  OpenWeatherMap API Key
                </Label>
                <Input
                  id="api-key"
                  type="password"
                  placeholder="Enter your API key"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Get your free API key from{' '}
                  <a 
                    href="https://openweathermap.org/api" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    OpenWeatherMap
                  </a>
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  placeholder="Enter city name"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && fetchWeather()}
                />
              </div>

              <div className="flex gap-2">
                <Button 
                  onClick={fetchWeather} 
                  disabled={loading}
                  className="flex-1"
                >
                  {loading ? 'Loading...' : 'Get Weather'}
                </Button>
                <Button 
                  onClick={getCurrentLocation} 
                  disabled={loading}
                  variant="outline"
                  size="icon"
                >
                  <MapPin className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Weather display */}
          <WeatherCard weatherData={weatherData} loading={loading} />
        </div>
      </div>
    </div>
  );
};