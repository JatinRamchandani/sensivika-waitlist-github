import React, { useState, FormEvent, useEffect } from 'react';
import { db } from './firebase';
import { collection, addDoc, getDocs, query, where, getCountFromServer } from 'firebase/firestore';

import WaitlistCounter from './components/WaitlistCounter';
import { LoaderIcon, CheckIcon } from './components/Icons';
import Logo from './components/Logo';
import NeuralNetBackground from './components/NeuralNetBackground';

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

    useEffect(() => {
        const fetchWaitlistCount = async () => {
            try {
                const waitlistCollection = collection(db, "waitlist");
                const snapshot = await getCountFromServer(waitlistCollection);
                setWaitlistCount(snapshot.data().count);
            } catch (err) {
                console.error("Error fetching waitlist count:", err);
                // Fallback count in case of error
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
        
        const validation = validateEmail(email);
        if (!validation.isValid) {
            setError(validation.message);
            return;
        }
        
        setIsLoading(true);

        try {
            // Check if email already exists
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
                createdAt: new Date() 
            });

            setIsSuccess(true);
            setWaitlistCount(prevCount => prevCount + 1);
            setEmail('');
            setTimeout(() => setIsSuccess(false), 4000);
        } catch (err) {
            alert("Error: " + err.message);
            console.error("Error adding document: ", err);
            setError('Something went wrong. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen w-full bg-gray-900 text-white overflow-hidden">
            <NeuralNetBackground />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-700/40 via-gray-900 to-black"></div>

            <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-20">
                <header className="absolute top-0 left-0 w-full p-6 md:p-8">
                    <Logo />
                </header>

                <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
                    <h2 className="text-4xl md:text-5xl lg:text-5xl font-extrabold leading-tight">
                        Respect yourself.
                        <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
                            Let the knowledge come to you.
                        </span>
                    </h2>
                    <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
                        Sensivika is simply the second brain that you have, but connected to the internet.
                    </p>
                </div>

                <div className="mt-12 mb-12 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                    {isCountLoading ? (
                        <div className="h-[124px] flex items-center justify-center">
                            <LoaderIcon className="w-12 h-12 text-cyan-400" />
                        </div>
                    ) : (
                        <WaitlistCounter count={waitlistCount} />
                    )}
                </div>

                <div className="w-full max-w-md animate-fade-in-up" style={{ animationDelay: '1s' }}>
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
                
                <footer className="absolute bottom-0 w-full p-6 text-center text-gray-500">
                    <p>&copy; {new Date().getFullYear()} Sensivika Corp. The future is now.</p>
                </footer>
            </main>
            
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
            `}</style>
        </div>
    );
};

export default App;