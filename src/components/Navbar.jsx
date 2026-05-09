import { useState, useEffect, useContext } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { PokemonContext } from "../context/PokemonContext";
import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  NativeSelect,
  Text,
} from "@chakra-ui/react";
import pokeBall from "../assets/pokeball.svg";

const Navbar = () => {
  const [searchParams] = useSearchParams();
  const [types, setTypes] = useState([]);
  const [generations, setGenerations] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const { isShiny, toggleShiny } = useContext(PokemonContext);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/type")
      .then((res) => res.json())
      .then((data) => {
        const filteredTypes = data.results.filter(
          (type) => type.name !== "unknown" && type.name !== "shadow",
        );
        setTypes(filteredTypes);
      });

    fetch("https://pokeapi.co/api/v2/generation")
      .then((res) => res.json())
      .then((data) => setGenerations(data.results));
  }, []);

  const currentType = searchParams.get("type") || "";
  const currentGen = searchParams.get("gen") || "";

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/pokemon/${search.toLowerCase()}`);
      setSearch("");
    }
  };

  return (
    <Box
      as="nav"
      bg="red.600"
      px={4}
      py={3}
      position="sticky"
      top={0}
      zIndex="sticky"
      boxShadow="md"
    >
      {/* Fila superior: logo, búsqueda, botón shiny */}
      <Flex align="center" justify="space-between" gap={3} mb={3}>
        <Link to="/">
          <Flex align="center" gap={2}>
            <Image src={pokeBall} alt="Home" boxSize="32px" />
            <Text
              fontWeight="bold"
              fontSize="xl"
              color="white"
              letterSpacing="wide"
            >
              PokéDex
            </Text>
          </Flex>
        </Link>

        <Box as="form" onSubmit={handleSearch} flex={1} maxW="300px">
          <Input
            type="text"
            placeholder="Buscar pokémon..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            bg="white"
            color="gray.800"
            borderRadius="full"
            size="sm"
            _placeholder={{ color: "gray.400" }}
          />
        </Box>


        <Button
        onClick = navigate={}

        <Button
          onClick={toggleShiny}
          size="sm"
          variant={isShiny ? "solid" : "outline"}
          colorPalette="yellow"
          borderRadius="full"
          title="Modo Shiny"
        >
          {isShiny ? "✨ Shiny" : "⭐ Normal"}
        </Button>
      </Flex>

      {/* Fila inferior: filtros por tipo y generación */}
      <Flex gap={3}>
        <NativeSelect.Root flex={1} size="sm">
          <NativeSelect.Field
            value={currentType}
            onChange={(e) => navigate(`/filters?type=${e.target.value}`)}
            bg="red.500"
            color="white"
            borderColor="red.400"
            sx={{ "& option": { color: "black", bg: "white" } }}
          >
            <option value="">Todos los tipos</option>
            {types.map((t) => (
              <option key={t.name} value={t.name}>
                {t.name.charAt(0).toUpperCase() + t.name.slice(1)}
              </option>
            ))}
          </NativeSelect.Field>
          <NativeSelect.Indicator color="white" />
        </NativeSelect.Root>

        <NativeSelect.Root flex={1} size="sm">
          <NativeSelect.Field
            value={currentGen}
            onChange={(e) => navigate(`/filters?gen=${e.target.value}`)}
            bg="red.500"
            color="white"
            borderColor="red.400"
            sx={{ "& option": { color: "black", bg: "white" } }}
          >
            <option value="">Todas las gens</option>
            {generations.map((g, index) => (
              <option key={g.name} value={index + 1}>
                Gen {index + 1}
              </option>
            ))}
          </NativeSelect.Field>
          <NativeSelect.Indicator color="white" />
        </NativeSelect.Root>
      </Flex>
    </Box>
  );
};

export default Navbar;
