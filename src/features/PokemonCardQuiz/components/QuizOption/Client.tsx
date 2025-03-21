"use client";
import { useAtom } from "jotai";
import { HTMLAttributes } from "react";
import {
  currentlySelectedPokemon,
  selectionNotification,
} from "../../PokemonCardQuiz.atoms";
import { CardResume } from "@tcgdex/sdk";
import { cn } from "@/utils/cn";

interface QuizOptionProps
  extends Omit<HTMLAttributes<HTMLButtonElement>, "children"> {
  option: CardResume;
}

export const QuizOption = ({
  option,
  className,
  ...props
}: QuizOptionProps) => {
  const [currentPokemon] = useAtom(currentlySelectedPokemon);
  const [_, setSelectionNotification] = useAtom(selectionNotification);

  const handleOnClick = () => {
    if (currentPokemon?.id === option.id) {
      setSelectionNotification({
        message: "You guessed right!",
        type: "success",
      });

      return;
    }

    setSelectionNotification({
      message: "Your current selection is not correct, try again",
      type: "error",
    });
  };

  return (
    <button
      className={cn("p-6 bg-pokemonBlue rounded-2xl", className)}
      onClick={handleOnClick}
      {...props}
    >
      {option.name}
    </button>
  );
};
