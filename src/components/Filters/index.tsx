import { FilterType } from "@/types/api.types";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Container,
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Stack
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { useSearch } from "@/contexts/SearchContext";
import { FilterSkeleton } from "../Skeletons";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function Filters() {
  const { isLoading, filters, searchFilters, handleSelectBreeds } = useSearch();

  function handleFilterContent(event: SelectChangeEvent<string[]>) {
    const value = event.target.value;
    handleSelectBreeds(Array.isArray(value) ? value : [value]);
  }

  function _renderFilters() {
    return (
      <Accordion elevation={0}>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="show-filters"
          id="show-filters"
          sx={{ px: 0 }}
        >
          <Typography component="span">Filters</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ px: 0 }}>
          <FormControl size="small" sx={{ minWidth: 200, width: "auto" }}>
            <InputLabel id="breeds-filter">Breeds</InputLabel>
            <Select
              labelId="breeds-filter"
              id="breeds-filter-select"
              multiple
              value={searchFilters[FilterType.BREEDS] ?? []}
              onChange={handleFilterContent}
              input={<OutlinedInput id="select-multiple-chip" label="Breeds" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {(filters[FilterType.BREEDS] ?? []).map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </AccordionDetails>
      </Accordion>
    );
  }

  function _renderFilterSkeletons() {
    return (
      <Stack direction="row" sx={{  }}>
        <FilterSkeleton />
      </Stack>
    );
  }

  return (
    <Container sx={{ my: 3 }}>
      {isLoading ? _renderFilterSkeletons() : _renderFilters()}
    </Container>
  );
}