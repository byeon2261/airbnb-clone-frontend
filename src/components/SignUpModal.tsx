import { FaUserEdit, FaLock, FaIdBadge, FaEnvelope } from "react-icons/fa";
import {
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
  useToast,
  VStack,
} from "@chakra-ui/react";
import SocialLogin from "./SocialLogin";
import { useForm } from "react-hook-form";
import { signUp } from "../api";

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface IUserSignUp {
  name: string;
  email: string;
  username: string;
  password: string;
}

export default function SignUpModal({ isOpen, onClose }: SignUpModalProps) {
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<IUserSignUp>();
  const toast = useToast();
  const onSubmit = async (data: IUserSignUp) => {
    const toastId = toast({
      title: "Sign upping...",
      status: "loading",
      position: "bottom-right",
    });
    await signUp(data);
    onClose();
    reset();
    toast.update(toastId, {
      title: "Success!",
      description: "Sign up complete.",
      status: "success",
      isClosable: true,
      duration: 6000,
    });
  };
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Sign up</ModalHeader>
        <ModalCloseButton />
        <ModalBody as={"form"} onSubmit={handleSubmit(onSubmit)}>
          <VStack>
            <InputGroup>
              <InputLeftElement color={"gray.500"} children={<FaIdBadge />} />
              <Input
                isInvalid={Boolean(errors.name?.message)}
                {...register("name", { required: "Please input your name" })}
                variant={"filled"}
                placeholder={"Name"}
              />
              <Text fontSize={"sm"} color={"red.500"}>
                {errors.name?.message}
              </Text>
            </InputGroup>
            <InputGroup>
              <InputLeftElement color={"gray.500"} children={<FaEnvelope />} />
              <Input
                isInvalid={Boolean(errors.email?.message)}
                {...register("email", { required: "Please input your email" })}
                variant={"filled"}
                placeholder={"Email"}
              />
              <Text fontSize={"sm"} color={"red.500"}>
                {errors.email?.message}
              </Text>
            </InputGroup>
            <InputGroup>
              <InputLeftElement color={"gray.500"} children={<FaUserEdit />} />
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
            <Button mt={4} type={"submit"} colorScheme={"red"} w={"100%"}>
              Sign up
            </Button>
          </VStack>
          <SocialLogin />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
