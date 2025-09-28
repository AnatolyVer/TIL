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
    const bookId = "10iYzTSV62MjNFazZOomxLRH9w9iLJ2rh";

    const cachedHtml = localStorage.getItem("bookHtml");
    const cachedHeaders = localStorage.getItem("bookHeaders");
    const cachedTimestamp = localStorage.getItem("bookTimestamp");

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

        localStorage.setItem("bookHtml", htmlWithIds);
        localStorage.setItem("bookHeaders", JSON.stringify(headers));
        localStorage.setItem("bookTimestamp", String(Date.now()));
      })
      .catch(() => setHtml("<p>Не удалось загрузить.</p>"))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      localStorage.setItem("bookScrollPosition", String(window.scrollY));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!loading && html) {
      const savedScroll = localStorage.getItem("bookScrollPosition");
      if (savedScroll) {
        window.scrollTo({
          top: parseInt(savedScroll, 10),
          behavior: "auto",
        });
      }
    }
  }, [loading, html]);

  return <Docx headers={headers} html={html} loading={loading} mode="book"/>;
}