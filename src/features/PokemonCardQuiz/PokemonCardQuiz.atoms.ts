"use client";
import { atom } from "jotai";

type NotificationType = "success" | "error";

type Notification = {
  message: string;
  type: NotificationType;
};

export const selectionNotificationAtom = atom<Notification | null>(null);
export const currentPointsAtom = atom<number>(0);
