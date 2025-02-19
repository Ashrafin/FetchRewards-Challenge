import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState
} from "react";
import {
  Breed,
  Dog,
  FilterType,
  SearchQueryParam,
  SearchResult,
  SortDirection,
  SortField
} from "@/types/api.types";
import { API } from "@/utils/api";
import { ITEMS_PER_PAGE } from "@/utils/pagination";

interface ISearchContext {
  filters: Partial<Record<FilterType, string[]>>;
  results: Dog[];
  isLoading: boolean;
  totalResults: number;
  searchFilters: Partial<Record<FilterType, string[]>>;
  searchParams: Record<SearchQueryParam, string>;
  handleClickPage(page: number): void;
  handleSelectSort(sort: string): void;
  handleSelectBreeds(breeds: string[]): void;
}

const SearchContext = createContext<ISearchContext>({
  filters: {},
  results: [],
  isLoading: true,
  totalResults: 0,
  searchFilters: {
    [FilterType.BREEDS]: [],
  },
  searchParams: {
    [SearchQueryParam.SIZE]: `${ITEMS_PER_PAGE}`,
    [SearchQueryParam.FROM]: "0",
    [SearchQueryParam.SORT]: `${SortField.BREED}:${SortDirection.ASC}`
  },
  handleClickPage: () => {},
  handleSelectSort: () => {},
  handleSelectBreeds: () => {},
});

export function useSearch() {
  const context = useContext(SearchContext);

  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }

  return context;
}

export function SearchProvider({ children }: PropsWithChildren) {
  const [filters, setFilters] = useState<ISearchContext["filters"]>({});
  const [results, setResults] = useState<ISearchContext["results"]>([]);
  const [totalResults, setTotalResults] = useState<ISearchContext["totalResults"]>(0);
  const [isLoading, setIsLoading] = useState<ISearchContext["isLoading"]>(true);
  const [searchFilters, setSearchFilters] = useState<ISearchContext["searchFilters"]>({
    [FilterType.BREEDS]: [],
  });
  const [searchParams, setSearchParams] = useState<ISearchContext["searchParams"]>({
    [SearchQueryParam.SIZE]: `${ITEMS_PER_PAGE}`,
    [SearchQueryParam.FROM]: "0",
    [SearchQueryParam.SORT]: `${SortField.BREED}:${SortDirection.ASC}`
  });

  useEffect(() => {
    handleGetBreeds();
  }, []);

  useEffect(() => {
    handleFetchDogs();
  }, [
    ...Object.values(searchFilters),
    ...Object.values(searchParams),
  ]);

  function handleClickPage(page: number) {
    const from = (page - 1) * ITEMS_PER_PAGE;
    setSearchParams({ ...searchParams, [SearchQueryParam.FROM]: `${from}` });
  }

  function handleSelectSort(sort: string) {
    setSearchParams({ ...searchParams, [SearchQueryParam.SORT]: sort });
  }

  function handleSelectBreeds(breeds: string[]) {
    setSearchFilters({
      ...searchFilters,
      [FilterType.BREEDS]: breeds.sort((a, b) => a.localeCompare(b))
    });
  }

  async function handleFetchDogs() {
    try {
      setIsLoading(true);
      const searchResponse = await API.get<SearchResult>("/dogs/search", {
        params: {
          ...searchParams,
          ...Object.entries(searchFilters).reduce((obj, [key, value]) => ({
            ...obj,
            ...(value.length && { [key]: value })
          }), {}),
        }
      });
      const searchResult = searchResponse.data;
      const { resultIds, total } = searchResult;
      const dogsResponse = await API.post<Dog[]>("/dogs", resultIds);
      const dogs = dogsResponse.data;
      setResults(dogs);
      setTotalResults(total);
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    }
  }

  async function handleGetBreeds() {
    try {
      const response = await API.get<Breed[]>("/dogs/breeds");
      const breeds = response.data;
      setFilters({
        ...filters,
        [FilterType.BREEDS]: breeds,
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <SearchContext.Provider value={{
      filters,
      results,
      isLoading,
      totalResults,
      searchFilters,
      searchParams,
      handleClickPage,
      handleSelectSort,
      handleSelectBreeds,
    }}>
      {children}
    </SearchContext.Provider>
  );
}