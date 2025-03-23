"use client";
import { cn } from "@/utils/cn";
import NextImage from "next/image";
import { HTMLAttributes, useEffect, useState } from "react";
import { useAtom } from "jotai";
import { selectionNotificationAtom } from "@/features/PokemonCardQuiz/PokemonCardQuiz.atoms";

export const Root = ({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLElement>) => {
  return (
    <div
      className={cn("relative aspect-[9/16] w-full max-w-[300px]", className)}
      {...props}
    >
      {children}
    </div>
  );
};

export const Blur = () => {
  const [blur, setBlur] = useState(20);
  const [notification] = useAtom(selectionNotificationAtom);

  useEffect(() => {
    if (blur === 0) {
      return;
    }
    if (notification) {
      setBlur(0);
      return;
    }

    const interval = setInterval(() => {
      setBlur(blur - 2);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [blur]);

  return (
    <div
      className={cn("relative h-full w-full z-20", {
        // TODO: allow user to pick how fast this blur should go away.
        "backdrop-blur-[20px]": blur === 20,
        "backdrop-blur-[18px]": blur === 18,
        "backdrop-blur-[16px]": blur === 16,
        "backdrop-blur-[14px]": blur === 14,
        "backdrop-blur-[12px]": blur === 12,
        "backdrop-blur-[10px]": blur === 10,
        "backdrop-blur-[8px]": blur === 8,
        "backdrop-blur-[6px]": blur === 6,
        "backdrop-blur-[4px]": blur === 4,
        "backdrop-blur-[2px]": blur === 2,
        "backdrop-blur-[0px]": blur === 0,
      })}
    />
  );
};

interface PokemonImageProps {
  src: string;
  priority?: boolean;
}

export const PokemonImage = ({ src, priority }: PokemonImageProps) => {
  return (
    <div className={cn("z-10 absolute h-full aspect-[9/16]")}>
      <NextImage
        src={`${src}/low.png`}
        alt="Image of a pokemon card"
        fill
        sizes="300px"
        priority={priority}
      />
    </div>
  );
};
