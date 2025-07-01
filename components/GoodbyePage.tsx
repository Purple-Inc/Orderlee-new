import React, { useEffect, useState } from 'react';
import { Package } from 'lucide-react';

interface GoodbyPageProps {
  onComplete: () => void;
}

const GoodbyePage: React.FC<GoodbyPageProps> = ({ onComplete }) => {
  const [countdown, setCountdown] = useState(3);
  const [animationPhase, setAnimationPhase] = useState<'idle' | 'scale' | 'explode' | 'complete'>('idle');

  useEffect(() => {
    // Start scale animation immediately
    const scaleTimer = setTimeout(() => {
      setAnimationPhase('scale');
    }, 200);

    // Start explosion
    const explodeTimer = setTimeout(() => {
      setAnimationPhase('explode');
    }, 800);

    // Complete animation
    const completeTimer = setTimeout(() => {
      setAnimationPhase('complete');
    }, 1500);

    const countdownTimer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearTimeout(scaleTimer);
      clearTimeout(explodeTimer);
      clearTimeout(completeTimer);
      clearInterval(countdownTimer);
    };
  }, [onComplete]);

  // Generate particle positions
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    angle: (i * 30) * (Math.PI / 180), // 30 degrees apart
    distance: 100 + Math.random() * 50,
    size: 8 + Math.random() * 12,
    delay: Math.random() * 0.2
  }));

  return (
    <div className={`min-h-screen flex items-center justify-center transition-all duration-1000 ease-out ${
      animationPhase === 'complete' ? 'bg-white' : 'bg-blue-600'
    }`}>
      <div className="text-center relative">
        {/* Explosion Container */}
        <div className="mb-8 relative">
          {/* Main Box */}
          <div className={`relative inline-block transition-all duration-300 ${
            animationPhase === 'scale' ? 'animate-box-scale' :
            animationPhase === 'explode' ? 'animate-box-explode' :
            animationPhase === 'complete' ? 'opacity-0' :
            'scale-100 opacity-100'
          }`}>
            <div className="w-24 h-24 bg-white rounded-2xl shadow-2xl flex items-center justify-center">
              <Package className="h-12 w-12 text-blue-600" />
            </div>
          </div>

          {/* Explosion Particles */}
          {animationPhase === 'explode' && particles.map((particle) => (
            <div
              key={particle.id}
              className="absolute top-1/2 left-1/2 animate-particle-explode"
              style={{
                '--particle-x': `${Math.cos(particle.angle) * particle.distance}px`,
                '--particle-y': `${Math.sin(particle.angle) * particle.distance}px`,
                '--particle-size': `${particle.size}px`,
                '--particle-delay': `${particle.delay}s`,
                animationDelay: `${particle.delay}s`
              } as React.CSSProperties}
            >
              <div 
                className="bg-white rounded-lg shadow-lg"
                style={{
                  width: `${particle.size}px`,
                  height: `${particle.size}px`
                }}
              />
            </div>
          ))}

          {/* Blur Fragments */}
          {animationPhase === 'explode' && (
            <>
              <div className="absolute top-1/2 left-1/2 w-8 h-8 bg-blue-600 rounded animate-fragment-1 blur-sm opacity-80" />
              <div className="absolute top-1/2 left-1/2 w-6 h-6 bg-white rounded animate-fragment-2 blur-sm opacity-70" />
              <div className="absolute top-1/2 left-1/2 w-10 h-4 bg-blue-400 rounded animate-fragment-3 blur-sm opacity-60" />
              <div className="absolute top-1/2 left-1/2 w-4 h-8 bg-gray-200 rounded animate-fragment-4 blur-sm opacity-50" />
              <div className="absolute top-1/2 left-1/2 w-12 h-3 bg-blue-800 rounded animate-fragment-5 blur-sm opacity-40" />
            </>
          )}

          {/* Shockwave Effect */}
          {animationPhase === 'explode' && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-4 h-4 border-4 border-white rounded-full animate-shockwave opacity-60" />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 border-2 border-blue-200 rounded-full animate-shockwave-2 opacity-40" />
            </div>
          )}
        </div>
        
        {/* Message */}
        <div className={`transition-all duration-1000 ${
          animationPhase === 'complete' ? 'text-gray-800' : 'text-white'
        }`}>
          <h1 className="text-4xl font-bold mb-4">We'll miss you!</h1>
          <p className={`text-xl mb-6 transition-colors duration-1000 ${
            animationPhase === 'complete' ? 'text-gray-600' : 'text-blue-100'
          }`}>
            Thank you for using Orderlee. Come back soon!
          </p>
          <p className={`transition-colors duration-1000 ${
            animationPhase === 'complete' ? 'text-gray-500' : 'text-blue-200'
          }`}>
            Redirecting in {countdown} seconds...
          </p>
        </div>
      </div>
    </div>
  );
};

export default GoodbyePage;