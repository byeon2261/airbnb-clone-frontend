import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  Skeleton,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { FaRegHeart, FaShareSquare, FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { getRoom, getRoomReviews } from "../api";
import { IReview, IRoomDetail } from "../type";

export default function RoomDetail() {
  const { roomPk } = useParams();
  const { isLoading, data } = useQuery<IRoomDetail>([`rooms`, roomPk], getRoom);
  const gray = useColorModeValue("gray.600", "gray.300");
  const { data: reviewsData } = useQuery<IReview[]>(
    [`rooms`, roomPk, `reviews`],
    getRoomReviews
  );
  return (
    <Box
      mt={10}
      px={{
        base: 10,
        lg: 40,
      }}
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
              {data?.photos && data.photos.length > 0 ? (
                <Image
                  objectFit={"cover"}
                  w={"100%"}
                  h={"100%"}
                  src={data?.photos[index].file}
                />
              ) : null}
            </Skeleton>
          </GridItem>
        ))}
      </Grid>
      <HStack w={"40%"} justifyContent={"space-between"} mt={10}>
        <VStack alignItems={"flex-start"}>
          <Skeleton h={"29px"} isLoaded={!isLoading}>
            <Heading fontSize={"2xl"}>
              House Hosted by {data?.owner.name}
            </Heading>
          </Skeleton>
          <Skeleton h={"24px"} isLoaded={!isLoading}>
            <HStack justifyContent={"flex-start"} w={"100%"}>
              <Text>
                {data?.toilets} toilet{data?.toilets === 1 ? "" : "s"}
              </Text>
              <Text>•</Text>
              <Text>
                {data?.rooms} room{data?.rooms === 1 ? "" : "s"}
              </Text>
            </HStack>
          </Skeleton>
        </VStack>
        <Avatar name={data?.owner.name} size={"xl"} src={data?.owner.avatar} />
      </HStack>
      <Box mt={10}>
        <Heading mb={5} fontSize={"2xl"}>
          <Skeleton w={"40%"} isLoaded={!isLoading}>
            <HStack>
              <FaStar />
              <Text>{data?.rating}</Text>•
              <Text>
                {reviewsData?.length} review
                {reviewsData?.length === 1 ? "" : "s"}
              </Text>
            </HStack>
          </Skeleton>
        </Heading>
        <Container mt={16} maxW="container.lg" marginX={"none"}>
          <Grid gap={10} templateColumns={"1fr 1fr"}>
            {reviewsData?.map((review, index) => (
              <VStack alignItems={"flex-start"} key={index}>
                <HStack>
                  <Avatar
                    name={review.user.name}
                    size={"md"}
                    src={review.user.avatar}
                  />
                  <VStack spacing={0} alignItems={"flex-start"} w={"100%"}>
                    <Heading fontSize={"md"}>{review.user.name}</Heading>
                    <HStack spacing={1}>
                      <FaStar size={"12px"} />
                      <Text>{review.rating}</Text>
                    </HStack>
                  </VStack>
                </HStack>
                <Text>{review.payload}</Text>
              </VStack>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
