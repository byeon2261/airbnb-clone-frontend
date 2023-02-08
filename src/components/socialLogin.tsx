import { FaComment, FaGithub } from "react-icons/fa";
import { Box, Button, Divider, HStack, Text, VStack } from "@chakra-ui/react";

export default function SocialLogin() {
  const githubParams = {
    client_id: "f61c955f466d92d1cac9",
    scope: "read:user,user:email",
  };
  const githubParamsString = new URLSearchParams(githubParams).toString();

  const kakaoParams = {
    client_id: "f4fdce8bfd733f3368f97c47a87266b6",
    redirect_uri: "http://127.0.0.1:3000/api/v2/social/kakao",
    response_type: "code",
  };
  const kakaoParamsString = new URLSearchParams(kakaoParams).toString();
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
        <Button
          as={"a"}
          href={`https://github.com/login/oauth/authorize?${githubParamsString}`}
          leftIcon={<FaGithub />}
          colorScheme={"gray"}
          w={"100%"}
        >
          Continue with Github
        </Button>
        <Button
          as={"a"}
          href={`https://kauth.kakao.com/oauth/authorize?${kakaoParamsString}`}
          leftIcon={<FaComment />}
          colorScheme={"yellow"}
          w={"100%"}
        >
          Continue with Kakao
        </Button>
      </VStack>
    </Box>
  );
}
