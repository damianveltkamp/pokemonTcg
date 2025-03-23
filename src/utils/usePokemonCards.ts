import {
  getAllPokemonCards,
  getPaginatedPokemonCards,
} from "@/api/getAllPokemonCards";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export const pokemonCardsQueryKey = "PokemonCards";

export const pokemonCardsQueryFn = () => {
  return getAllPokemonCards();
};

export const usePokemonCards = () => {
  return useQuery({
    queryKey: [pokemonCardsQueryKey],
    queryFn: pokemonCardsQueryFn,
  });
};

export const paginatedPokemonCardsQueryKey = "PaginatedPokemonCards";

export const usePaginatedPokemonCards = () => {
  return useInfiniteQuery({
    queryKey: [paginatedPokemonCardsQueryKey],
    queryFn: ({ pageParam }) => {
      // NOTE: we add 1 to the pageParam since tanstack query starts at page 0
      // the endpoint of tcgdex starts counting from 1.
      return getPaginatedPokemonCards(pageParam + 1);
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage && lastPage.nextCursor,
  });
};
