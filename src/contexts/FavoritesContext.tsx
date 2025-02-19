import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState
} from "react";
import { Dog, MatchResult } from "@/types/api.types";
import { API } from "@/utils/api";

interface IFavoritesContext {
  dogIds: Set<Dog["id"]>;
  matchedDogId: Dog["id"];
  matchedDogs: Dog[];
  isLoading: boolean;
  handleToggleFavorite(dogId: Dog["id"]): void;
  handleGetMatchedDogId(): Promise<void>;
  handleGetDogs(): Promise<void>;
}

const FavoritesContext = createContext<IFavoritesContext>({
  dogIds: new Set<Dog["id"]>(),
  matchedDogId: "",
  matchedDogs: [],
  isLoading: true,
  handleToggleFavorite: () => { },
  handleGetMatchedDogId: async () => { },
  handleGetDogs: async () => { }
});

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }

  return context;
}

export function FavoritesProvider({ children }: PropsWithChildren) {
  const [dogIds, setDogIds] = useState<IFavoritesContext["dogIds"]>(new Set());
  const [matchedDogId, setMatchedDogId] = useState<IFavoritesContext["matchedDogId"]>("");
  const [matchedDogs, setMatchedDogs] = useState<IFavoritesContext["matchedDogs"]>([]);
  const [isLoading, setIsLoading] = useState<IFavoritesContext["isLoading"]>(true);

  useEffect (() => {
    if (matchedDogId) {
      handleGetDogs();
    }
  }, [matchedDogId]);

  function handleToggleFavorite(dogId: Dog["id"]) {
    const dogIdsCopy = new Set(dogIds);

    if (dogIdsCopy.has(dogId)) {
      dogIdsCopy.delete(dogId);
    } else {
      dogIdsCopy.add(dogId);
    }

    setDogIds(dogIdsCopy);
  }

  async function handleGetMatchedDogId() {
    try {
      const response = await API.post<MatchResult>("/dogs/match", Array.from(dogIds));
      const match = response.data.match;
      setMatchedDogId(match);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleGetDogs() {
    try {
      setIsLoading(true);
      const response = await API.post<Dog[]>("/dogs", [matchedDogId]);
      const dogs = response.data;
      setMatchedDogs(dogs);
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    }
  }

  return (
    <FavoritesContext.Provider value={{
      dogIds,
      matchedDogId,
      matchedDogs,
      isLoading,
      handleToggleFavorite,
      handleGetMatchedDogId,
      handleGetDogs
    }}>
      {children}
    </FavoritesContext.Provider>
  );
}