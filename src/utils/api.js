export async function getRandomQuote() {
  const url = `https://api.tronalddump.io/random/quote`;
  const response = await fetch(url);
  const data = await response.json();
  return {
    quote: data.value,
    tags: data.tags,
  };
}

export async function getAllTags() {
  const url = `https://api.tronalddump.io/tag`;
  const response = await fetch(url);
  const data = await response.json();
  const allTags = await data._embedded.tag;
  const tags = allTags.map((tag) => {
    return tag.value;
  });
  return tags;
}
