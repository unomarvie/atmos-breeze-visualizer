import { useEffect, useState } from 'react';

interface WeatherAnimationsProps {
  weatherType: string;
}

export const WeatherAnimations = ({ weatherType }: WeatherAnimationsProps) => {
  const [rainDrops, setRainDrops] = useState<Array<{ id: number; left: string; delay: string }>>([]);
  const [clouds, setClouds] = useState<Array<{ id: number; top: string; size: string; delay: string }>>([]);
  const [snowFlakes, setSnowFlakes] = useState<Array<{ id: number; left: string; size: string; delay: string }>>([]);

  useEffect(() => {
    // Generate rain drops
    if (weatherType.includes('rain') || weatherType.includes('drizzle')) {
      const drops = Array.from({ length: 150 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 2}s`
      }));
      setRainDrops(drops);
    }

    // Generate clouds
    if (weatherType.includes('cloud')) {
      const cloudArray = Array.from({ length: 5 }, (_, i) => ({
        id: i,
        top: `${Math.random() * 30 + 10}%`,
        size: `${Math.random() * 80 + 60}px`,
        delay: `${Math.random() * 20}s`
      }));
      setClouds(cloudArray);
    }

    // Generate snowflakes
    if (weatherType.includes('snow')) {
      const flakes = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        size: `${Math.random() * 4 + 2}px`,
        delay: `${Math.random() * 3}s`
      }));
      setSnowFlakes(flakes);
    }
  }, [weatherType]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Sun rays for clear weather */}
      {weatherType.includes('clear') && (
        <div className="absolute top-20 right-20">
          <div className="sun-rays" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-sunny animate-pulse" />
        </div>
      )}

      {/* Rain animation */}
      {(weatherType.includes('rain') || weatherType.includes('drizzle')) && (
        <>
          {rainDrops.map((drop) => (
            <div
              key={drop.id}
              className="rain-drop"
              style={{
                left: drop.left,
                animationDelay: drop.delay,
                animationDuration: `${0.8 + Math.random() * 0.4}s`
              }}
            />
          ))}
        </>
      )}

      {/* Cloud animation */}
      {weatherType.includes('cloud') && (
        <>
          {clouds.map((cloud) => (
            <div
              key={cloud.id}
              className="cloud"
              style={{
                top: cloud.top,
                width: cloud.size,
                height: `${parseInt(cloud.size) * 0.6}px`,
                animationDelay: cloud.delay,
                animationDuration: '25s'
              }}
            />
          ))}
          {/* Additional cloud layers */}
          <div className="cloud" style={{ top: '15%', width: '120px', height: '60px', animationDelay: '5s' }} />
          <div className="cloud" style={{ top: '25%', width: '80px', height: '40px', animationDelay: '12s' }} />
        </>
      )}

      {/* Snow animation */}
      {weatherType.includes('snow') && (
        <>
          {snowFlakes.map((flake) => (
            <div
              key={flake.id}
              className="snow-flake"
              style={{
                left: flake.left,
                width: flake.size,
                height: flake.size,
                animationDelay: flake.delay,
                animationDuration: `${Math.random() * 2 + 2}s`
              }}
            />
          ))}
        </>
      )}

      {/* Thunder/Storm animation */}
      {(weatherType.includes('thunder') || weatherType.includes('storm')) && (
        <div className="lightning-flash" />
      )}
    </div>
  );
};