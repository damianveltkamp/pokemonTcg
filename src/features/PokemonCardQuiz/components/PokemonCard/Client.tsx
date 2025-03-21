"use client";
import { cn } from "@/utils/cn";
import { useAtom } from "jotai";
import NextImage from "next/image";
import { HTMLAttributes, useEffect, useState } from "react";
import { currentlySelectedPokemon } from "../../PokemonCardQuiz.atoms";
import { CardResume } from "@tcgdex/sdk";

interface RootProps extends HTMLAttributes<HTMLElement> {
  pokemonCard: CardResume;
}

export const Root = ({
  pokemonCard,
  children,
  className,
  ...props
}: RootProps) => {
  const [_, setValue] = useAtom(currentlySelectedPokemon);

  setValue(pokemonCard);
  return (
    <div
      className={cn("relative aspect-[9/16] w-full max-w-[300px]", className)}
      {...props}
    >
      {children}
    </div>
  );
};

interface PokemonImageProps {
  src: string;
}

export const PokemonImage = ({ src }: PokemonImageProps) => {
  const [blur, setBlur] = useState(20);

  useEffect(() => {
    if (blur === 0) return;

    // TODO: allow user to pick how fast this blur should go away.
    const interval = setInterval(() => {
      setBlur(blur - 2);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  return (
    <div
      className={cn("z-10 absolute h-full aspect-[9/16]", {
        // TODO: allow user to pick how fast this blur should go away.
        "blur-[20px]": blur === 20,
        "blur-[18px]": blur === 18,
        "blur-[16px]": blur === 16,
        "blur-[14px]": blur === 14,
        "blur-[12px]": blur === 12,
        "blur-[10px]": blur === 10,
        "blur-[8px]": blur === 8,
        "blur-[6px]": blur === 6,
        "blur-[4px]": blur === 4,
        "blur-[2px]": blur === 2,
        "blur-[0px]": blur === 0,
      })}
    >
      <NextImage
        src={`${src}/low.png`}
        alt="Image of a randomly picked pokemoncard"
        fill
        priority
      />
    </div>
  );
};
