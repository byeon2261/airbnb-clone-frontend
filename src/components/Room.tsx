import { FaStar, FaRegHeart } from "react-icons/fa";
import {
  Box,
  Button,
  Grid,
  HStack,
  Image,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { IRoomProps } from "../type";

export default function Room({
  imgUrl,
  name,
  rating,
  city,
  country,
  price,
  pk,
}: IRoomProps) {
  const gray = useColorModeValue("gray.600", "gray.300");
  return (
    <Link to={`/rooms/${pk}`}>
      <VStack alignItems={"flex-start"}>
        <Box position={"relative"} overflow={"hidden"} mb={3} rounded={"3xl"}>
          <Image minH="260" src={imgUrl} />
          <Button
            variant={"unstyled"}
            position="absolute"
            top={2}
            right={0}
            color="white"
          >
            <FaRegHeart size="20px" />
          </Button>
        </Box>
        <Box w={"100%"}>
          <Grid gap={2} templateColumns={"6fr 1fr"}>
            <Text display={"block"} as="b" noOfLines={1} fontSize="md">
              {name}
            </Text>
            <HStack _hover={{ color: "red.100" }} spacing={1}>
              <FaStar size={15} />
              <Text>{rating}</Text>
            </HStack>
          </Grid>
          <Text fontSize={"sm"} color={gray}>
            {city}, {country}
          </Text>
        </Box>
        <Text fontSize={"sm"} color={gray}>
          <Text as="b">${price}</Text> / night
        </Text>
      </VStack>
    </Link>
  );
}
