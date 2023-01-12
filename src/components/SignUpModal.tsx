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
  VStack,
} from "@chakra-ui/react";
import SocialLogin from "./socialLogin";

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SignUpModal({ isOpen, onClose }: SignUpModalProps) {
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Sign up</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack>
            <InputGroup>
              <InputLeftElement color={"gray.500"} children={<FaIdBadge />} />
              <Input variant={"filled"} placeholder={"Name"} />
            </InputGroup>
            <InputGroup>
              <InputLeftElement color={"gray.500"} children={<FaEnvelope />} />
              <Input variant={"filled"} placeholder={"Email"} />
            </InputGroup>
            <InputGroup>
              <InputLeftElement color={"gray.500"} children={<FaUserEdit />} />
              <Input variant={"filled"} placeholder={"Username"} />
            </InputGroup>
            <InputGroup>
              <InputLeftElement color={"gray.500"} children={<FaLock />} />
              <Input variant={"filled"} placeholder={"Password"} />
            </InputGroup>
            <Button mt={4} colorScheme={"red"} w={"100%"}>
              Sign up
            </Button>
          </VStack>
          <SocialLogin />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
