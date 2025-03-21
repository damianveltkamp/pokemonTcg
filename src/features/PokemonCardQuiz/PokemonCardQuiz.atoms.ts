"use client";
import { CardResume } from "@tcgdex/sdk";
import { atom } from "jotai";

type NotificationType = "success" | "error";

type Notification = {
  message: string;
  type: NotificationType;
};

export const currentlySelectedPokemon = atom<CardResume | null>(null);
export const selectionNotification = atom<Notification | null>(null);
