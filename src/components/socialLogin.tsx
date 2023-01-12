import { FaComment, FaGithub } from "react-icons/fa";
import { Box, Button, Divider, HStack, Text, VStack } from "@chakra-ui/react";

export default function SocialLogin() {
  return (
    <Box mb={4}>
      <HStack my={8}>
        <Divider />
        <Text
          textTransform={"uppercase"}
          color={"gray.500"}
          fontSize={"xs"}
          as={"b"}
        >
          or
        </Text>
        <Divider />
      </HStack>
      <VStack>
        <Button leftIcon={<FaGithub />} colorScheme={"gray"} w={"100%"}>
          Continue with Github
        </Button>
        <Button leftIcon={<FaComment />} colorScheme={"yellow"} w={"100%"}>
          Continue with Kakao
        </Button>
      </VStack>
    </Box>
  );
}
