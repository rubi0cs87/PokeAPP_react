import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import PokemonCard from "../components/PokemonCard";
import { getPokemonIdFromUrl } from "../utils/getPokemonId";
import { Loading } from "../components/Loading";
import {
  Box,
  Heading,
  SimpleGrid,
  Button,
  Container,
  Text,
  Center,
} from "@chakra-ui/react";

const Filters = () => {
  const [searchParams] = useSearchParams();
  const [limit, setLimit] = useState(20);
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const typeParam = searchParams.get("type");
  const genParam = searchParams.get("gen");

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    setLoading(true);
    setError(null);
    setLimit(20);

    const fetchData = async () => {
      try {
        if (typeParam && genParam) {
          const [typeRes, genRes] = await Promise.all([
            fetch(`https://pokeapi.co/api/v2/type/${typeParam}`, { signal }),
            fetch(`https://pokeapi.co/api/v2/generation/${genParam}`, {
              signal,
            }),
          ]);
          const [typeData, genData] = await Promise.all([
            typeRes.json(),
            genRes.json(),
          ]);
          const typeIds =
            typeData.pokemon?.map((p) => getPokemonIdFromUrl(p.pokemon.url)) ||
            [];
          const genIds = new Set(
            genData.pokemon_species?.map((p) => getPokemonIdFromUrl(p.url)) ||
              [],
          );
          setPokemonList(
            typeIds.filter((id) => genIds.has(id)).sort((a, b) => a - b),
          );
        } else if (typeParam) {
          const res = await fetch(
            `https://pokeapi.co/api/v2/type/${typeParam}`,
            { signal },
          );
          const data = await res.json();
          setPokemonList(
            (
              data.pokemon?.map((p) => getPokemonIdFromUrl(p.pokemon.url)) || []
            ).sort((a, b) => a - b),
          );
        } else if (genParam) {
          const res = await fetch(
            `https://pokeapi.co/api/v2/generation/${genParam}`,
            { signal },
          );
          const data = await res.json();
          setPokemonList(
            (
              data.pokemon_species?.map((p) => getPokemonIdFromUrl(p.url)) || []
            ).sort((a, b) => a - b),
          );
        } else {
          const res = await fetch(
            `https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`,
            { signal },
          );
          const data = await res.json();
          setPokemonList(
            data.results?.map((p) => getPokemonIdFromUrl(p.url)) || [],
          );
        }
      } catch (err) {
        if (err.name !== "AbortError") setError(err);
      } finally {
        if (!signal.aborted) setLoading(false);
      }
    };

    fetchData();

    return () => controller.abort();
  }, [typeParam, genParam]);

  return (
    <Container maxW="container.xl" py={8}>
      <Box textAlign="center" mb={10}>
        <Heading size="2xl" mb={4} textTransform="capitalize">
          {typeParam && genParam
            ? `${typeParam.charAt(0).toUpperCase() + typeParam.slice(1)} · Gen ${genParam}`
            : typeParam
              ? `Type: ${typeParam}`
              : genParam
                ? `Generation: ${genParam}`
                : "Explore Pokémon"}
        </Heading>
        <Text color="gray.500">
          Showing {Math.min(limit, pokemonList.length)} of {pokemonList.length}{" "}
          results
        </Text>
      </Box>

      {loading && <Loading />}

      {error && (
        <Center py={10}>
          <Text color="red.500">No results found for this search.</Text>
        </Center>
      )}

      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }} gap={6}>
        {pokemonList.slice(0, limit).map((id) => (
          <PokemonCard key={id} pokemonId={id} />
        ))}
      </SimpleGrid>

      {pokemonList.length > limit && (
        <Center mt={12}>
          <Button
            onClick={() => setLimit((prev) => prev + 15)}
            colorPalette="red"
            size="lg"
            borderRadius="full"
            px={10}
          >
            See more
          </Button>
        </Center>
      )}
    </Container>
  );
};

export default Filters;
