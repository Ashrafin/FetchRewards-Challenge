import { PropsWithChildren } from "react";
import { useRouter } from "next/router";
import { SearchQueryParam, SortDirection, SortField } from "@/types/api.types";
import {
  Button,
  Container,
  FormControl,
  Grid2 as Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  Stack,
} from "@mui/material";
import { PaginationSkeleton, SortSkeleton } from "@/components/Skeletons";
import { getCurrentPage, getTotalPages } from "@/utils/pagination";
import { useSearch } from "@/contexts/SearchContext";
import { useFavorites } from "@/contexts/FavoritesContext";

export function PageNaviation({ children }: PropsWithChildren) {
  const { isLoading, totalResults, searchParams, handleClickPage, handleSelectSort } = useSearch();
  const { dogIds } = useFavorites();
  const router = useRouter();

  const currentPage = getCurrentPage(parseInt(searchParams[SearchQueryParam.FROM]));
  const totalPages = getTotalPages(totalResults);

  const isFirstPage = currentPage - 1 <= 0;
  const isLastPage = currentPage + 1 >= totalPages;

  function _renderPagination() {
    return (
      <Grid
        size={{
          xs: 12,
          sm: 12,
          md: 6
        }}
        sx={{
          mb: { xs: 4, md: 0 }
      }}>
        <Pagination
          page={currentPage}
          count={totalPages}
          shape="rounded"
          size="medium"
          hidePrevButton={isFirstPage}
          hideNextButton={isLastPage}
          onChange={(_, page) => {
            handleClickPage(page);
          }}
        />
      </Grid>
    );
  }

  function _renderSortField() {
    return (
      <FormControl size="small" sx={{ mr: 2 }}>
        <InputLabel id="sort-by">Sort By</InputLabel>
        <Select
          labelId="sort-by"
          id="sort-by-select"
          value={getSortField()}
          label="Sort By"
          onChange={handleChangeSortField}
        >
          <MenuItem value={SortField.AGE}>Age</MenuItem>
          <MenuItem value={SortField.BREED}>Breed</MenuItem>
          <MenuItem value={SortField.NAME}>Name</MenuItem>
        </Select>
      </FormControl>
    );
  }

  function _renderSortDirection() {
    return (
      <FormControl size="small" sx={{ mr: 2 }}>
        <InputLabel id="sort-order">Sort Order</InputLabel>
        <Select
          labelId="sort-order"
          id="sort-order-select"
          value={getSortDirection()}
          label="Sort Order"
          onChange={handleChangeSortDirection}
        >
          <MenuItem value={SortDirection.ASC}>Ascending</MenuItem>
          <MenuItem value={SortDirection.DESC}>Descending</MenuItem>
        </Select>
      </FormControl>
    );
  }

  function _renderPaginationSkeletons() {
    return (
      <Grid
        size={{
          xs: 12,
          sm: 12,
          md: 6
        }}
        sx={{
          mb: { xs: 4, md: 0 }
      }}>
        <PaginationSkeleton />
      </Grid>
    );
  }

  function _renderSortSkeletons() {
    return (
      <Grid
        size={{
          xs: 12,
          sm: 12,
          md: 6
        }}
        sx={{
          display: "flex",
          justifyContent: { sm: "flex-start", md: "flex-end" }
      }}>
        <Stack direction="row" sx={{ width: "100%", justifyContent: "space-between" }}>
          <SortSkeleton />
          <SortSkeleton />
          <SortSkeleton />
        </Stack>
      </Grid>
    );
  }

  function getSortField() {
    return searchParams[SearchQueryParam.SORT].split(":")[0];
  }

  function getSortDirection() {
    return searchParams[SearchQueryParam.SORT].split(":")[1];
  }

  function handleChangeSortField(event: SelectChangeEvent) {
    const sortField = event.target.value;
    const [, sortDirection] = searchParams[SearchQueryParam.SORT].split(":");
    handleSelectSort(`${sortField}:${sortDirection}`);
  }

  function handleChangeSortDirection(event: SelectChangeEvent) {
    const sortDirection = event.target.value;
    const [sortField] = searchParams[SearchQueryParam.SORT].split(":");
    handleSelectSort(`${sortField}:${sortDirection}`);
  }

  function handleNavigateToMatches() {
    router.push("/match");
  }

  return (
    <>
      <Container sx={{ pt: 2 }}>
        <Grid
          container
          size={{
            xs: 12,
            sm: 12,
            md: 12
          }}
          sx={{
            display: "flex",
            alignItems: "center"
        }}>
          {isLoading ? _renderPaginationSkeletons() : _renderPagination()}
          <Grid
            size={{
              xs: 12,
              sm: 12,
              md: 6
            }}
            sx={{
              display: "flex",
              justifyContent: { sm: "flex-start", md: "flex-end" }
          }}>
            {isLoading ? _renderSortSkeletons() : (
              <>
                {_renderSortField()}
                {_renderSortDirection()}
                <Button
                  variant="contained"
                  disableElevation
                  disabled={!dogIds.size}
                  onClick={handleNavigateToMatches}
                >
                  Find Match
                </Button>
              </>
            )}
          </Grid>
        </Grid>
      </Container>
      {children}
      <Container>
        <Grid
          container
          size={{
            xs: 12,
            sm: 12,
            md: 12
          }}
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            my: 3,
            "& > div": { display: "flex", alignItems: "center", justifyContent: "center" }
          }}>
          {isLoading ? _renderPaginationSkeletons() : _renderPagination()}
        </Grid>
      </Container>
    </>
  );
}