import React, { useRef, useEffect } from 'react';

const NeuralNetBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        let particles: Particle[] = [];
        const particleCount = Math.floor((width * height) / 25000);
        const maxDistance = 220;

        const mouse = {
            x: -1000,
            y: -1000,
        };

        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            radius: number;

            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.radius = Math.random() * 1.5 + 1;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(107, 237, 255, 0.8)';
                ctx.fill();
            }
        }

        const init = () => {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };

        const connectParticles = () => {
            if (!ctx) return;
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < maxDistance) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(107, 237, 255, ${1 - distance / maxDistance})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }
        };
        
        const connectMouse = () => {
            if (!ctx) return;
            for (let i = 0; i < particles.length; i++) {
                 const dx = particles[i].x - mouse.x;
                 const dy = particles[i].y - mouse.y;
                 const distance = Math.sqrt(dx * dx + dy * dy);
                 if (distance < maxDistance * 1.5) { // larger radius for mouse interaction
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(mouse.x, mouse.y);
                        ctx.strokeStyle = `rgba(107, 237, 255, ${0.5 * (1 - distance / (maxDistance * 1.5))})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                 }
            }
        }

        let animationFrameId: number;
        const animate = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, width, height);

            particles.forEach(p => {
                p.update();
                p.draw();
            });

            connectParticles();
            connectMouse();

            animationFrameId = requestAnimationFrame(animate);
        };

        const handleResize = () => {
            if (!canvas) return;
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            const newParticleCount = Math.floor((width * height) / 25000);
            if(newParticleCount > particles.length) {
                for (let i = 0; i < newParticleCount - particles.length; i++) {
                    particles.push(new Particle());
                }
            } else {
                particles.splice(newParticleCount);
            }
        };

        const handleMouseMove = (event: MouseEvent) => {
            mouse.x = event.clientX;
            mouse.y = event.clientY;
        };
        
        const handleMouseOut = () => {
            mouse.x = -1000;
            mouse.y = -1000;
        }

        init();
        animate();

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseout', handleMouseOut);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseout', handleMouseOut);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0" />;
};

export default NeuralNetBackground;