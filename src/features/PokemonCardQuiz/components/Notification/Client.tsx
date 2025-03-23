"use client";

import { useAtom } from "jotai";
import { selectionNotificationAtom } from "../../PokemonCardQuiz.atoms";
import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";
import { usePokemonQuiz } from "@/utils/usePokemonQuiz";

export const Notification = () => {
  const [secondsTillNextPokemon, setSecondsTillNextPokemon] = useState(5);
  const [notification, setSelectionNotification] = useAtom(
    selectionNotificationAtom,
  );
  const { refetch } = usePokemonQuiz();

  const classes = cn("p-6 w-full fixed bottom-0 text-center", {
    "bg-red-500": notification?.type === "error",
    "bg-green-500": notification?.type === "success",
  });

  useEffect(() => {
    if (secondsTillNextPokemon === 0) {
      setSelectionNotification(null);
      refetch();
      return;
    }

    // TODO: allow user to pick how fast this blur should go away.
    const interval = setInterval(() => {
      setSecondsTillNextPokemon(secondsTillNextPokemon - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [secondsTillNextPokemon]);

  return (
    <div className={classes}>
      <h2>{notification?.message}</h2>
      <div>
        <p>Next pokemon in ... {secondsTillNextPokemon}</p>
      </div>
    </div>
  );
};
