import { Box, Grid, Skeleton, SkeletonText } from "@chakra-ui/react";
import Room from "../components/Room";

export default function Home() {
  return (
    <Grid
      mt={10}
      px={{
        base: 10,
        lg: 40,
      }}
      columnGap={4}
      rowGap={8}
      templateColumns={{
        base: "1fr",
        sm: "1fr",
        md: "1fr 1fr",
        lg: "repeat(3, 1fr)",
        xl: "repeat(4, 1fr)",
        "2xl": "repeat(5, 1fr)",
      }}
    >
      <Box>
        <Skeleton rounded={"2xl"} mb={8} h="260" />
        <SkeletonText noOfLines={2} w={"90%"} mb={5} />
        <SkeletonText noOfLines={1} w={"40%"} />
      </Box>
      <Room />
    </Grid>
  );
}
