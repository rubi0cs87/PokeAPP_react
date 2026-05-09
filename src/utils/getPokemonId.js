export const getPokemonIdFromUrl = (url) => {
  if (!url) return null;
  const parts = url.split("/").filter(Boolean);
  return parseInt(parts[parts.length - 1], 10);
};

export const mapPokemonList = (data, typeParam, genParam) => {
  if (!data) return [];
  if (typeParam) {
    return data.pokemon?.map((p) => getPokemonIdFromUrl(p.pokemon.url)) || [];
  }
  if (genParam) {
    return data.pokemon_species?.map((p) => getPokemonIdFromUrl(p.url)) || [];
  }
  return data.results?.map((p) => getPokemonIdFromUrl(p.url)) || [];
};
