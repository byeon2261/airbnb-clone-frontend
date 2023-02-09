import {
  Heading,
  Spinner,
  Text,
  Toast,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { kakaoLogin } from "../api";

export default function KakaoConfirm() {
  const { search } = useLocation();
  const toast = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const confirmLogin = async () => {
    const params = new URLSearchParams(search);
    const code = params.get("code");
    if (code) {
      const status = await kakaoLogin(code);
      if (status == 200) {
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
      }
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
