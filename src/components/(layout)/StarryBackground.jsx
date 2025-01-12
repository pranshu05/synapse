"use client";
import { useEffect, useRef } from "react";

const StarryBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const stars = Array(750).fill().map(() => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1,
            alpha: Math.random() * 0.5 + 0.5,
            alphaChange: Math.random() * 0.02 + 0.01,
        }));

        let shootingStars = [];

        function createShootingStar() {
            const startX = Math.random() * canvas.width;
            const startY = Math.random() * canvas.height / 2; 
            const endX = startX + Math.random() * 200 - 100;
            const endY = startY + Math.random() * 300 + 100;
            const speed = Math.random() * 5 + 2;

            shootingStars.push({
                x: startX,
                y: startY,
                endX,
                endY,
                currentX: startX,
                currentY: startY,
                speed,
                opacity: 1,
            });
        }

        function drawStars() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw background stars
            stars.forEach((star) => {
                star.alpha += star.alphaChange;
                if (star.alpha <= 0.5 || star.alpha >= 1) {
                    star.alphaChange *= -1;
                }
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
                ctx.fill();
            });

            // Draw shooting stars
            shootingStars.forEach((shootingStar, index) => {
                const dx = shootingStar.endX - shootingStar.x;
                const dy = shootingStar.endY - shootingStar.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const unitX = dx / distance;
                const unitY = dy / distance;

                shootingStar.currentX += unitX * shootingStar.speed;
                shootingStar.currentY += unitY * shootingStar.speed;

                const gradient = ctx.createLinearGradient(
                    shootingStar.currentX,
                    shootingStar.currentY,
                    shootingStar.currentX - unitX * 100, 
                    shootingStar.currentY - unitY * 50
                );
                gradient.addColorStop(0, `rgba(255, 255, 255, ${shootingStar.opacity})`);
                gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);

                ctx.beginPath();
                ctx.moveTo(shootingStar.currentX, shootingStar.currentY);
                ctx.lineTo(
                    shootingStar.currentX - unitX * 50,
                    shootingStar.currentY - unitY * 50
                );
                ctx.strokeStyle = gradient;
                ctx.lineWidth = 2;
                ctx.stroke();

                shootingStar.opacity -= 0.01; 

                if (shootingStar.opacity <= 0) {
                    shootingStars.splice(index, 1); 
                }
            });

            requestAnimationFrame(drawStars);
        }

        setInterval(() => {
            if (Math.random() < 0.3) { // 30% chance of spawning a shooting star
                createShootingStar();
            }
        }, 2000);

        drawStars();
    }, []);

    return <canvas ref={canvasRef} style={{ position: "absolute", height:"100%", top: 0, left: 0, zIndex: -1, backgroundColor: "black" }} />;
};

export default StarryBackground;