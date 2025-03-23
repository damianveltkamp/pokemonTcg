import { tcgdex } from "@/utils/setupTCGDex";
import { CardResume } from "@tcgdex/sdk";

export const getAllPokemonCards = () => {
  return tcgdex.fetch("cards");
};

type TcgDexCardsReturnType = CardResume[] | undefined;

export const getPaginatedPokemonCards = async (page: number) => {
  const data = (await tcgdex.fetchWithQuery(
    ["cards"],
    [
      { key: "pagination:page", value: page },
      { key: "pagination:itemsPerPage", value: "10" },
    ],
    // NOTE: Casting the return type to the return type of the cards endpoint.
    // The fetch with query does not return the proper type of the endpoint
    // we are trying to fetch.
  )) as TcgDexCardsReturnType;

  return {
    data,
    nextCursor: page + 1,
  };
};
