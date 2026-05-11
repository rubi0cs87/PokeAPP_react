import { useState, useEffect, useContext } from "react";
import {
  Box,
  Heading,
  Stack,
  Flex,
  Text,
  Slider,
  Button,
  NativeSelect,
  Image,
  createToaster,
  Toaster,
  Toast,
} from "@chakra-ui/react";
import { PokemonContext } from "../context/PokemonContext";
import { calculateCaptureRate } from "../utils/captureRatio";
import pokeBall from "../assets/pokeball.svg";

const toaster = createToaster({
  placement: "top",
  pauseOnPageIdle: true,
  max: 3,
});

const activeToastIds = [];

const showToast = (options) => {
  if (activeToastIds.length >= 3) {
    toaster.dismiss(activeToastIds.shift());
  }
  const id = toaster.create(options);
  activeToastIds.push(id);
};

const CaptureSimulator = ({ pokemonData, pokemonBaseCaptureRate }) => {
  const { toggleCaptured, captured } = useContext(PokemonContext);
  const [currentHP, setCurrentHP] = useState(100);
  const [status, setStatus] = useState(1);
  const [ballMultiplier, setBallMultiplier] = useState(1);
  const [captureChance, setCaptureChance] = useState(0);

  const isCaptured = captured.some((p) => p.id === pokemonData.id);

  useEffect(() => {
    if (ballMultiplier === 999) {
      setCaptureChance(100);
    } else {
      const prob = calculateCaptureRate(
        100,
        currentHP,
        pokemonBaseCaptureRate,
        status,
        ballMultiplier,
      );
      setCaptureChance(prob);
    }
  }, [currentHP, status, ballMultiplier, pokemonBaseCaptureRate]);

  const handleLaunchBall = () => {
    if (isCaptured) {
      toggleCaptured(pokemonData);
      showToast({
        title: `${pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)} was released!`,
        description: "The Pokémon has been removed from your captured list.",
        type: "info",
        duration: 1500,
      });
      return;
    }

    const random = Math.random() * 100;
    if (random <= captureChance) {
      showToast({
        title: `Gotcha! ${pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)} was caught!`,
        description: "It has been sent to your captured list.",
        type: "success",
        duration: 1500,
      });
      toggleCaptured(pokemonData);
    } else {
      showToast({
        title: `Oh no! ${pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)} broke free!`,
        description: "The Pokémon escaped. Try again!",
        type: "error",
        duration: 1500,
      });
    }
  };

  return (
    <>
      <Box
        p={6}
        border="2px solid"
        borderColor="green.400"
        borderRadius="2xl"
        bg="green.50/50"
      >
        <Heading size="sm" mb={4} textAlign="center" color="green.700">
          Capture Simulator
        </Heading>

        <Stack gap={5}>
          <Box>
            <Flex justify="space-between" mb={2}>
              <Text fontSize="sm" fontWeight="bold">
                Target HP: {currentHP}%
              </Text>
            </Flex>
            <Slider.Root
              defaultValue={[100]}
              max={100}
              min={1}
              onValueChange={(details) => setCurrentHP(details.value[0])}
              colorPalette={
                currentHP > 50 ? "green" : currentHP > 20 ? "yellow" : "red"
              }
            >
              <Slider.Control>
                <Slider.Track bg="gray.200">
                  <Slider.Range />
                </Slider.Track>
                <Slider.Thumb index={0} />
              </Slider.Control>
            </Slider.Root>
          </Box>
          <Box>
            <Text
              fontSize="xs"
              fontWeight="bold"
              mb={2}
              textAlign="left"
              color="gray.600"
            >
              Status Condition:
            </Text>

            <NativeSelect.Root size="sm">
              <NativeSelect.Field
                value={status}
                onChange={(e) => setStatus(Number(e.target.value))}
              >
                <option value="1">Nothing</option>
                <option value="2.5">Sleep/Frozen (x2.5)</option>
                <option value="1.5">Paralyzed/Poisoned (x1.5)</option>
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
          </Box>

          <Box>
            <Text fontSize="xs" fontWeight="bold" mb={2}>
              Choose Ball:
            </Text>
            <NativeSelect.Root size="sm">
              <NativeSelect.Field
                onChange={(e) => setBallMultiplier(Number(e.target.value))}
              >
                <option value="1">Poké Ball (x1)</option>
                <option value="1.5">Super Ball (x1.5)</option>
                <option value="2">Ultra Ball (x2)</option>
                <option value="999">Master Ball (100%)</option>
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
          </Box>

          <Box
            bg="white"
            p={4}
            borderRadius="xl"
            border="1px solid"
            borderColor="green.200"
            textAlign="center"
          >
            <Text fontSize="xs" color="gray.500" fontWeight="bold">
              CHANCE: {captureChance}%
            </Text>

            <Button
              colorPalette={isCaptured ? "red" : "green"}
              variant={isCaptured ? "outline" : "solid"}
              width="full"
              mt={3}
              onClick={handleLaunchBall}
            >
              <Image src={pokeBall} boxSize="24px" alt="Throw Pokeball" />
              {isCaptured ? "Release" : "Throw Ball!"}
            </Button>
          </Box>
        </Stack>
      </Box>
      <Toaster toaster={toaster}>
        {(toast) => (
          <Toast.Root key={toast.id} type={toast.type}>
            <Toast.Title>{toast.title}</Toast.Title>
            <Toast.Description>{toast.description}</Toast.Description>
            <Toast.CloseTrigger />
          </Toast.Root>
        )}
      </Toaster>
    </>
  );
};

export default CaptureSimulator;
