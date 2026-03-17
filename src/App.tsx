/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquare, 
  ArrowLeft,
  Clock
} from 'lucide-react';

type View = 'home' | 'game';

const StarField = () => {
  const stars = useMemo(() => {
    return Array.from({ length: 100 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 1,
      duration: `${Math.random() * 3 + 2}s`,
      delay: `${Math.random() * 5}s`,
    }));
  }, []);

  const meteors = useMemo(() => {
    return Array.from({ length: 3 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 40}%`,
      duration: `${Math.random() * 2 + 3}s`,
      delay: `${Math.random() * 15}s`,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            top: star.top,
            left: star.left,
            width: `${star.size}px`,
            height: `${star.size}px`,
            '--duration': star.duration,
            animationDelay: star.delay,
          } as React.CSSProperties}
        />
      ))}
      {meteors.map((meteor) => (
        <div
          key={meteor.id}
          className="meteor"
          style={{
            top: meteor.top,
            '--duration': meteor.duration,
            animationDelay: meteor.delay,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
};

export default function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('zh-CN', { hour12: false });
  };

  const navItems = [
    {
      id: 'leave-apply',
      label: '1天请假申请',
      icon: '🌍',
      url: 'https://f.kdocs.cn/g/oqbbmiK5/',
      type: 'link',
    },
    {
      id: 'leave-dash',
      label: '1天请假大屏',
      icon: '🪐',
      url: 'https://www.kdocs.cn/wo/sl/v14QEDIC',
      type: 'link',
    },
    {
      id: 'class-home',
      label: '班级主页',
      icon: '🛰️',
      url: 'https://my.feishu.cn/wiki/YdROwbmgFiUMJYkCnd3cWtDYn0b?from=from_copylink',
      type: 'link',
    },
    {
      id: 'directory',
      label: '班级通讯录',
      icon: '🚀',
      url: 'https://www.kdocs.cn/l/ckLWSd4O03nz',
      type: 'link',
    },
    {
      id: 'leisure',
      label: '休闲一刻',
      icon: '🛸',
      type: 'view',
      view: 'game' as View,
    },
    {
      id: 'assistant-node',
      label: '你的导',
      icon: '🚢',
      url: 'https://ima.qq.com/wiki/?shareId=6a185bc16a54d2114112ac2ad633550eb9bc7f493a7a40169ef6b58d46ec58c8',
      type: 'link',
    }
  ];

  const handleNav = (item: typeof navItems[0]) => {
    if (item.type === 'link' && item.url) {
      window.location.href = item.url;
    } else if (item.type === 'view' && item.view) {
      setCurrentView(item.view);
    }
  };

  // Calculate elliptical positions
  const getOrbitPosition = (index: number, total: number) => {
    const angle = (index / total) * 2 * Math.PI;
    // Use smaller horizontal radius to prevent overflow on mobile
    const rx = typeof window !== 'undefined' && window.innerWidth < 768 ? 35 : 40;
    const ry = 25; // vertical radius in %
    const x = 50 + rx * Math.cos(angle);
    const y = 50 + ry * Math.sin(angle);
    return { x, y };
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden font-sans select-none bg-[#090A0F]">
      <StarField />
      
      {/* Header Info */}
      <div className="absolute top-4 right-4 text-right z-50">
        <div className="text-xl font-mono text-cyan-300 sci-fi-glow">
          {formatTime(time)}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {currentView === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative h-screen w-full flex flex-col items-center justify-center p-6 z-10"
          >
            {/* Title */}
            <motion.div 
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="absolute top-12 left-6 z-10"
            >
              <h1 className="text-4xl md:text-6xl font-black italic text-cyan-400 sci-fi-glow tracking-tighter">
                药本华山论建
              </h1>
              <div className="h-1 w-32 bg-cyan-500/50 mt-2 sci-fi-glow" />
            </motion.div>

            {/* Orbit Navigation */}
            <div className="relative w-full h-full max-w-4xl max-h-[600px] flex items-center justify-center md:-translate-x-12 -translate-x-8 -translate-y-8">
              {/* Elliptical Orbit Path Visual */}
              <div className="absolute w-[70%] md:w-[80%] h-[50%] border border-cyan-500/10 rounded-[100%] pointer-events-none" />
              
              {navItems.map((item, idx) => {
                const { x, y } = getOrbitPosition(idx, navItems.length);
                return (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleNav(item)}
                    className="absolute flex flex-col items-center z-20 group"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    <div className={`
                      w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-3xl md:text-4xl
                      bg-black/40 sci-fi-border backdrop-blur-sm animate-float
                      group-hover:border-cyan-400 transition-colors
                    `} style={{ animationDelay: `${idx * 0.5}s` }}>
                      {item.icon}
                    </div>
                    <span className="node-label whitespace-nowrap bg-black/50 px-2 py-0.5 rounded mt-1">
                      {item.label}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}

        {currentView === 'game' && (
          <motion.div
            key="game"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-black flex flex-col"
          >
            <div className="p-4 flex items-center gap-4 bg-zinc-900 border-b border-cyan-500/30">
              <button 
                onClick={() => setCurrentView('home')}
                className="p-2 rounded-full hover:bg-white/10 text-cyan-400"
              >
                <ArrowLeft />
              </button>
              <h2 className="font-bold text-cyan-300">休闲一刻 - 游戏中心</h2>
            </div>
            <div className="flex-1 w-full relative p-2">
              <iframe
                src="https://1games.io/wacky-flip" 
                width="100%" 
                height="100%" 
                scrolling="no" 
                allowFullScreen 
                loading="lazy"
                style={{ borderRadius: '20px', backgroundColor: '#eeeeee', border: '3px dashed #111111' }}
                sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals allow-downloads allow-presentation allow-pointer-lock allow-top-navigation allow-storage-access-by-user-activation allow-clipboard-write allow-web-share allow-orientation-lock allow-screen-wake-lock allow-downloads-without-user-activation allow-payment allow-encrypted-media allow-autoplay"
                referrerPolicy="unsafe-url"
                tabIndex={0}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
