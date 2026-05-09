import { Center, Image, Text, VStack } from "@chakra-ui/react";
import pokeBall from "../assets/pokeball.svg";

export const Loading = () => {
  return (
    <Center p="50px" w="full" minH="40vh">
      <VStack gap={4}>
        <Image
          src={pokeBall}
          alt="Loading"
          boxSize="60px"
          animation="spin 1s linear infinite"
          css={{
            "@keyframes spin": {
              "0%": { transform: "rotate(0deg)" },
              "100%": { transform: "rotate(360deg)" },
            },
          }}
        />

        <Text
          fontWeight="bold"
          color="red.500"
          css={{
            animation: "pulse 1.5s ease-in-out infinite",
            "@keyframes pulse": {
              "0%, 100%": { opacity: 1 },
              "50%": { opacity: 0.5 },
            },
          }}
        >
          Getting data...
        </Text>
      </VStack>
    </Center>
  );
};
