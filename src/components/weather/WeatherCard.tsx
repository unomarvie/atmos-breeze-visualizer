import { Card, CardContent } from '@/components/ui/card';
import { Cloud, Sun, CloudRain, CloudSnow, Zap, Wind, Thermometer, Droplets, Eye, Gauge } from 'lucide-react';

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

interface WeatherCardProps {
  weatherData: WeatherData | null;
  loading: boolean;
}

const getWeatherIcon = (weatherMain: string) => {
  switch (weatherMain.toLowerCase()) {
    case 'clear':
      return <Sun className="w-16 h-16 text-sunny animate-pulse" />;
    case 'clouds':
      return <Cloud className="w-16 h-16 text-cloudy" />;
    case 'rain':
    case 'drizzle':
      return <CloudRain className="w-16 h-16 text-rainy" />;
    case 'snow':
      return <CloudSnow className="w-16 h-16 text-snowy" />;
    case 'thunderstorm':
      return <Zap className="w-16 h-16 text-stormy animate-pulse" />;
    default:
      return <Cloud className="w-16 h-16 text-cloudy" />;
  }
};

export const WeatherCard = ({ weatherData, loading }: WeatherCardProps) => {
  if (loading) {
    return (
      <Card className="weather-card max-w-md mx-auto">
        <CardContent className="p-8">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded mb-4"></div>
            <div className="h-16 bg-muted rounded mb-4"></div>
            <div className="h-4 bg-muted rounded mb-2"></div>
            <div className="h-4 bg-muted rounded w-3/4"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!weatherData) {
    return (
      <Card className="weather-card max-w-md mx-auto">
        <CardContent className="p-8 text-center">
          <p className="text-muted-foreground">Enter your API key to see weather data</p>
        </CardContent>
      </Card>
    );
  }

  const temp = Math.round(weatherData.main.temp);
  const feelsLike = Math.round(weatherData.main.feels_like);
  const weatherMain = weatherData.weather[0].main;
  const description = weatherData.weather[0].description;

  return (
    <Card className="weather-card max-w-md mx-auto animate-fade-in">
      <CardContent className="p-8">
        {/* Location and main weather */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">{weatherData.name}</h2>
          <div className="flex items-center justify-center mb-4">
            {getWeatherIcon(weatherMain)}
          </div>
          <div className="text-5xl font-bold mb-2">{temp}°C</div>
          <p className="text-lg text-muted-foreground capitalize">{description}</p>
          <p className="text-sm text-muted-foreground">Feels like {feelsLike}°C</p>
        </div>

        {/* Weather details grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Droplets className="w-5 h-5 text-rainy" />
            <div>
              <p className="text-sm text-muted-foreground">Humidity</p>
              <p className="font-semibold">{weatherData.main.humidity}%</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Wind className="w-5 h-5 text-cloudy" />
            <div>
              <p className="text-sm text-muted-foreground">Wind Speed</p>
              <p className="font-semibold">{weatherData.wind.speed} m/s</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Gauge className="w-5 h-5 text-stormy" />
            <div>
              <p className="text-sm text-muted-foreground">Pressure</p>
              <p className="font-semibold">{weatherData.main.pressure} hPa</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Eye className="w-5 h-5 text-snowy" />
            <div>
              <p className="text-sm text-muted-foreground">Visibility</p>
              <p className="font-semibold">{Math.round(weatherData.visibility / 1000)} km</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};