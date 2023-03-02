import { Heading, Spinner, Text, useToast, VStack } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { githubLogin } from "../api";

export default function GithubConfirm() {
  const { search } = useLocation();
  const toast = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutation = useMutation(githubLogin, {
    onSuccess: () => {
      toast({
        status: "success",
        position: "bottom-right",
        title: "Welcome!",
        description: "Happy to day",
        isClosable: true,
        duration: 6000,
      });
      queryClient.refetchQueries(["me"]);
      navigate("/");
    },
    onError: () => {
      toast({
        status: "error",
        position: "bottom-right",
        title: "Social login is error..",
        isClosable: true,
        duration: 6000,
      });
      navigate("/");
    },
  });
  const confirmLogin = () => {
    const params = new URLSearchParams(search);
    const code = params.get("code");
    if (code) {
      mutation.mutateAsync(code);
    }
  };
  useEffect(() => {
    confirmLogin();
  }, []);
  return (
    <VStack justifyContent={"center"} mt="40">
      <Heading>Processing log in.</Heading>
      <Text>Don't go anything please...</Text>
      <Spinner size="lg" />
    </VStack>
  );
}
