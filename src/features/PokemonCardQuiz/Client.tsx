"use client";
import { Notification } from "./components/Notification";
import { QuizOption } from "./components/QuizOption";
import { usePokemonQuiz } from "@/utils/usePokemonQuiz";
import { selectionNotificationAtom } from "./PokemonCardQuiz.atoms";
import { useAtom } from "jotai";
import { Points } from "./components/Points";
import { PokemonCard } from "@/components/PokemonCard";

export const Quiz = () => {
  const [notification] = useAtom(selectionNotificationAtom);

  const { data } = usePokemonQuiz();

  if (!data) return;

  return (
    <section className="flex flex-col gap-[40px] items-center">
      <Points />
      {data.randomPokemonCard && (
        <PokemonCard.Root>
          {data.randomPokemonCard.image && (
            <PokemonCard.PokemonImage
              src={data.randomPokemonCard.image}
              priority={true}
            />
          )}
          {/* NOTE: we need to set a key on the blur component to force */}
          {/* it to go back to it's default state. If we do not add a unique */}
          {/* key on the component the blur won't reset when fetching new pokemon. */}
          <PokemonCard.Blur key={data.randomPokemonCard.id} />
        </PokemonCard.Root>
      )}
      {data.quizOptions && (
        <div className="grid grid-cols-2 gap-2 w-full">
          {data.quizOptions.map((option) => (
            <QuizOption
              key={option.name}
              option={option}
              currentPokemon={data.randomPokemonCard}
            />
          ))}
        </div>
      )}
      {notification && <Notification />}
    </section>
  );
};
