import { useQuery } from "@tanstack/react-query";
import { shuffleArray } from "./shuffleArray";
import { getRandomInt } from "./getRandomInt";
import { CardResume } from "@tcgdex/sdk";
import { tcgdex } from "./setupTCGDex";

const getAllPokemonCards = () => {
  return tcgdex.fetch("cards");
};

/**
 * This function initilizes the data required to display the
 * who's that pokemon quiz. This function returns a randomly
 * picked pokemon card and 4 randomly selected options that
 * the user needs to pick from.
 */
const initializePokemonQuizData = async () => {
  const cards = await getAllPokemonCards();

  // TODO: gracefully catch errors by displaying error messages to
  // the user indicating that something has gone wrong.
  if (!cards)
    return {
      randomPokemonCard: null,
      quizOptions: null,
    };

  const randomInt = getRandomInt(cards.length);

  const randomPokemonCard = cards[randomInt];
  const quizOptions: Array<CardResume> = [randomPokemonCard];

  randomInt && cards.splice(randomInt, 1);

  // NOTE: loop 3 times and select 3 random pokemon cards that are leftover
  // on the pile.
  for (let i = 0; i < 3; i++) {
    const randomInt = getRandomInt(cards.length);

    quizOptions.push(cards[randomInt]);

    cards.splice(randomInt, 1);
  }

  return {
    randomPokemonCard,
    quizOptions: shuffleArray(quizOptions),
  };
};

export const pokemonQuizQueryFn = () => {
  const data = initializePokemonQuizData();
  return data;
};

export const usePokemonQuiz = () => {
  return useQuery({
    queryKey: ["PokemonQuiz"],
    queryFn: pokemonQuizQueryFn,
  });
};
