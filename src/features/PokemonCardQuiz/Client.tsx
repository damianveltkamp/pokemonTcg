"use client";
import { PokemonCard } from "./components/PokemonCard";
import { Notification } from "./components/Notification";
import { QuizOption } from "./components/QuizOption";
import { usePokemonQuiz } from "@/utils/usePokemonQuiz";

export const Foo = () => {
  const { data, refetch } = usePokemonQuiz();

  if (!data) return;

  return (
    <section>
      {data.randomPokemonCard && (
        <PokemonCard.Root
          key={data.randomPokemonCard.name}
          pokemonCard={data.randomPokemonCard}
        >
          {data.randomPokemonCard.image && (
            <PokemonCard.PokemonImage src={data.randomPokemonCard.image} />
          )}
        </PokemonCard.Root>
      )}
      {data.quizOptions && (
        <div className="grid grid-cols-2 gap-2 w-full">
          {data.quizOptions.map((option) => (
            <QuizOption key={option.name} option={option} />
          ))}
        </div>
      )}
      <Notification />
      <button onClick={() => refetch()}>REFETCH</button>
    </section>
  );
};
