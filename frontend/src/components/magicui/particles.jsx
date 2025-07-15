// components/magicui/particles.jsx
import { useEffect, useRef } from 'react';
import { cn } from "@/lib/utils";

const Particles = ({ quantity = 100, className }) => {
    const particles = Array.from({ length: quantity });

    return (
        <div className={cn("fixed inset-0 overflow-hidden -z-10", className)}>
            {particles.map((_, i) => (
                <div
                    key={i}
                    className="absolute rounded-full bg-white/10"
                    style={{
                        width: `${Math.random() * 6 + 2}px`,
                        height: `${Math.random() * 6 + 2}px`,
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animation: `float ${Math.random() * 10 + 10}s linear infinite`,
                        animationDelay: `${Math.random() * 5}s`
                    }}
                />
            ))}
        </div>
    );
};

export default Particles;