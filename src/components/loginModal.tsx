import { FaUserEdit, FaLock } from "react-icons/fa";
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
} from "@chakra-ui/react";
import SocialLogin from "./SocialLogin";
import React, { useState } from "react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const onChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    console.log(event.currentTarget);
    const { name, value } = event.currentTarget;
    if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = (event: React.SyntheticEvent<HTMLDivElement>) => {
    event.preventDefault();
    console.log(username, password);
  };
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Log In</ModalHeader>
        <ModalCloseButton />
        <ModalBody as={"form"} onSubmit={onSubmit}>
          <VStack>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color={"gray.500"}>
                    <FaUserEdit />
                  </Box>
                }
              />
              <Input
                required
                name="username"
                onChange={onChange}
                value={username}
                variant={"filled"}
                placeholder={"Username"}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement color={"gray.500"} children={<FaLock />} />
              <Input
                required
                name="password"
                onChange={onChange}
                value={password}
                type={"password"}
                variant={"filled"}
                placeholder={"Password"}
              />
            </InputGroup>
            <Button mt={4} type="submit" colorScheme={"red"} w={"100%"}>
              Log In
            </Button>
          </VStack>
          <SocialLogin />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
