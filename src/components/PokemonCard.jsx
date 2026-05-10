import { useContext } from "react";
import { Link } from "react-router-dom";
import { PokemonContext } from "../context/PokemonContext";
import { usePokemon } from "../hooks/usePokemon";
import { getTypeColor } from "../utils/typeColor";
import pokeBall from "../assets/pokeball.svg";
import {
  Box,
  Image,
  IconButton,
  Text,
  Heading,
  Flex,
  Badge,
  Card,
  Spinner,
  Center,
} from "@chakra-ui/react";

const PokemonCard = ({ pokemonId }) => {
  const { data: pokemon, loading } = usePokemon(
    `https://pokeapi.co/api/v2/pokemon/${pokemonId}`,
  );
  const { isShiny, toggleCaptured, isCaptured } = useContext(PokemonContext);

  if (loading) {
    return (
      <Center h="250px" bg="white" borderRadius="xl" shadow="sm">
        <Spinner color="red.500" size="xl" />
      </Center>
    );
  }

  if (!pokemon) return null;

  const captured = isCaptured(pokemon.id);

  const pokemonImg = isShiny
    ? pokemon.sprites?.front_shiny || pokemon.sprites?.front_default
    : pokemon.sprites?.front_default;

  const handleAction = (e) => {
    e.preventDefault();
    toggleCaptured(pokemon);
  };

  return (
    <Card.Root
      overflow="hidden"
      variant="elevated"
      transition="transform 0.2s"
      _hover={{ transform: "translateY(-5px)", shadow: "md" }}
      borderRadius="2xl"
    >
      <Card.Body p={4} textAlign="center" position="relative">
        <IconButton
          aria-label={captured ? "Get free" : "Catch!"}
          variant="ghost"
          position="absolute"
          top="2"
          right="2"
          cursor="pointer"
          onClick={handleAction}
        >
          <Image
            src={pokeBall}
            w="24px"
            opacity={captured ? 1 : 0.15}
            filter={captured ? "none" : "grayscale(100%)"}
            transition="all 0.5s"
          />
        </IconButton>

        <Center p={4} mb={4}>
          <Image
            bg="gray.50"
            borderRadius="100px"
            shadow="sm"
            src={pokemonImg || pokeBall}
            alt={pokemon.name}
            boxSize="100px"
            objectFit="contain"
            style={{ imageRendering: "pixelated" }}
          />
        </Center>

        <Text fontSize="xs" color="gray.400" fontWeight="bold" textAlign="left">
          #{pokemon.id.toString().padStart(3, "0")}
        </Text>

        <Heading size="md" textTransform="capitalize" mb={3} textAlign="left">
          {pokemon.name}
        </Heading>

        <Flex gap={2} mb={4} wrap="wrap">
          {pokemon.types.map((t) => (
            <Badge
              key={t.type.name}
              bg={getTypeColor(t.type.name)}
              color="white"
              px={2}
              borderRadius="lg"
              fontSize="xs"
            >
              {t.type.name}
            </Badge>
          ))}
        </Flex>

        <Box
          as={Link}
          to={`/pokemon/${pokemon.id}`}
          display="block"
          py={2}
          bg="red.50"
          color="red.600"
          fontWeight="bold"
          fontSize="sm"
          borderRadius="lg"
          _hover={{ bg: "red.100", textDecoration: "none" }}
          transition="background 0.2s"
        >
          See details
        </Box>
      </Card.Body>
    </Card.Root>
  );
};

export default PokemonCard;
