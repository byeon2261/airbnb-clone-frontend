import { FaAirbnb, FaMoon, FaSun } from "react-icons/fa";
import {
  Avatar,
  Box,
  Button,
  HStack,
  IconButton,
  LightMode,
  Stack,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";
import useUser from "../lib/useUser";

export default function Header() {
  const { userLoading, user, isLoggedIn } = useUser();
  const {
    isOpen: isLoginOpen,
    onClose: onLoginClose,
    onOpen: onLoginOpen,
  } = useDisclosure();
  const {
    isOpen: isSignUpOpen,
    onClose: onSignUpClose,
    onOpen: onSignUpOpen,
  } = useDisclosure();
  const { toggleColorMode } = useColorMode();
  const logoColor = useColorModeValue("red.500", "red.200");
  const Icon = useColorModeValue(FaMoon, FaSun);
  return (
    <Stack
      justifyContent={"space-between"}
      alignItems="center"
      px={"40"}
      py={"5"}
      direction={{
        sm: "column",
        md: "row",
      }}
      spacing={{
        sm: 4,
        lg: 0,
      }}
      borderBottomWidth={1}
    >
      <Box color={logoColor}>
        <FaAirbnb size={"48"} />
      </Box>
      <HStack spacing={2}>
        <IconButton
          onClick={toggleColorMode}
          variant={"ghost"}
          aria-label="Toggle dark mode"
          icon={<Icon />}
        />
        {!userLoading ? (
          !isLoggedIn ? (
            <>
              <Button onClick={onLoginOpen}>Log in</Button>
              <LightMode>
                <Button onClick={onSignUpOpen} colorScheme={"red"}>
                  Sign up
                </Button>
              </LightMode>
            </>
          ) : null
        ) : (
          <Avatar size={"md"} />
        )}
      </HStack>
      <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
      <SignUpModal isOpen={isSignUpOpen} onClose={onSignUpClose} />
    </Stack>
  );
}
