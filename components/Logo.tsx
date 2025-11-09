import React from 'react';

const Logo: React.FC = () => (
    <a href="/" className="flex items-center space-x-3 group" aria-label="Sensivika Home">
        <span className="text-2xl font-bold tracking-wider text-gray-200 group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-500 transition-colors duration-300">
            Sensivika
        </span>
    </a>
);

export default Logo;