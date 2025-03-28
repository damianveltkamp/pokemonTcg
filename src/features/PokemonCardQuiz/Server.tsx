import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import {
  pokemonQuizQueryFn,
  pokemonQuizQueryKey,
} from "@/utils/usePokemonQuiz";
import { Quiz } from "./Client";

export const PokemonCardQuiz = async () => {
  const queryClient = new QueryClient();

  // NOTE: we prefetch the pokemon data and hydrate it to the client.
  // we use tanstack query so that we can refetch data from the client
  // to rerender the UI with new pokemon cards.
  await queryClient.prefetchQuery({
    queryKey: [pokemonQuizQueryKey],
    queryFn: pokemonQuizQueryFn,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Quiz />
    </HydrationBoundary>
  );
};
