import {
  pokemonCardsQueryFn,
  pokemonCardsQueryKey,
} from "@/utils/usePokemonCards";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Overview } from "./components/Overview";

export const PokemonCardOverview = async () => {
  const queryClient = new QueryClient();

  // NOTE: we prefetch the pokemon data and hydrate it to the client.
  // we use tanstack query so that we can refetch data from the client
  // to rerender the UI with new pokemon cards.
  await queryClient.prefetchQuery({
    queryKey: [pokemonCardsQueryKey],
    queryFn: pokemonCardsQueryFn,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Overview />
    </HydrationBoundary>
  );
};
