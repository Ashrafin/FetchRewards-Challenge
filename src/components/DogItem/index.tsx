import { Dog } from "@/types/api.types";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
  Stack,
  Typography
} from "@mui/material";
import { Favorite, FavoriteBorderOutlined } from "@mui/icons-material";
import { useFavorites } from "@/contexts/FavoritesContext";

interface Props {
  dog: Dog;
}

export default function DogItem({ dog }: Props) {
  const { dogIds, handleToggleFavorite } = useFavorites();
  const isDogFavorited = dog.id && dogIds.has(dog.id);

  return (
    <Card elevation={1}>
      <Stack direction="column" sx={{ position: "relative" }}>
        <CardMedia
          image={dog.img}
          sx={{ height: 240 }}
        />
        <IconButton
          aria-label="add to favorites"
          size="medium"
          onClick={() => handleToggleFavorite(dog.id)}
          sx={{
            position: "absolute",
            right: 10,
            bottom: -20,
            backgroundColor:
            "white",
            "&:hover": { backgroundColor: "white" }
        }}>
          {isDogFavorited ? <Favorite color="secondary" /> : <FavoriteBorderOutlined color="secondary" />}
        </IconButton>
      </Stack>
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
  );
}