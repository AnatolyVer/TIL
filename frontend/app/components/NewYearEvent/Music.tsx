"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export default function MusicPlayer() {
    const pathname = usePathname();
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // пользователь разрешил воспроизведение?
    const [allowed, setAllowed] = useState(false);

    // 1) Первый клик включает аудио
    useEffect(() => {
        const enableAudio = () => {
            setAllowed(true);
            window.removeEventListener("click", enableAudio);
            window.removeEventListener("touchstart", enableAudio);
        };

        window.addEventListener("click", enableAudio);
        window.addEventListener("touchstart", enableAudio);

        return () => {
            window.removeEventListener("click", enableAudio);
            window.removeEventListener("touchstart", enableAudio);
        };
    }, []);

    // 2) Создаём аудио после разрешения
    useEffect(() => {
        if (allowed && !audioRef.current) {
            audioRef.current = new Audio("/sounds/bg.ogg");
            audioRef.current.loop = true;
            audioRef.current.volume = 0.2;
        }
    }, [allowed]);

    // 3) Управляем воспроизведением по маршруту
    useEffect(() => {
        if (!audioRef.current || !allowed) return;

        const audio = audioRef.current;
        const shouldPlay = pathname === "/miracle" || pathname.startsWith("/miracle/");

        if (shouldPlay) {
            audio.play().catch(() => {});
        } else {
            audio.pause();
            audio.currentTime = 0;
        }
    }, [pathname, allowed]);

    return null;
}
