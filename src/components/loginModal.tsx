import { useForm } from "react-hook-form";
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
  Text,
  VStack,
} from "@chakra-ui/react";
import SocialLogin from "./SocialLogin";
import React, { useState } from "react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface IUser {
  username: string;
  password: string;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUser>();
  const onSubmit = (data: IUser) => {
    console.log(data);
  };
  console.log(errors);
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Log In</ModalHeader>
        <ModalCloseButton />
        <ModalBody as={"form"} onSubmit={handleSubmit(onSubmit)}>
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
                isInvalid={Boolean(errors.username?.message)}
                {...register("username", {
                  required: "Please input your username",
                })}
                variant={"filled"}
                placeholder={"Username"}
              />
              <Text fontSize={"sm"} color={"red.500"}>
                {errors.username?.message}
              </Text>
            </InputGroup>
            <InputGroup>
              <InputLeftElement color={"gray.500"} children={<FaLock />} />
              <Input
                isInvalid={Boolean(errors.password?.message)}
                {...register("password", {
                  required: "Please input your password",
                })}
                type={"password"}
                variant={"filled"}
                placeholder={"Password"}
              />
              <Text fontSize={"sm"} color={"red.500"}>
                {errors.password?.message}
              </Text>
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
