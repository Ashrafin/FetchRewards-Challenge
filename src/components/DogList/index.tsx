import { useSearch } from "@/contexts/SearchContext";
import { Container, Grid2 as Grid } from "@mui/material";
import DogItem from "../DogItem";
import { DogItemSkeleton } from "../Skeletons";

export default function DogList() {
  const { isLoading, results } = useSearch();
  const skeletonsToShow = new Array(25).fill("");

  function _renderDogSkeletons() {
    return skeletonsToShow.map((_, index) => (
      <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
        <DogItemSkeleton />
      </Grid>
    ));
  }

  function _renderDogItems() {
    return results.map((dog) => {
      return (
        <Grid key={dog.id} size={{ xs: 12, sm: 6, md: 4 }}>
          <DogItem key={dog.id} dog={dog} />
        </Grid>
      );
    });
  }

  return (
    <Container sx={{ py: 4 }}>
      <Grid container spacing={{ xs: 3, sm: 3, md: 3 }}>
        {isLoading ? _renderDogSkeletons() : _renderDogItems()}
      </Grid>
    </Container>
  );
}