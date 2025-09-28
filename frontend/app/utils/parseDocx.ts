// utils/parseDocx.ts
export function parseDocxHtml(html: string) {
  const headers: { text: string; id: string; tag: string }[] = [];

  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;

  ["h1", "h2", "h3"].forEach((tag) => {
    tempDiv.querySelectorAll(tag).forEach((el) => {
      const id =
        el.id ||
        el.textContent?.replace(/\s+/g, "-").toLowerCase() ||
        "";
      el.id = id;

      headers.push({
        text: el.textContent || "",
        id,
        tag,
      });
    });
  });

  return { htmlWithIds: tempDiv.innerHTML, headers };
}
