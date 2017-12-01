/**
 * Extract the pointed id of a SWAPI url, which is the last part of the url.
 * @param {string} url a SWAPI URL
 */
export function extractId(url) {
  const trimmed = url.replace(/\/+$/, ""); // without the trailing slash
  const arr = trimmed.split("/");
  return arr[arr.length - 1];
}