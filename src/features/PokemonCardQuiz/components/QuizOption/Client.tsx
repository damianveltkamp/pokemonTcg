"use client";
import { useAtom } from "jotai";
import { HTMLAttributes } from "react";
import {
  currentPointsAtom,
  selectionNotificationAtom,
} from "../../PokemonCardQuiz.atoms";
import { CardResume } from "@tcgdex/sdk";
import { cn } from "@/utils/cn";

interface QuizOptionProps
  extends Omit<HTMLAttributes<HTMLButtonElement>, "children"> {
  currentPokemon: CardResume;
  option: CardResume;
}

export const QuizOption = ({
  currentPokemon,
  option,
  className,
  ...props
}: QuizOptionProps) => {
  const [notification, setSelectionNotification] = useAtom(
    selectionNotificationAtom,
  );
  const [points, setPoints] = useAtom(currentPointsAtom);
  const isDisabled = Boolean(notification);
  const classes = cn("p-6 bg-pokemonBlue rounded-2xl", className, {
    "opacity-50": isDisabled,
  });

  const handleOnClick = () => {
    if (currentPokemon?.id === option.id) {
      // NOTE: React batches state update events so we don't have to worry
      // about calling 2 state updates here.
      setSelectionNotification({
        message: "You guessed right!",
        type: "success",
      });
      setPoints(points + 1);

      return;
    }

    setSelectionNotification({
      message: "Your current selection is not correct, try again",
      type: "error",
    });

    if (points !== 0) {
      setPoints(points - 1);
    }
  };

  return (
    <button
      className={classes}
      onClick={handleOnClick}
      disabled={isDisabled}
      {...props}
    >
      {option.name}
    </button>
  );
};
