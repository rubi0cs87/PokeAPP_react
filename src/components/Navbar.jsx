import { useState, useRef, useEffect, useContext } from "react";
import {
  useNavigate,
  Link,
  useSearchParams,
  useLocation,
} from "react-router-dom";
import { PokemonContext } from "../context/PokemonContext";
import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  Text,
  Menu,
  Portal,
} from "@chakra-ui/react";
import pokeBall from "../assets/pokeball.svg";

const Navbar = () => {
  const [searchParams] = useSearchParams();
  const [types, setTypes] = useState([]);
  const [generations, setGenerations] = useState([]);
  const [open, setOpen] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  const { isShiny, toggleShiny } = useContext(PokemonContext);
  const location = useLocation();
  const isActive = location.pathname === "/captured";

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
    const value = searchRef.current?.value?.trim();
    if (value) {
      navigate(`/pokemon/${value.toLowerCase()}`);
      searchRef.current.value = "";
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
      {/* Fila superior: logo, input, shiny */}
      <Flex align="center" gap={3} mb={3}>
        <Flex align="center" gap={2} flexShrink={0}>
          <Link to="/">
            <Flex align="center" gap={2}>
              <Image src={pokeBall} alt="Home" boxSize="32px" flexShrink={0} />
              <Text
                fontWeight="bold"
                fontSize="xl"
                color="white"
                letterSpacing="wide"
                display={{ base: "none", md: "block" }}
                whiteSpace="nowrap"
              >
                PokéApp
              </Text>
            </Flex>
          </Link>
        </Flex>

        <Box as="form" onSubmit={handleSearch} flex={1} minW={0}>
          <Input
            ref={searchRef}
            type="text"
            placeholder="Search pokémon..."
            defaultValue=""
            bg="white"
            color="gray.800"
            borderRadius="full"
            size="sm"
            _placeholder={{ color: "gray.400" }}
          />
        </Box>

        <Button
          onClick={toggleShiny}
          size="sm"
          colorPalette="yellow"
          variant={isShiny ? "solid" : "outline"}
          borderRadius="full"
          title="Shiny Mode"
          flexShrink={0}
        >
          ✨
        </Button>
      </Flex>

      {/* Fila inferior: tipos, gens (izquierda) | captured (derecha) */}
      <Flex align="center" justify="space-between" gap={3}>
        <Flex gap={3}>
          <Menu.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
            <Menu.Trigger asChild>
              <Button
                variant={currentType ? "solid" : "outline"}
                colorPalette="red"
                size="sm"
                borderRadius="full"
                color="white"
                borderColor="white"
              >
                {currentType
                  ? currentType.charAt(0).toUpperCase() + currentType.slice(1)
                  : "All types"}
              </Button>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content bg="red.600" borderColor="red.400">
                  <Menu.Item
                    value=""
                    onClick={() => {
                      navigate(
                        currentGen ? `/filters?gen=${currentGen}` : "/filters",
                      );
                      setOpen(false);
                    }}
                    color="white"
                    _hover={{ bg: "red.500" }}
                  >
                    All types
                  </Menu.Item>
                  {types.map((t) => (
                    <Menu.Item
                      key={t.name}
                      value={t.name}
                      onClick={() => {
                        navigate(
                          `/filters?type=${t.name}${currentGen ? `&gen=${currentGen}` : ""}`,
                        );
                        setOpen(false);
                      }}
                      color="white"
                      _hover={{ bg: "red.500" }}
                    >
                      {t.name.charAt(0).toUpperCase() + t.name.slice(1)}
                    </Menu.Item>
                  ))}
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>

          <Menu.Root>
            <Menu.Trigger asChild>
              <Button
                variant={currentGen ? "solid" : "outline"}
                colorPalette="red"
                size="sm"
                borderRadius="full"
                color="white"
                borderColor="white"
              >
                {currentGen ? `Gen ${currentGen}` : "All gens"}
              </Button>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content bg="red.600" borderColor="red.400">
                  <Menu.Item
                    value=""
                    onClick={() =>
                      navigate(
                        currentType
                          ? `/filters?type=${currentType}`
                          : "/filters",
                      )
                    }
                    color="white"
                    _hover={{ bg: "red.500" }}
                  >
                    All gens
                  </Menu.Item>
                  {generations.map((g, index) => (
                    <Menu.Item
                      key={g.name}
                      value={String(index + 1)}
                      onClick={() =>
                        navigate(
                          `/filters?gen=${index + 1}${currentType ? `&type=${currentType}` : ""}`,
                        )
                      }
                      color="white"
                      _hover={{ bg: "red.500" }}
                    >
                      Gen {index + 1}
                    </Menu.Item>
                  ))}
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
        </Flex>

        <Link to="/captured" _hover={{ textDecoration: "none" }}>
          <Button
            size="sm"
            variant={isActive ? "solid" : "outline"}
            borderRadius="full"
            colorPalette="yellow"
            title="Captured"
          >
            <Image
              src={pokeBall}
              alt="Captured"
              boxSize="16px"
              filter={isActive ? "brightness(1.2)" : "none"}
            />
          </Button>
        </Link>
      </Flex>
    </Box>
  );
};

export default Navbar;
