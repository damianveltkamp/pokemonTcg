import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { HTMLAttributes } from "react";
import { pokemonQuizQueryFn } from "@/utils/usePokemonQuiz";
import { Foo } from "./Client";

export type CardSeriesOverviewProps = HTMLAttributes<HTMLElement>;

export const PokemonCardQuiz = async ({
  ...props
}: CardSeriesOverviewProps) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["PokemonQuiz"],
    queryFn: pokemonQuizQueryFn,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Foo />
    </HydrationBoundary>
  );
};
