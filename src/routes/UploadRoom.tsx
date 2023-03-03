import {
  Box,
  Checkbox,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  Radio,
  RadioGroup,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { FaBed, FaDollarSign } from "react-icons/fa";
import HostOnlyPage from "../components/HostOnlyPage";
import ProtectedPage from "../components/ProtectedPage";

export default function UploadRoom() {
  return (
    <ProtectedPage>
      <HostOnlyPage>
        <Box
          pb={40}
          mt={10}
          px={{
            base: 10,
            lg: 40,
          }}
        >
          <Container>
            <Heading textAlign={"center"}>Upload Room</Heading>
            <VStack spacing={5} mt={5} as={"form"}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input required type={"text"} />
                <FormHelperText>Write the name of your room.</FormHelperText>
              </FormControl>
              <FormControl>
                <FormLabel>Country</FormLabel>
                <Input required type={"text"} />
              </FormControl>
              <FormControl>
                <FormLabel>City</FormLabel>
                <Input required type={"text"} />
              </FormControl>
              <FormControl>
                <FormLabel>Address</FormLabel>
                <Input required type={"text"} />
              </FormControl>
              <FormControl>
                <FormLabel>Price</FormLabel>
                <InputGroup>
                  <InputLeftAddon children={<FaDollarSign />} />
                  <Input type={"number"} placeholder="Dollar" min={0} />
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel>Rooms</FormLabel>
                <InputGroup>
                  <InputLeftAddon children={<FaBed />} />
                  <Input type={"number"} min={0} />
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel>Toilets</FormLabel>
                <InputGroup>
                  <InputLeftAddon children={<FaDollarSign />} />
                  <Input type={"number"} min={0} />
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel>Descriptions</FormLabel>
                <Textarea />
              </FormControl>
              <FormControl>
                <Checkbox>Pets Friendly?</Checkbox>
              </FormControl>
              <FormControl as="fieldset">
                <FormLabel as="legend">Kind of room</FormLabel>
                <RadioGroup defaultValue="entire_place">
                  <HStack spacing="24px">
                    <Radio value="entire_place">Entire Place</Radio>
                    <Radio value="private_room">Private Room</Radio>
                    <Radio value="shared_room">Shared Room</Radio>
                  </HStack>
                </RadioGroup>
                <FormHelperText>
                  What kind of room are you renting?
                </FormHelperText>
              </FormControl>
            </VStack>
          </Container>
        </Box>
      </HostOnlyPage>
    </ProtectedPage>
  );
}
