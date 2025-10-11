"use client";
import React, {useEffect, useState} from "react";
import Link from "next/link";
import {fetchTales, loadAudioBlob, loadVideoBlob} from "@/app/api/tales";
import {getBlobFromIndexedDB, saveBlobToIndexedDB} from "@/app/utils/audioCache";
import {Tale} from "@/app/fairy_tales/page";

const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleLinkClick = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        const fetchAll = async() => {
            const res = await loadVideoBlob();
            let blob = await getBlobFromIndexedDB("film");
            if (!blob) {
                blob = new Blob([res.data], { type: "video/mp4" });
                await saveBlobToIndexedDB("film", blob);
            }
            const tales: Tale[] = await fetchTales();
            for (const tale of tales) {
                let blob = await getBlobFromIndexedDB(tale._id);
                if (!blob) {
                    const res = await loadAudioBlob(tale._id);
                    blob = new Blob([res.data], { type: 'audio/mpeg' });
                    await saveBlobToIndexedDB(tale._id, blob);
                }
            }
        }
        fetchAll();
    }, []);
    
    return (
        <header
            className="shadow-md fixed top-0 left-0 w-full h-[72px] z-60"
            style={{ background: "var(--header-bg)" }}
        >
            <div className="container mx-auto flex items-center justify-between py-[18px] px-6">
                <Link
                    href="/"
                    className="text-2xl sm:text-xl md:text-2xl lg:text-3xl font-extrabold transition-transform duration-300 hover:scale-110"
                    style={{ color: "var(--header-text)" }}
                >
                    This I Love
                </Link>

                <button
                    className="sm:hidden cursor-pointer relative w-8 flex flex-col justify-center items-center group"
                    onClick={() => setIsOpen(!isOpen)}
                >
          <span
              className={`block h-0.5 w-6 bg-[var(--header-text)] rounded transition-all duration-300
              ${isOpen ? "rotate-45 translate-y-1.5" : ""}`}
          />
                    <span
                        className={`block h-0.5 w-6 bg-[var(--header-text)] rounded my-1 transition-all duration-300
              ${isOpen ? "opacity-0" : "opacity-100"}`}
                    />
                    <span
                        className={`block h-0.5 w-6 bg-[var(--header-text)] rounded transition-all duration-300
              ${isOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
                    />
                </button>

                <nav
                    className={`
                        absolute sm:static top-full left-0 w-full sm:w-auto
                        bg-[var(--header-bg)] lg:bg-transparent
                        flex flex-col sm:flex-row sm:items-center
                        transition-all duration-300 ease-in-out
                        ${isOpen ? "block translate-y-0 opacity-100 pointer-events-auto"
                                            : "hidden -translate-y-full opacity-0 pointer-events-none"}
                        sm:block sm:translate-y-0 sm:opacity-100 sm:pointer-events-auto
                      `}
                >
                    <ul className="flex flex-col sm:flex-row sm:space-x-6">
                        {[
                            { href: "/film", label: "Фильм" },
                            { href: "/poems", label: "Стихи" },
                            { href: "/playlist", label: "Плейлист" },
                            { href: "/fairy_tales", label: "Сказки" },
                            { href: "/my_love", label: "Моя любовь" },
                        ].map(({ href, label }) => (
                            <li
                                key={href}
                                className="text-xl sm:text-[16px] md:text-xl lg:text-2xl py-2 sm:py-0 text-center"
                                style={{ color: "var(--header-text)" }}
                            >
                                <Link
                                    href={href}
                                    onClick={handleLinkClick}
                                    className="transition-transform duration-300 hover:scale-110 inline-block"
                                >
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
