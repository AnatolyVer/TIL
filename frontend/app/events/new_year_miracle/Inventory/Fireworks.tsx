"use client";

import { useEffect, useRef } from "react";

type Particle = {
    x: number;
    y: number;
    vx: number;
    vy: number;
    alpha: number;
    radius: number;
    color: string;
    shape: "circle" | "heart" | "star";
};

export default function Fireworks({ withSound = true }: { withSound?: boolean }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const soundsRef = useRef<HTMLAudioElement[]>([]);

    useEffect(() => {
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext("2d")!;
        let w = (canvas.width = window.innerWidth);
        let h = (canvas.height = window.innerHeight);
        const particles: Particle[] = [];

        const resize = () => {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
        };
        window.addEventListener("resize", resize);

        if (withSound) {
            soundsRef.current = [
                new Audio("/sounds/boom1.mp3"),
                new Audio("/sounds/boom2.mp3"),
                new Audio("/sounds/boom3.mp3"),
            ];
        }

        function playSound() {
            if (!withSound || soundsRef.current.length === 0) return;
            const sound =
                soundsRef.current[Math.floor(Math.random() * soundsRef.current.length)];
            sound.currentTime = 0;
            sound.volume = 0.3;
            sound.play().catch(() => {});
        }

        type BurstType = "classic" | "ring" | "heart" | "star" | "spiral" | "multi";

        function createFirework(x: number, y: number) {
            playSound();

            const type: BurstType = ["classic", "ring", "heart", "star", "spiral", "multi"][
                Math.floor(Math.random() * 6)
                ] as BurstType;

            const count = type === "multi" ? 40 : Math.floor(Math.random() * 100) + 80;
            const baseHue = Math.random() * 360;

            const angles: number[] = [];
            const speeds: number[] = [];

            switch (type) {
                case "classic":
                    for (let i = 0; i < count; i++) {
                        angles.push((Math.PI * 2 * i) / count);
                        speeds.push(Math.random() * 6 + 3);
                    }
                    break;

                case "ring":
                    for (let i = 0; i < count; i++) {
                        const a = (Math.PI * 2 * i) / count;
                        angles.push(a);
                        speeds.push((Math.random() * 4 + 4) * (Math.abs(Math.sin(a * 5)) * 1.5 + 0.5));
                    }
                    break;

                case "heart":
                    for (let i = 0; i < count; i++) {
                        angles.push((Math.PI * 2 * i) / count);
                        speeds.push(Math.random() * 6 + 3);
                    }
                    break;

                case "star":
                    const arms = 5;
                    for (let i = 0; i < count; i++) {
                        const a = (Math.PI * 2 * i) / count + Math.PI / arms;
                        angles.push(a);
                        speeds.push(Math.random() * 7 + 4);
                    }
                    break;

                case "spiral":
                    for (let i = 0; i < count; i++) {
                        const a = (Math.PI * 2 * i) / count + i * 0.1;
                        angles.push(a);
                        speeds.push(Math.random() * 3 + 2);
                    }
                    break;

                case "multi":
                    const subCount = 5;
                    for (let s = 0; s < subCount; s++) {
                        const subHue = (baseHue + s * 60) % 360;
                        const subAngle = (Math.PI * 2 * s) / subCount;
                        for (let i = 0; i < 30; i++) {
                            const a = subAngle + (Math.PI * 2 * i) / 30;
                            angles.push(a);
                            speeds.push(Math.random() * 5 + 4);
                        }
                    }
                    break;
            }

            for (let i = 0; i < angles.length; i++) {
                const hue = type === "multi" ? (baseHue + i * 10) % 360 : baseHue + Math.random() * 60;
                particles.push({
                    x,
                    y,
                    vx: Math.cos(angles[i]) * speeds[i],
                    vy: Math.sin(angles[i]) * speeds[i],
                    alpha: 1,
                    radius: Math.random() * 3 + 1.5,
                    color: `hsl(${hue}, 100%, 65%)`,
                    shape:
                        type === "heart"
                            ? "heart"
                            : type === "star"
                                ? "star"
                                : "circle",
                });
            }
        }

        function drawHeart(x: number, y: number, size: number, color: string, alpha: number) {
            ctx.save();
            ctx.globalAlpha = alpha;
            ctx.fillStyle = color;
            ctx.translate(x, y);
            ctx.scale(size, size);
            ctx.beginPath();
            ctx.moveTo(0, 0.3);
            ctx.bezierCurveTo(-0.6, -0.3, -0.6, 0.4, 0, 0.8);
            ctx.bezierCurveTo(0.6, 0.4, 0.6, -0.3, 0, 0.3);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        }

        function drawStar(x: number, y: number, size: number, color: string, alpha: number) {
            ctx.save();
            ctx.globalAlpha = alpha;
            ctx.fillStyle = color;
            ctx.translate(x, y);
            ctx.scale(size, size);
            ctx.beginPath();
            for (let i = 0; i < 10; i++) {
                const angle = (i * Math.PI) / 5;
                const radius = i % 2 === 0 ? 1 : 0.45;
                ctx.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
            }
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        }

        const bursts: { x: number; y: number; delay: number; launchTime: number }[] = [];
        let lastLaunch = 0;

        function launchRandomBurst() {
            const count = Math.floor(Math.random() * 3) + 2;
            const launchTime = Date.now();
            for (let i = 0; i < count; i++) {
                bursts.push({
                    x: Math.random() * w,
                    y: h * 0.6 + Math.random() * h * 0.3,
                    delay: Math.random() * 400,
                    launchTime,
                });
            }
        }

        function animate() {
            ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
            ctx.fillRect(0, 0, w, h);

            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.05;
                p.alpha -= 0.012;

                if (p.shape === "circle") {
                    ctx.globalAlpha = p.alpha;
                    ctx.fillStyle = p.color;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                    ctx.fill();
                } else if (p.shape === "heart") {
                    drawHeart(p.x, p.y, p.radius * 0.7, p.color, p.alpha);
                } else if (p.shape === "star") {
                    drawStar(p.x, p.y, p.radius * 0.7, p.color, p.alpha);
                }

                if (p.alpha <= 0 || p.y > h + 50) {
                    particles.splice(i, 1);
                }
            }

            const now = Date.now();
            if (now - lastLaunch > 1500 + Math.random() * 1000) {
                launchRandomBurst();
                lastLaunch = now;
            }

            for (let i = bursts.length - 1; i >= 0; i--) {
                const b = bursts[i];
                if (now - b.launchTime >= b.delay) {
                    createFirework(b.x, b.y);
                    bursts.splice(i, 1);
                }
            }

            ctx.globalAlpha = 1;
            requestAnimationFrame(animate);
        }

        animate();

        lastLaunch = Date.now();
        launchRandomBurst();

        const handleClick = (e: MouseEvent) => {
            createFirework(e.clientX, e.clientY);
        };
        canvas.addEventListener("click", handleClick);

        return () => {
            window.removeEventListener("resize", resize);
            canvas.removeEventListener("click", handleClick);
        };
    }, [withSound]);

    return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-auto z-0 bg-black" />;
}