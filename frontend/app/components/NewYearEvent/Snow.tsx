"use client";

import React, {useEffect, useState } from 'react';
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


const Snow = () => {
    const { inventory } = useAppSelector(state => state.newYearEvent);

    const [snowflakes, setSnowflakes] = useState<Array<SnowFlake>>([]);

    useEffect(() => {
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
    }, []);

    return ( inventory.snow &&
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
};

export default Snow;