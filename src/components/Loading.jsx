import { Center, Image, Text, VStack } from "@chakra-ui/react";
import pokeBall from "../assets/pokeball.svg";

export const Loading = () => {
  return (
    <Center p="50px" w="full" minH="40vh">
      <VStack gap={4}>
        <Image src={pokeBall} alt="Loading" boxSize="60px" />

        <Text fontWeight="bold" color="red.500">
          Getting data...
        </Text>
      </VStack>
    </Center>
  );
};
