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
  Select,
  Text,
  ToastId,
  useToast,
  VStack,
} from "@chakra-ui/react";
import SocialLogin from "./SocialLogin";
import { useForm } from "react-hook-form";
import { signUp } from "../api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface IUserSignUp {
  name: string;
  email: string;
  username: string;
  password: string;
  gender: string;
  language: string;
  currency: string;
}

export default function SignUpModal({ isOpen, onClose }: SignUpModalProps) {
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<IUserSignUp>();
  const queryClient = useQueryClient();
  const toast = useToast();
  const ToastId = useRef<ToastId>();
  const mutation = useMutation({
    onMutate: () => {
      ToastId.current = toast({
        title: "Sign upping...",
        status: "loading",
        position: "bottom-right",
      });
    },
    onSuccess: () => {
      if (ToastId.current) {
        toast.update(ToastId.current, {
          title: "Success!",
          description: "Sign up complete.",
          status: "success",
          isClosable: true,
          duration: 6000,
        });
      }
      queryClient.refetchQueries(["me"]);
      onClose();
      reset();
    },
    onError: () => {},
  });
  const onSubmit = async (data: IUserSignUp) => {
    mutation.mutate();
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
            <Select
              placeholder="Please select your gender."
              {...register("gender")}
            >
              <option value={"female"}>Female</option>
              <option value={"male"}>Male</option>
            </Select>
            <Select
              placeholder="Please select your language."
              {...register("language")}
            >
              <option value={"ko"}>Korean</option>
              <option value={"en"}>English</option>
            </Select>
            <Select
              placeholder="Please select your currency"
              {...register("currency")}
            >
              <option value={"krw"}>Won</option>
              <option value={"use"}>Dollar</option>
            </Select>
            {mutation.error ? (
              <Text color={"red.500"} fontSize={"sm"}>
                User already exists.
              </Text>
            ) : null}
          </VStack>
          <Button
            isLoading={mutation.isLoading}
            mt={4}
            type={"submit"}
            colorScheme={"red"}
            w={"100%"}
          >
            Sign up
          </Button>
          <SocialLogin />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
