import React, {useEffect, useState} from 'react';
import Image from "next/image";

function DocxSidebar({headers, title}: { headers: { text: string; id: string; tag: string }[], title: string }) {
    const [activeId, setActiveId] = useState<string | null>(localStorage.getItem("activeItemSidebarId") || null);
    const [isOpen, setIsOpen] = useState(false);
    const [isManualScroll, setIsManualScroll] = useState(false);

    useEffect(() => {

        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (isManualScroll) return;
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        localStorage.setItem("activeItemSidebarId", entry.target.id)
                        setActiveId(entry.target.id);
                    }
                });
            },
            {
                rootMargin: "-72px 0px -80% 0px",
                threshold: 0.1,
            }
        );

        headers.forEach((header) => {
            const el = document.getElementById(header.id);
            if (el) observer.observe(el);
        });

        return () => {
            headers.forEach((header) => {
                const el = document.getElementById(header.id);
                if (el) observer.unobserve(el);
            });
        };
    }, [headers, isManualScroll]);

    const handleClick = (id: string) => {
        localStorage.setItem("activeItemSidebarId", id)
        setActiveId(id);
        setIsManualScroll(true);
        const el = document.getElementById(id);
        if (el) {
            const HEADER_HEIGHT = 72;
            const top = el.getBoundingClientRect().top + window.scrollY - HEADER_HEIGHT - 20;
            window.scrollTo({ top, behavior: "smooth" });
        }
        setIsOpen(false);

        setTimeout(() => setIsManualScroll(false), 600);
    };

    return (
        <>
            <button
                className="mt-[72px] fixed top-0 left-0 p-4 cursor-pointer z-40 2xl:hidden bg-[var(--background)]"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? "Закрыть" : title}
            </button>
            <aside
                className={`fixed top-0 left-0 h-full w-full 2xl:w-1/4 p-4 overflow-y-auto z-30 rounded-r-lg bg-[var(--background)] transition-transform duration-300 2xl:translate-x-0 ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                } 2xl:block`}
            >
                <p className="font-bold mt-30 text-[var(--header-text)] mb-2">{title}</p>
                <ul>
                    {headers.map((header, idx) => (
                        <li
                            key={idx}
                            className={`mb-2 ml-${
                                header.tag === "h2" ? "2" : header.tag === "h3" ? "4" : "0"
                            }`}
                        >
                            <button
                                type="button"
                                onClick={() => handleClick(header.id)}
                                className={`text-sm lg:text-lg transition-transform duration-300 hover:translate-x-1 bg-transparent border-none cursor-pointer w-full text-left ${
                                    activeId === header.id
                                        ? "text-[var(--header-text)] font-bold"
                                        : "text-[var(--foreground)]"
                                }`}
                                style={{
                                    transformOrigin: "left center",
                                    fontWeight: header.tag === "h1" ? "bold" : "normal",
                                }}
                            >
                                {header.text}
                            </button>
                        </li>
                    ))}
                </ul>
            </aside>
        </>
    );
}


const BookDocx = ({loading, headers, html, title}: {loading: boolean, headers:{ text: string; id: string; tag: string }[], html: string, title: string}) => {
    return (
        <div className="flex flex-col items-center justify-center relative">
            <Image
                src="/sakura.png"
                alt="corner"
                width={1000}
                height={1000}
                className="fixed hidden 2xl:flex h-fit w-1/5 bottom-0 sm:z-0 right-0 rounded-lg object-cover z-50"
                priority
            />
            {!loading && <DocxSidebar headers={headers} title={title} />}
            <div className="flex-1 2xl:w-1/2  flex flex-col items-center justify-center z-10 max-w-4xl px-4">
                <h1 className="text-2xl pt-10 font-extrabold text-[var(--header-text)] md:text-4xl">
                    Моя любовь
                </h1>
                {loading ? (
                    <>
                        <div className="text-lg text-[var(--foreground)] py-10 z-10 md:text-xl">
                            Загрузка...
                        </div>
                        <Image
                            src="/sakura.png"
                            alt="corner"
                            width={1000}
                            height={1000}
                            className="object-cover h-1/3 w-fit flex 2xl:hidden z-50"
                            priority
                        />
                    </>
                ) : (
                    <div
                        className="docx-content pt-4 flex flex-col justify-center rounded-lg w-full z-10"
                        style={{
                            fontFamily: "Times New Roman, Times, serif",
                            fontSize: "1.2rem",
                        }}
                        dangerouslySetInnerHTML={{ __html: html }}
                    />
                )}
            </div>
            <style jsx global>{`
                .docx-content p {
                    font-size: 16px;
                    line-height: 1.6;
                    text-indent: 2em;
                    margin-bottom: 0.8em;
                    text-align: justify;
                }
                .docx-content p:first-child {
                    text-indent: 0;
                }
                .docx-content h1,
                .docx-content h2,
                .docx-content h3 {
                    text-align: center;
                    margin: 1.2em 0 0.8em 0;
                    scroll-margin-top: 72px;
                    font-weight: bold;
                }

                /* mobile */
                @media (max-width: 640px) {
                    .docx-content p {
                        font-size: 15px;
                        line-height: 1.6;
                    }
                    .docx-content h1 { font-size: 1.4rem; }
                    .docx-content h2 { font-size: 1.2rem; }
                    .docx-content h3 { font-size: 1.1rem; }
                }

                /* tablet */
                @media (min-width: 641px) and (max-width: 1023px) {
                    .docx-content p {
                        font-size: 18px;
                        line-height: 1.7;
                    }
                    .docx-content h1 { font-size: 1.8rem; }
                    .docx-content h2 { font-size: 1.5rem; }
                    .docx-content h3 { font-size: 1.2rem; }
                }

                /* desktop */
                @media (min-width: 1024px) {
                    .docx-content p {
                        font-size: 24px;
                        line-height: 1.8;
                    }
                    .docx-content h1 { font-size: 2rem; }
                    .docx-content h2 { font-size: 1.6rem; }
                    .docx-content h3 { font-size: 1.3rem; }
                }
            `}</style>
        </div>
    );
}

