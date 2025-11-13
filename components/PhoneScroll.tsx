import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GoogleIcon, FingerprintIcon, SparklesIcon, PlusIcon, BellIcon, CheckCircleIcon, CloseIcon, ArrowRightIcon } from './Icons';
import Logo from "./Logo";

gsap.registerPlugin(ScrollTrigger);

const LoginScreen: React.FC = () => (
    <div className="w-full h-full bg-gray-900 flex flex-col items-center justify-center px-6 pb-6 pt-14 text-white text-center animate-screen-in">
      <div className="mb-8">
        <span className="text-4xl font-bold tracking-wider text-gray-200 group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-500 transition-colors duration-300">
            Sensivika
        </span>
      </div>
      <p className="text-gray-400 mb-12">Connect your node!</p>
      <button className="w-full bg-white text-black font-semibold py-3 px-4 rounded-lg flex items-center justify-center mb-6 transition-transform hover:scale-105 text-sm">
        <GoogleIcon className="w-5 h-5 mr-3" />
        Sign in with Google
      </button>

      <p className="text-gray-500 mb-4 text-xs">or use biometrics</p>
    </div>
);

const HomeScreen: React.FC = () => (
    <div className="w-full h-full bg-gray-900 text-white pt-14 flex flex-col animate-screen-in">
        <header className="flex justify-between items-center mb-6 px-6 flex-shrink-0">
            <div>
                <p className="text-gray-400 text-sm">Welcome back,</p>
                <h1 className="text-2xl font-bold">Alex</h1>
            </div>
            <div className="w-10 h-10 bg-purple-500 rounded-full border-2 border-gray-700"></div>
        </header>
        <main className="flex-grow px-6 pb-6 overflow-y-auto">
            <div className="bg-gray-800/50 p-4 rounded-lg mb-4">
                <h2 className="font-bold mb-1 flex items-center"><SparklesIcon className="w-5 h-5 mr-2 text-yellow-400"/> Daily Briefing</h2>
                <p className="text-gray-300 text-sm">Summary of your key topics and new insights.</p>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-lg">
                <h2 className="font-bold mb-1">Knowledge Streams</h2>
                 <p className="text-gray-300 text-sm">AI, Quantum Computing, Stock Analysis and 3 more active.</p>
            </div>
        </main>
    </div>
);

