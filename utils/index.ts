/**
 * 格式化 error stack 堆栈错误信息
 * @param stack 堆栈信息
 * @returns
 */
export function formatStack(stack: string) {
  return stack
    .split("\n")
    .slice(1)
    .map((item) => item.replace(/^\s+at\s+/g, ""))
    .join("\n");
}

/**
 * 解析 url 中的 query string
 * @param url 
 * @returns
 */
export function parseQueryString(url: string) {
  const queryString = url.split("?")[1];
  const queryParams: Record<string, string> = {};
  queryString?.split("&").forEach((item) => {
    const [key, value] = item.split("=");
    queryParams[key] = value;
  });
  return queryParams;
}
