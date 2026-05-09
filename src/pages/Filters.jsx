import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { usePokemon } from "../hooks/usePokemon";
import PokemonCard from "../components/PokemonCard";
import { mapPokemonList } from "../utils/getPokemonId";
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

  const typeParam = searchParams.get("type");
  const genParam = searchParams.get("gen");

  const [prevFilter, setPrevFilter] = useState(`${typeParam}-${genParam}`);
  const currentFilter = `${typeParam}-${genParam}`;
  if (currentFilter !== prevFilter) {
    setPrevFilter(currentFilter);
    setLimit(20);
  }

  let apiUrl = "https://pokeapi.co/api/v2/pokemon?limit=100&offset=0";
  if (typeParam) apiUrl = `https://pokeapi.co/api/v2/type/${typeParam}`;
  else if (genParam)
    apiUrl = `https://pokeapi.co/api/v2/generation/${genParam}`;

  const { data, loading, error } = usePokemon(apiUrl);

  const pokemonList = mapPokemonList(data, typeParam, genParam);

  return (
    <Container maxW="container.xl" py={8}>
      <Box textAlign="center" mb={10}>
        <Heading size="2xl" mb={4} textTransform="capitalize">
          {typeParam && `Tipo: ${typeParam}`}
          {genParam && `Generación: ${genParam}`}
          {!typeParam && !genParam && "Explorar Pokémon"}
        </Heading>
        <Text color="gray.500">
          Mostrando {Math.min(limit, pokemonList.length)} de{" "}
          {pokemonList.length} resultados
        </Text>
      </Box>

      {loading && <Loading />}

      {error && (
        <Center py={10}>
          <Text color="red.500">
            No se encontraron resultados para esta búsqueda.
          </Text>
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
            Cargar más
          </Button>
        </Center>
      )}
    </Container>
  );
};

export default Filters;
