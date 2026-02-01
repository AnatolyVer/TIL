"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/lib/hooks";

interface SnowFlake {
    left: number,
    animationDuration: number,
    fontSize: number,
    animationDelay: number,
    swing: number,
    opacity: number,
    flake: string,
}

export default function MusicAndSnow() {
    const pathname = usePathname();
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const [allowed, setAllowed] = useState(false);

    const { inventory } = useAppSelector(state => state.newYearEvent);

    const [snowflakes, setSnowflakes] = useState<Array<SnowFlake>>([]);

    const createSnowflakes = () => {
        const flakes = Array.from({ length: 60 }, () => ({
            left: Math.random() * 100,
            animationDuration: 8 + Math.random() * 10,
            fontSize: 0.6 + Math.random() * 1.2,
            animationDelay: Math.random() * 15,
            swing: Math.random() * 100 - 50,
            opacity: 0.4 + Math.random() * 0.6,
            flake: Math.random() > 0.5 ? '❅' : '❆',
        }));
        setSnowflakes(flakes);
    }

    useEffect(() => {
        const enableAudio = () => {
            setAllowed(true);
            window.removeEventListener("click", enableAudio);
            window.removeEventListener("touchstart", enableAudio);
        };

        window.addEventListener("click", enableAudio);
        window.addEventListener("touchstart", enableAudio);
        createSnowflakes()

        return () => {
            window.removeEventListener("click", enableAudio);
            window.removeEventListener("touchstart", enableAudio);
        };
    }, []);

    useEffect(() => {
        if (allowed && !audioRef.current) {
            audioRef.current = new Audio("/sounds/bg.ogg");
            audioRef.current.loop = true;
            audioRef.current.volume = 0.1;
        }
    }, [allowed]);

    useEffect(() => {
        if (!audioRef.current || !allowed) {
            setSnowflakes([]);
            return;
        }

        const audio = audioRef.current;
        const shouldPlay = pathname === "/events/new_year_miracle" || pathname.startsWith("/events/new_year_miracle");
        if (shouldPlay) {
            audio.play().catch(() => {});
            createSnowflakes();
        } else {
            audio.pause();
            audio.currentTime = 0;
            setSnowflakes([]);
        }
    }, [pathname, allowed]);



    return ( inventory.snow && snowflakes.length > 0 &&
        <div className="snow">
            {snowflakes.map((flake, i) => (
                <div
                    key={i}
                    className="snowflake"
                    style={{
                        left: `${flake.left}%`,
                        animationDuration: `${flake.animationDuration}s`,
                        animationDelay: `${flake.animationDelay}s`,
                        fontSize: `${flake.fontSize}em`,
                        '--swing': `${flake.swing}px`,
                        opacity: flake.opacity,
                    } as React.CSSProperties}
                >
                    {flake.flake}
                </div>
            ))}
        </div>
    );
}
