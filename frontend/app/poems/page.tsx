"use client";
import { useEffect, useState } from "react";
import { fetchDocxHtml } from "../api/docx";
import { parseDocxHtml } from "../utils/parseDocx";
import Docx from "@/app/components/Docx";

export default function Page() {
    const [html, setHtml] = useState<string>("");
    const [headers, setHeaders] = useState<
        { text: string; id: string; tag: string }[]
    >([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const bookId = "1JiW2l4AxRoKbMIUJnSVCZFdra83rHhOA";

        const cachedHtml = localStorage.getItem("poemsHtml");
        const cachedHeaders = localStorage.getItem("poemsHeaders");
        const cachedTimestamp = localStorage.getItem("poemsTimestamp");

        const ONE_DAY_MS = 24 * 60 * 60 * 1000;
        const isExpired =
            cachedTimestamp && Date.now() - parseInt(cachedTimestamp, 10) > ONE_DAY_MS;

        if (cachedHtml && cachedHeaders && !isExpired) {
            setHtml(cachedHtml);
            setHeaders(JSON.parse(cachedHeaders));
            setLoading(false);
            return;
        }

        setLoading(true);
        fetchDocxHtml(bookId)
            .then((rawHtml) => {
                const { htmlWithIds, headers } = parseDocxHtml(rawHtml);
                setHtml(htmlWithIds);
                setHeaders(headers);

                localStorage.setItem("poemsHtml", htmlWithIds);
                localStorage.setItem("poemsHeaders", JSON.stringify(headers));
                localStorage.setItem("poemsTimestamp", String(Date.now()));
            })
            .catch(() => setHtml("<p>Не удалось загрузить.</p>"))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            localStorage.setItem("poemsScrollPosition", String(window.scrollY));
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (!loading && html) {
            const savedScroll = localStorage.getItem("poemsScrollPosition");
            if (savedScroll) {
                window.scrollTo({
                    top: parseInt(savedScroll, 10),
                    behavior: "auto",
                });
            }
        }
    }, [loading, html]);

    return <Docx headers={headers} html={html} loading={loading} mode="poems"/>;
}