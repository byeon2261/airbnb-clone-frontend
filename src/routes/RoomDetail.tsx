import {
  Box,
  Button,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  Skeleton,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { FaRegHeart, FaShareSquare, FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { getRoom } from "../api";
import { IRoomDetail } from "../type";

export default function RoomDetail() {
  const { roomPk } = useParams();
  const { isLoading, data } = useQuery<IRoomDetail>([`rooms`, roomPk], getRoom);
  const gray = useColorModeValue("gray.600", "gray.300");
  return (
    <Box
      mt={10}
      px={{
        base: 10,
        lg: 40,
      }}
      // columnGap={4}
      // rowGap={8}
    >
      <Skeleton h={"43px"} w={"50%"} isLoaded={!isLoading}>
        <Heading>{data?.name}</Heading>
      </Skeleton>
      <Skeleton h={"24px"} w={"100%"} isLoaded={!isLoading}>
        <Grid gap={2} templateColumns={"6fr 1fr"} mt={2}>
          <HStack _hover={{ color: "red.100" }} spacing={1}>
            <FaStar size={15} />
            <Text>{data?.rating}</Text>
            <Text fontSize={"sm"} color={gray}>
              . {data?.city}, {data?.country}
            </Text>
          </HStack>
          <HStack>
            <Button variant={"unstyled"}>
              <HStack>
                <FaShareSquare />
                <Text>Share</Text>
              </HStack>
            </Button>
            <Button variant={"unstyled"}>
              <HStack>
                <FaRegHeart />
                <Text> Save</Text>
              </HStack>
            </Button>
          </HStack>
        </Grid>
      </Skeleton>
      <Grid
        gap={3}
        mt={8}
        rounded="lg"
        overflow={"hidden"}
        h="60vh"
        templateRows={"1fr 1fr"}
        templateColumns={"repeat(4, 1fr)"}
      >
        {[0, 1, 2, 3, 4].map((index) => (
          <GridItem
            colSpan={index === 0 ? 2 : 1}
            rowSpan={index === 0 ? 2 : 1}
            overflow={"hidden"}
            key={index}
          >
            <Skeleton h={"100%"} w={"100%"} isLoaded={!isLoading}>
              <Image
                objectFit={"cover"}
                w={"100%"}
                h={"100%"}
                src={data?.photos[index].file}
              />
            </Skeleton>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
}
