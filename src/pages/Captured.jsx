// Página de favoritos: muestra los Pokémon capturados con opción de liberarlos.

import { useContext } from "react";
import { PokemonContext } from "../context/PokemonContext";
import { Container, Heading, SimpleGrid, Text } from "@chakra-ui/react";

import PokemonCard from "../components/PokemonCard";

const Captured = () => {
  const { captured } = useContext(PokemonContext);

  return (
    <Container maxW="container.xl" py={8}>
      <Heading size="2xl" mb={6} textAlign="center">
        Your Captured Pokémon
      </Heading>
      {captured.length === 0 ? (
        <Text fontSize="lg" color="gray.500" textAlign="center">
          You haven't captured any Pokémon yet!
        </Text>
      ) : (
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }} gap={6}>
          {captured.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemonId={pokemon.id} />
          ))}
        </SimpleGrid>
      )}
    </Container>
  );
};

export default Captured;
