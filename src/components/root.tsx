import {
  Box,
  Button,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { FaAirbnb, FaMoon, FaUserEdit, FaLock } from "react-icons/fa";

export default function Root() {
  const { isOpen, onClose, onOpen } = useDisclosure(); // react훅(chakra UI)
  return (
    <Box>
      <HStack
        justifyContent={"space-between"}
        px={"5"}
        py={"10"}
        borderBottomWidth={1}
      >
        <Box color={"red.500"}>
          <FaAirbnb size={"48"} />
        </Box>
        <HStack spacing={2}>
          <IconButton
            variant={"ghost"}
            aria-label="Toggle dark mode"
            icon={<FaMoon />}
          />
          <Button onClick={onOpen}>Log in</Button>
          <Button colorScheme={"red"}>Sign in</Button>
        </HStack>
        <Modal onClose={onClose} isOpen={isOpen}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Log In</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack>
                <InputGroup>
                  <InputLeftElement
                    color={"gray.500"}
                    children={<FaUserEdit />}
                  />
                  <Input variant={"filled"} placeholder={"Username"} />
                </InputGroup>
                <InputGroup>
                  <InputLeftElement color={"gray.500"} children={<FaLock />} />
                  <Input variant={"filled"} placeholder={"Password"} />
                </InputGroup>
                <Button mt={4} colorScheme={"red"} w={"100%"}>
                  Log In
                </Button>
              </VStack>
            </ModalBody>
          </ModalContent>
        </Modal>
      </HStack>
      <Outlet />
    </Box>
  );
}
