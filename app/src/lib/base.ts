// Префикс для внутренних ссылок и статики. На higgsfield base = "/" и
// функция возвращает путь как есть; в сборке для GitHub Pages (GH_PAGES=1,
// vite base "/railtrain/") добавляет субпуть проекта.
const prefix = import.meta.env.BASE_URL.replace(/\/$/, "");

export function withBase(path: string): string {
  return prefix + path;
}
