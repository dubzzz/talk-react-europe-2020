/**
 * Retrieve up to 10 suggestions of packages
 * corresponding to the query
 *
 * @param {string} query
 * @returns {string[]}
 */
export async function suggestionsFor(query) {
  if (query === '') {
    return [];
  }
  const response = await fetch(`https://api.npms.io/v2/search/suggestions?q=${encodeURIComponent(query)}&size=10`);
  if (response.status !== 200) {
    throw new Error(await response.text());
  }
  const data = await response.json();
  return data.map((suggestion) => suggestion.package.name);
}
