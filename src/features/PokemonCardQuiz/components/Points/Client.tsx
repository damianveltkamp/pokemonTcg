"use client";
import { useAtom } from "jotai";
import { currentPointsAtom } from "../../PokemonCardQuiz.atoms";

export const Points = () => {
  const [points] = useAtom(currentPointsAtom);

  return (
    <div className="bg-slate-400 p-3 text-center w-full">
      <p className="text-2xl">Current points: {points}</p>
    </div>
  );
};
