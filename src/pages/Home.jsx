import { useState } from "react";
import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import PokemonCard from "../components/PokemonCard";

const MAX_POKEMON_ID = 1025;

const getRandomId = () => Math.floor(Math.random() * MAX_POKEMON_ID) + 1;

const Home = () => {
  const [randomId, setRandomId] = useState(getRandomId);

  return (
    <Box textAlign="center" mt={12} px={4}>
      <Heading as="h1" size="2xl" mb={2}>
        Welcome trainer!
      </Heading>
      <Text fontSize="lg" color="gray.500" mb={4}>
        Your Pokémon of the day is:
      </Text>
      <Flex justify="center" mt={4} minH="200px">
        <PokemonCard pokemonId={randomId} />
      </Flex>
      <Button
        onClick={() => setRandomId(getRandomId())}
        mt={6}
        borderRadius="full"
        colorPalette="red"
        size="lg"
      >
        Try your luck again?
      </Button>
    </Box>
  );
};

export default Home;
