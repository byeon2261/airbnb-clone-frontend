import { Box, Skeleton, SkeletonText } from "@chakra-ui/react";

export default function RoomSkeleton() {
  return (
    <Box>
      <Skeleton rounded={"2xl"} mb={8} h="260" />
      <SkeletonText noOfLines={2} w={"90%"} mb={5} />
      <SkeletonText noOfLines={1} w={"40%"} />
    </Box>
  );
}
