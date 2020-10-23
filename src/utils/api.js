export async function getRandomQuote() {
  let url = `https://api.tronalddump.io/random/quote`;
  const response = await fetch(url);
  const data = await response.json();
  //return data.value;
  return {
    qoute: data.value,
    tags: data.tags,
  };
}
