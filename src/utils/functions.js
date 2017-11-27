export function extractId(url) {
  const trimmed = url.replace(/\/+$/, ""); // without the trailing slash
  const arr = trimmed.split("/");
  return arr[arr.length - 1];
}