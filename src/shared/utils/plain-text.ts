export const toPlainText = (html: string, maxLength?: number) => {
  const text = html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();

  if (!maxLength || text.length <= maxLength) return text;

  return `${text.slice(0, maxLength - 1).trimEnd()}…`;
};
