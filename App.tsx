import React, { useState, FormEvent, useEffect } from 'react';
import { collection, getDocs, addDoc, query, where, Timestamp } from 'firebase/firestore';
import { db } from './firebase';

import WaitlistCounter from './components/WaitlistCounter';
import { LoaderIcon, CheckIcon, ArrowDownIcon } from './components/Icons';
import Logo from './components/Logo';
import NeuralNetBackground from './components/NeuralNetBackground';
import PhoneScroll from './components/PhoneScroll';
import PhoneMockup from './components/PhoneMockup';

// List of common disposable email domains
const disposableEmailDomains = [
    '10minutemail.com', 'temp-mail.org', 'guerrillamail.com', 'mailinator.com', 
    'throwawaymail.com', 'getnada.com', 'mohmal.com', 'yopmail.com'
];

const App: React.FC = () => {
    const [waitlistCount, setWaitlistCount] = useState(0);
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isCountLoading, setIsCountLoading] = useState(true);
    const [showScrollIndicator, setShowScrollIndicator] = useState(true);
    const [heroScreen, setHeroScreen] = useState('login');

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollIndicator(window.scrollY < 50);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Cycle through phone screens in the hero section
    useEffect(() => {
        const screens = ['login', 'home', 'topics', 'notifications'];
        const interval = setInterval(() => {
            setHeroScreen((current) => {
                const currentIndex = screens.indexOf(current);
                const nextIndex = (currentIndex + 1) % screens.length;
                return screens[nextIndex];
            });
        }, 3500);
        return () => clearInterval(interval);
    }, []);


    useEffect(() => {
        const fetchWaitlistCount = async () => {
            if (!db) {
                 setWaitlistCount(13742);
                 setIsCountLoading(false);
                 return;
            }

            try {
                const querySnapshot = await getDocs(collection(db, "waitlist"));
                setWaitlistCount(querySnapshot.size);
            } catch (err) {
                console.error("Error fetching waitlist count:", err);
                // Fallback count in case of error (e.g., permissions or offline)
                setWaitlistCount(13742); 
            } finally {
                setIsCountLoading(false);
            }
        };

        fetchWaitlistCount();
    }, []);

    const validateEmail = (email: string): { isValid: boolean; message: string } => {
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            return { isValid: false, message: 'Please enter a valid email address.' };
        }
        
        const domain = email.split('@')[1];
        if (disposableEmailDomains.includes(domain.toLowerCase())) {
            return { isValid: false, message: 'Disposable email addresses are not supported.' };
        }
        
        return { isValid: true, message: '' };
    };


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setIsSuccess(false);
        
        if (!db) {
            setError("Service unavailable (Offline Mode). Check console.");
            return;
        }

        const validation = validateEmail(email);
        if (!validation.isValid) {
            setError(validation.message);
            return;
        }
        
        setIsLoading(true);

        try {
            // Check if email already exists using Modular Query
            const q = query(collection(db, "waitlist"), where("email", "==", email.toLowerCase()));
            const querySnapshot = await getDocs(q);
            
            if (!querySnapshot.empty) {
                setError('This email is already on the waitlist.');
                setIsLoading(false);
                return;
            }

            // Add email to Firestore
            await addDoc(collection(db, "waitlist"), { 
                email: email.toLowerCase(),
                createdAt: Timestamp.now()
            });

            setIsSuccess(true);
            setWaitlistCount(prevCount => prevCount + 1);
            setEmail('');
            setTimeout(() => setIsSuccess(false), 4000);
        } catch (err) {
            console.error("Error adding document: ", err);
            setError('Something went wrong. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative w-full text-white overflow-x-hidden bg-gray-920">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-700/20 via-gray-900/60 to-black -z-20"></div>
            <div className="relative z-10">
            <NeuralNetBackground />
                <main className="flex flex-col lg:flex-row items-center justify-center min-h-screen px-4 py-20 gap-10 lg:gap-20 max-w-7xl mx-auto">
                    <header className="absolute top-0 left-0 w-full p-6 md:p-8">
                        <Logo />
                    </header>

                    <div className="flex-1 max-w-2xl text-center lg:text-left z-20 order-2 lg:order-1">
                        <div className="animate-fade-in-up">
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
                                Respect yourself.
                                <br />
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
                                    Let the knowledge come to you.
                                </span>
                            </h2>
                            <p className="mt-6 text-lg md:text-xl text-gray-300">
                                Sensivika is simply the second brain that you have, but connected to the internet.
                            </p>
                        </div>

                        <div className="mt-8 mb-8 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                           {/*  {isCountLoading ? (
                                <div className="h-[124px] flex items-center justify-center lg:justify-start">
                                    <LoaderIcon className="w-12 h-12 text-cyan-400" />
                                </div>
                            ) : (
                                <div className="flex justify-center lg:justify-start">
                                    <WaitlistCounter count={waitlistCount} />
                                </div>
                            )} */}
                        </div>

                        <div className="w-full max-w-md mx-auto lg:mx-0 animate-fade-in-up" style={{ animationDelay: '1s' }}>
                            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                <div className="relative">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email"
                                        className="w-full px-5 py-4 text-lg text-white bg-gray-800/50 border-2 border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all duration-300 backdrop-blur-sm placeholder-gray-400"
                                        disabled={isLoading || isSuccess}
                                        aria-label="Email for waitlist"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={isLoading || isSuccess}
                                    className="relative w-full px-5 py-4 text-lg font-bold text-white bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg hover:from-cyan-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-cyan-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                                >
                                    {isLoading ? (
                                        <div className="flex items-center justify-center">
                                            <LoaderIcon className="w-6 h-6 mr-2" />
                                            Processing...
                                        </div>
                                    ) : isSuccess ? (
                                        <div className="flex items-center justify-center">
                                            <CheckIcon className="w-6 h-6 mr-2" />
                                            You're on the list!
                                        </div>
                                    ) : (
                                        "Get Early Pro Access"
                                    )}
                                </button>
                            </form>
                            
                            {error && <p className="mt-4 text-center text-red-400">{error}</p>}
                        </div>
                    </div>

                    <div className="relative flex justify-center w-full lg:w-auto animate-fade-in-up z-10 lg:animate-float order-1 lg:order-2" style={{ animationDelay: '1.2s' }}>
                        <div className="scale-[0.85] md:scale-90 lg:scale-100 origin-center">
                            <PhoneMockup screen={heroScreen} />
                        </div>
                    </div>
                    
                    <footer className="absolute bottom-0 w-full p-6 text-center text-gray-500">
                        <p>&copy; {new Date().getFullYear()} Sensivika Corp. The future is now. {waitlistCount > 0 && <span>#{waitlistCount}</span>}</p>
                    </footer>
                </main>
                <PhoneScroll />
            </div>
            
            <div 
                className={`fixed z-50 bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center gap-3 transition-all duration-700 ${showScrollIndicator ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
                aria-hidden={!showScrollIndicator}
            >
                <span className="text-[10px] uppercase tracking-[0.25em] text-cyan-300/70 font-semibold text-shadow-glow">Scroll to explore</span>
                <div className="animate-bounce p-3 rounded-full bg-gradient-to-b from-gray-800/10 to-gray-800/60 backdrop-blur-md border border-white/5 shadow-lg shadow-cyan-500/10">
                    <ArrowDownIcon className="w-6 h-6 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
                </div>
            </div>

            <style>{`
                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.8s ease-out forwards;
                    opacity: 0;
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
};

export default App;