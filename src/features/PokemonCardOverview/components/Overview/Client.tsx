"use client";
import { PokemonCard } from "@/components/PokemonCard";
import { usePaginatedPokemonCards } from "@/utils/usePokemonCards";
import { Fragment, useEffect } from "react";
import { useInView } from "react-intersection-observer";

export const Overview = () => {
  const { data, fetchNextPage } = usePaginatedPokemonCards();
  const { ref: inviewRef, inView } = useInView({
    rootMargin: "1000px",
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  if (!data) return null;

  return (
    <section>
      <h1 className="text-2xl">
        Overview of all the pokemon cards used in the who's that pokemon game
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.pages.map((group, pagesIndex) => (
          <Fragment key={pagesIndex}>
            {group.data &&
              group.data.map(
                (card) =>
                  card.image && (
                    <PokemonCard.Root className="m-auto" key={card.id}>
                      <PokemonCard.PokemonImage src={card.image} />
                    </PokemonCard.Root>
                  ),
              )}
          </Fragment>
        ))}
      </div>
      <div ref={inviewRef}>Load more</div>
    </section>
  );
};
