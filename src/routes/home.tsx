import { Grid } from "@chakra-ui/react";
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
      {[
        1, 2, 3, 4, 5, 6, 7, 7, 8, 9, 3, 4, 5, 3, 4, 3, 4, 3, 4, 3, 3, 4, 3, 4,
        5, 34, 4, 5, 6, 3,
      ].map((index) => (
        <Room key={index} />
      ))}
    </Grid>
  );
}