const TopicsScreen: React.FC = () => (
    <div className="w-full h-full text-white overflow-hidden animate-screen-in" style={{ 
        backgroundImage: 'url(https://images.unsplash.com/photo-1611800063683-1658d55b38a7?q=80&w=800&auto=format&fit=crop)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    }}>
      <div className="pt-14 flex flex-col h-full bg-black/50 backdrop-blur-sm">
        <header className="flex items-center gap-2 mb-4 px-6 flex-shrink-0">
          <div className="bg-indigo-600 px-3 py-1 rounded-lg flex items-center gap-2 text-sm font-semibold">
            <span>Docker</span>
            <button className="text-indigo-200 hover:text-white"><CloseIcon className="w-4 h-4" /></button>
          </div>
          <button className="bg-gray-800/80 hover:bg-gray-700/80 px-3 py-1 rounded-lg flex items-center gap-2 text-sm font-semibold">
            <PlusIcon className="w-4 h-4" /> Add
          </button>
        </header>
  
        <main className="flex-grow px-6 pb-6 overflow-y-auto text-center">
            <h1 className="text-3xl sm:text-4xl font-extrabold mb-2">What is Docker?</h1>
            <h2 className="text-lg sm:text-xl text-cyan-400 font-semibold mb-6">Package, Ship, Run Anywhere.</h2>
            <div className="bg-gray-900/60 backdrop-blur-lg p-5 rounded-2xl text-left mb-4 text-sm leading-relaxed">
              <p className="text-gray-200">
                Docker is an open-source platform that automates the deployment of applications inside lightweight, portable containers. These containers package up an application with all of its dependencies, such as libraries and other resources, ensuring that the application runs quickly and reliably in any computing environment. This solves the classic problem of 'it works on my machine' by providing a consistent environment from development to production.
              </p>
            </div>
            <div className="border border-gray-600 bg-gray-900/40 rounded-lg p-3 mb-4 text-left text-sm">
              <span className="text-gray-300">docker ps <span className="font-mono">-a</span></span>
            </div>
        
            <div className="flex justify-center gap-2 mb-4 flex-wrap mt-6">
              {['Docker', 'Pods', 'DevOps', 'Nodes'].map(tag => (
                <span key={tag} className="bg-gray-700/70 text-gray-200 px-3 py-1 rounded-full text-xs font-medium">{tag}</span>
              ))}
            </div>
            <a href="#" className="text-cyan-400 font-semibold flex items-center justify-center gap-2 group text-sm">
              Learn More <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
            <p className="text-center text-gray-500 tracking-[0.3em] mt-4 text-xs font-bold">SWIPE UP</p>
        </main>
      </div>
    </div>
);


const NotificationsScreen: React.FC = () => (
    <div className="w-full h-full bg-gray-900 text-white pt-14 flex flex-col animate-screen-in">
        <h1 className="text-2xl font-bold mb-6 px-6 flex-shrink-0">Notifications</h1>
        <main className="flex-grow px-6 pb-6 overflow-y-auto">
            <ul className="space-y-3">
            <li className="flex items-start gap-3 bg-gray-800/50 p-3 rounded-lg">
                <div className="bg-green-500/20 text-green-400 p-2 rounded-full mt-1"><CheckCircleIcon className="w-5 h-5" /></div>
                <div>
                <p className="font-semibold text-sm">New Insight Available</p>
                <p className="text-xs text-gray-400">Deep learning trends for 2024 have been updated.</p>
                </div>
            </li>
            <li className="flex items-start gap-3 bg-gray-800/50 p-3 rounded-lg">
                <div className="bg-blue-500/20 text-blue-400 p-2 rounded-full mt-1"><BellIcon className="w-5 h-5" /></div>
                <div>
                <p className="font-semibold text-sm">Reminder</p>
                <p className="text-xs text-gray-400">Review your 'Quantum Computing' stream.</p>
                </div>
            </li>
            </ul>
        </main>
      </div>
);

const features = [
    { screen: 'login', title: 'Secure & Seamless Access', description: 'Log in instantly with your preferred method. Your second brain is always just a tap away, protected and ready.' },
    { screen: 'home', title: 'Your Daily Briefing', description: 'Start your day with a personalized summary of key topics and new insights, curated just for you by Sensivika.' },
    { screen: 'topics', title: 'Instant Deep Dives', description: 'Explore any topic in depth. From complex technical subjects to creative brainstorming, get the knowledge you need, when you need it.' },
    { screen: 'notifications', title: 'Stay in the Loop', description: 'Receive timely updates and reminders. Sensivika ensures you never miss a critical insight or an opportunity to learn.' }
];

export default function PhoneScroll() {
  const phoneRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [currentScreen, setCurrentScreen] = useState('none');

  useEffect(() => {
    const phone = phoneRef.current;
    const container = containerRef.current;
    if (!phone || !container) return;

    gsap.set("#intro-text-1", { opacity: 0 });
    gsap.set("#intro-text-2", { opacity: 0 });
    gsap.set("#phone-and-features-container", { opacity: 0 });
    gsap.set(phone, { rotateY: -90, opacity: 0 });
    features.forEach(feature => {
        gsap.set(`#feature-${feature.screen}`, { opacity: 0 });
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "+=3000",
        scrub: 0.8,
        pin: true,
        anticipatePin: 1,
      },
    });

    // Intro text animation
    tl.to({}, { duration: 0.5 });
    tl.to("#intro-text-1", { opacity: 1, duration: 1 });
    tl.to({}, { duration: 1.5 });
    tl.to("#intro-text-1", { opacity: 0, duration: 1 });
    tl.to("#intro-text-2", { opacity: 1, duration: 1 }, "<");
    tl.to({}, { duration: 1.5 });
    tl.to("#intro-text-2", { opacity: 0, duration: 1 });
    
    // Phone and features animation
    tl.to("#phone-and-features-container", { opacity: 1, duration: 0.5 });
    tl.to(phone, { rotateY: 0, opacity: 1, duration: 1.2, ease: "power2.inOut" });

    const screenChange = (screenName: string) => {
        return () => setCurrentScreen(screenName);
    }
    
    tl.to({}, { duration: 0.5 });
    tl.to("#feature-login", { opacity: 1, duration: 0.5 });
    tl.call(screenChange('login'));

    tl.to({}, { duration: 1.5 });
    tl.to("#feature-login", { opacity: 0, duration: 0.5 });
    tl.to("#feature-home", { opacity: 1, duration: 0.5 }, "<");
    tl.call(screenChange('home'));

    tl.to({}, { duration: 1.5 });
    tl.to("#feature-home", { opacity: 0, duration: 0.5 });
    tl.to("#feature-topics", { opacity: 1, duration: 0.5 }, "<");
    tl.call(screenChange('topics'));

    tl.to({}, { duration: 1.5 });
    tl.to("#feature-topics", { opacity: 0, duration: 0.5 });
    tl.to("#feature-notifications", { opacity: 1, duration: 0.5 }, "<");
    tl.call(screenChange('notifications'));

    tl.to({}, { duration: 0.5 });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      tl.kill();
    };
  }, []);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'login': return <LoginScreen />;
      case 'home': return <HomeScreen />;
      case 'topics': return <TopicsScreen />;
      case 'notifications': return <NotificationsScreen />;
      default: return null;
    }
  };

  return (
    <section className="relative text-white" style={{ height: "550vh" }}>
      <div ref={containerRef} className="h-screen w-full flex items-center justify-center overflow-hidden">
        
        <div id="intro-text-1" className="absolute text-transparent text-center text-xl md:text-5xl bg-clip-text font-bold text-gray-300 max-w-5xl px-4 bg-gradient-to-r from-cyan-400 to-purple-500">
            One brain was always lesser to contain the whole knowledge...
        </div>
        <div id="intro-text-2" className="absolute text-transparent text-center text-3xl md:text-5xl bg-clip-text font-bold text-gray-300 max-w-2xl px-4 bg-gradient-to-r from-cyan-400 to-purple-500">
            So here is the second one for you...
        </div>

        <div id="phone-and-features-container" className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 px-4">
            <div className="w-full md:w-1/2 flex justify-center" style={{perspective: 1600}}>
                <div className="absolute inset-0 flex justify-center items-center -z-10">
                    <div className="
                        w-[500px] 
                        h-[500px] 
                        rounded-full 
                        blur-[120px]
                        opacity-90
                        bg-[radial-gradient(circle_at_center,_rgba(0,255,255,0.5),_rgba(128,0,255,0.25),_transparent)]
                    "></div>
                </div>
                <div
                    ref={phoneRef}
                    className="w-[250px] h-[500px] sm:w-[280px] sm:h-[560px] md:w-[350px] md:h-[700px]"
                    style={{
                        position: "relative",
                        transformStyle: "preserve-3d",
                        willChange: "transform, opacity",
                        boxShadow: "0 40px 80px rgba(0,0,0,0.6)",
                        borderRadius: 50,
                        background: "#1e1e1e",
                        border: "10px solid #0a0a0a",
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    >
                    <div style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: 40,
                        overflow: 'hidden',
                        background: 'black',
                        position: 'relative'
                    }}>
                        {/* Dynamic Island */}
                        <div className="absolute top-[12px] left-1/2 -translate-x-1/2 w-[80px] h-[24px] sm:w-[100px] sm:h-[30px] bg-[#0a0a0a] rounded-[20px] z-10"></div>
                        {renderScreen()}
                    </div>
                </div>
            </div>
             <div className="w-full md:w-1/2 relative text-center md:text-left mt-8 md:mt-0" style={{minHeight: '150px'}}>
                {features.map((feature) => (
                    <div key={feature.screen} id={`feature-${feature.screen}`} className="absolute inset-0 px-4">
                        <h2 className="text-2xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 mb-4">{feature.title}</h2>
                        <p className="text-sm md:text-lg text-gray-300 max-w-md mx-auto md:mx-0">{feature.description}</p>
                    </div>
                ))}
            </div>
        </div>
      </div>
      <style>{`
        @keyframes screen-in {
            from { opacity: 0; transform: scale(0.98); }
            to { opacity: 1; transform: scale(1); }
        }
        .animate-screen-in {
            animation: screen-in 0.5s ease-out forwards;
        }
      `}</style>
    </section>
  );
}