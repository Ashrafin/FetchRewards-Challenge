import { useEffect } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Grid2 as Grid,
  IconButton,
  Stack,
  Typography
} from "@mui/material";
import SEO from "@/components/SEO";
import { useFavorites } from "@/contexts/FavoritesContext";
import { ArrowBack } from "@mui/icons-material";
import { DogItemSkeleton, MatchTextSkeleton } from "@/components/Skeletons";

export default function Match() {
  const router = useRouter();
  const { isLoading, matchedDogs, handleGetMatchedDogId } = useFavorites();
  const dog = matchedDogs[0];
  const isAtMatchPage: boolean = router.asPath === "/match";

  function handleNavigateToSearch() {
    router.push("/search");
  }

  function _renderMatchedDogInfo() {
    if (matchedDogs.length < 1) return <></>;

    return (
      <>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card elevation={1}>
            <CardMedia
              image={dog.img}
              sx={{ height: 240 }}
            />
            <CardContent sx={{ p: 0, "&:last-child": { pb: 1 } }}>
              <Box sx={{ py: 1, px: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                  {dog.name}
                </Typography>
              </Box>
              <Box sx={{ py: 1, px: 2 }}>
                <Typography gutterBottom variant="body2">
                  Breed - Age - Zip Code
                </Typography>
                <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                  <Chip label={dog.breed} size="medium" />
                  <Chip label={dog.age} size="medium" />
                  <Chip label={dog.zip_code} size="medium" />
                </Stack>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </>
    );
  }

  function _renderMatchDogSkeleton() {
    if (matchedDogs.length < 1) return <></>;

    return (
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <DogItemSkeleton />
      </Grid>
    );
  }

  useEffect (() => {
    if (isAtMatchPage) {
      handleGetMatchedDogId();
    }
  }, [isAtMatchPage]);

  return (
    <>
      <SEO pageTitle="Fetch app match" pageDescription="Fetch app match page" />
      <Container sx={{ my: 3 }}>
        <Box sx={{ display: "flex", mb: 4 }}>
          <IconButton aria-label="back to search page" onClick={handleNavigateToSearch}>
            <ArrowBack />
          </IconButton>
        </Box>
        <Grid
          container
          size={{
            xs: 12,
            sm: 12,
            md: 12
          }}
          sx={{
            display: "flex",
            justifyContent: "center"
        }}>
          <Grid
            size={{
              xs: 12,
              md: 12
            }}
            sx={{
              display: "flex",
              justifyContent: "center",
              textAlign: "center"
          }}>
            {isLoading ? <MatchTextSkeleton /> : (
              <Typography variant="h4" sx={{ mb: 4, fontWeight: "600" }}>
                Congratulations, you found a match!
              </Typography>
            )}
          </Grid>
          {isLoading ? _renderMatchDogSkeleton() : _renderMatchedDogInfo()}
        </Grid>
      </Container>
    </>
  );
}