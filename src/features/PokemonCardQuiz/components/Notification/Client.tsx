"use client";

import { useAtom } from "jotai";
import { selectionNotification } from "../../PokemonCardQuiz.atoms";
import { useEffect } from "react";
import { cn } from "@/utils/cn";

export const Notification = () => {
  const [notification] = useAtom(selectionNotification);

  const classes = cn("p-6 w-full fixed bottom-0", {
    "bg-red-500": notification?.type === "error",
    "bg-green-500": notification?.type === "success",
  });

  useEffect(() => {
    return () => {};
  }, [notification]);

  return <div className={classes}>{notification?.message}</div>;
};
