"use client"
import { useEffect, useRef } from "react";

const StarryBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const stars = Array(500).fill().map(() => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.5,
            alpha: Math.random() * 0.5 + 0.5,
            velocity: Math.random() * 0.2 + 0.1,
        }));

        function drawStars() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            stars.forEach((star) => {
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
                ctx.fill();

                // Twinkle effect
                star.alpha += star.velocity;
                if (star.alpha >= 1 || star.alpha <= 0.5) {
                    star.velocity *= -1;
                }
            });

            requestAnimationFrame(drawStars);
        }

        drawStars();
    }, []);

    return <canvas ref={canvasRef} style={{ position: "fixed", top: 0, left: 0, zIndex: -1 }} />;
};

export default StarryBackground;