const PoemDocx = ({loading, headers, html, title}: {loading: boolean, headers:{ text: string; id: string; tag: string }[], html: string, title: string}) => {
    return (
        <div className="flex flex-col items-center justify-center relative">
            <Image
                src="/sakura.png"
                alt="corner"
                width={1000}
                height={1000}
                className="fixed hidden 2xl:flex h-fit w-1/5 bottom-0 sm:z-0 right-0 rounded-lg object-cover z-50"
                priority
            />
            {!loading && <DocxSidebar headers={headers} title={title} />}
            <div className="flex-1 2xl:w-1/2 flex flex-col items-center justify-center z-10 max-w-4xl">
                {loading ? (
                    <>
                        <div className="text-lg text-[var(--foreground)] py-10 z-10 md:text-xl">
                            Загрузка...
                        </div>
                        <Image
                            src="/sakura.png"
                            alt="corner"
                            width={1000}
                            height={1000}
                            className="object-cover h-1/3 w-fit flex 2xl:hidden z-50"
                            priority
                        />
                    </>
                ) : (
                    <div
                        className="docx-content text-center flex flex-col justify-center rounded-lg w-full z-10"
                        style={{
                            fontFamily: "Times New Roman, Times, serif",
                            fontSize: "1.2rem",
                        }}
                        dangerouslySetInnerHTML={{ __html: html }}
                    />
                )}
            </div>
            <style jsx global>{`
                .docx-content {
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 1rem;
                }

                .docx-content p {
                    font-size: 18px;
                    line-height: 1; 
                    letter-spacing: 0.1px;
                    text-align: center;
                    margin: 0.5em 0;
                    white-space: pre-line; 
                }

                .docx-content p + p {
                    margin-top: 0.1em; 
                }

                .docx-content em,
                .docx-content i {
                    font-style: italic;
                }

                .docx-content h1,
                .docx-content h2,
                .docx-content h3 {
                    text-align: center;
                    margin: 1.5em 0 0.8em 0;
                    scroll-margin-top: 72px;
                    font-weight: bold;
                    color: var(--header-text);
                }

                .docx-content h1 {
                    font-size: 2rem;
                }
                .docx-content h2 {
                    font-size: 1.6rem;
                }
                .docx-content h3 {
                    font-size: 1.3rem;
                }

                @media (min-width: 1024px) {
                    .docx-content p {
                        font-size: 22px;
                        line-height: 1; 
                    }
                    .docx-content h1 {
                        font-size: 2.2rem;
                    }
                }

                @media (max-width: 768px) {
                    .docx-content p {
                        font-size: 16px;
                        line-height: 1.4;
                    }
                    .docx-content h1 {
                        font-size: 1.6rem;
                    }
                    .docx-content h2 {
                        font-size: 1.4rem;
                    }
                    .docx-content h3 {
                        font-size: 1.2rem;
                    }
                }
            `}</style>
        </div>
    );
}

const Docx = (props: {loading: boolean, headers:{ text: string; id: string; tag: string }[], html: string, mode: "poems" | "book"}) => {
    switch (props.mode) {
        case "poems":
            return <PoemDocx {...props} title="Стихи"/>
        case "book":
            return <BookDocx {...props} title="Главы"/>
    }
};

export default Docx;