import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { usePokemon } from "../hooks/usePokemon";
import { PokemonContext } from "../context/PokemonContext";
import { getTypeColor } from "../utils/typeColor";
import CaptureSimulator from "../components/CaptureSimulator";
import Pokeball from "../assets/pokeball.svg";
import missingNo from "../assets/missigno.png";
import { Loading } from "../components/Loading";
import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  Image,
  Button,
  Badge,
  Stack,
  Progress,
  Card,
  CardBody,
  Center,
  IconButton,
} from "@chakra-ui/react";

const PokemonDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: pokemon,
    loading: pokemonLoading,
    error: pokemonError,
  } = usePokemon(`https://pokeapi.co/api/v2/pokemon/${id}`);

  const speciesUrl = pokemon?.species?.url;
  const { data: species, loading: speciesLoading } = usePokemon(speciesUrl);

  const loading = pokemonLoading || speciesLoading;

  const { isShiny, toggleCaptured, isCaptured } = useContext(PokemonContext);

  const captured = isCaptured(pokemon?.id);

  if (pokemonError)
    return (
      <Center flexDirection="column" py={16} gap={6}>
        <Image
          src={missingNo}
          alt="MissingNo"
          boxSize="200px"
          style={{ imageRendering: "pixelated" }}
        />
        <Heading size="xl" color="gray.600">
          Wild MissingNo appeared!
        </Heading>
        <Text color="gray.500">
          "{id}" doesn't exist in the Pokédex. Try another name or number.
        </Text>
        <Button
          colorPalette="red"
          borderRadius="full"
          onClick={() => navigate(-1)}
        >
          Go back
        </Button>
      </Center>
    );

  if (loading) return <Loading />;
  if (!pokemon || !species) return null;

  const handleAction = () => {
    toggleCaptured(pokemon);
  };

  const pokemonImg = isShiny
    ? pokemon.sprites?.front_shiny || pokemon.sprites?.front_default
    : pokemon.sprites?.front_default;

  return (
    <Container maxW="600px" py={8}>
      <Flex justify="space-between" align="center" mb={6}>
        <Button variant="ghost" colorPalette="red" onClick={() => navigate(-1)}>
          🔙 Back
        </Button>
        <Stack direction="row" gap={2}>
          <Button
            disabled={pokemon.id <= 1}
            onClick={() => navigate(`/pokemon/${pokemon.id - 1}`)}
            variant="outline"
          >
            ◀ Prev
          </Button>
          <Button
            onClick={() => navigate(`/pokemon/${pokemon.id + 1}`)}
            variant="outline"
          >
            Next ▶
          </Button>
        </Stack>
      </Flex>

      <Card.Root
        borderRadius="30px"
        boxShadow="2xl"
        overflow="hidden"
        position="relative"
      >
        <CardBody p={8} textAlign="center">
          <Text
            fontWeight="bold"
            color="gray.400"
            fontSize="2xl"
            textAlign="left"
          >
            #{pokemon.id.toString().padStart(3, "0")}
          </Text>

          <IconButton
            aria-label={captured ? "Release" : "Catch!"}
            variant="ghost"
            position="absolute"
            top="25px"
            right="25px"
            cursor="pointer"
            onClick={handleAction}
            boxSize="48px"
          >
            <Image
              src={Pokeball}
              w="35px"
              opacity={captured ? 1 : 0.2}
              filter={captured ? "none" : "grayscale(100%)"}
              transition="all 0.4s ease"
              title={captured ? "You got it!" : "Not captured yet"}
            />
          </IconButton>

          <Heading textTransform="capitalize" size="2xl" mb={4}>
            {pokemon.name}
          </Heading>

          <Center
            bg="gray.50"
            borderRadius="full"
            boxSize="200px"
            mx="auto"
            mb={6}
            shadow="inner"
          >
            <Image
              src={pokemonImg}
              alt={pokemon.name}
              boxSize="160px"
              style={{ imageRendering: "pixelated" }}
            />
          </Center>

          <Flex justify="center" gap={3} mb={8}>
            {pokemon.types.map((t) => (
              <Badge
                key={t.type.name}
                bg={getTypeColor(t.type.name)}
                color="white"
                px={4}
                py={1}
                borderRadius="full"
              >
                {t.type.name}
              </Badge>
            ))}
          </Flex>

          <Box textAlign="left" mb={8}>
            <Heading
              size="sm"
              mb={4}
              borderBottom="1px solid"
              borderColor="gray.100"
              pb={2}
            >
              Basic Stats
            </Heading>
            <Stack gap={3}>
              {pokemon.stats.map((s) => (
                <Box key={s.stat.name}>
                  <Flex justify="space-between" mb={1}>
                    <Text
                      fontSize="xs"
                      textTransform="uppercase"
                      fontWeight="bold"
                      color="gray.500"
                    >
                      {s.stat.name.replace("-", " ")}
                    </Text>
                    <Text fontSize="xs" fontWeight="bold">
                      {s.base_stat}
                    </Text>
                  </Flex>
                  <Progress.Root
                    value={(s.base_stat / 255) * 100}
                    colorPalette={
                      s.base_stat > 75
                        ? "green"
                        : s.base_stat > 45
                          ? "orange"
                          : "red"
                    }
                    size="xs"
                    borderRadius="full"
                  >
                    <Progress.Track bg="gray.100">
                      <Progress.Range transition="width 0.5s ease-in-out" />
                    </Progress.Track>
                  </Progress.Root>
                </Box>
              ))}
            </Stack>
          </Box>

          <Box mt={4}>
            <CaptureSimulator
              pokemonData={pokemon}
              pokemonBaseCaptureRate={species.capture_rate}
            />
          </Box>
        </CardBody>
      </Card.Root>
    </Container>
  );
};

export default PokemonDetail;
