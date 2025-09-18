import type { AttendanceOption } from "../types/rsvp";

export const ATTENDANCE_OPTIONS: AttendanceOption[] = [
  {
    id: "yes",
    label: "Je participe au mariage",
    description: "Je serai présent(e) le jeudi 21 mai",
    attendance: { thursday: true },
    variant: "success",
  },
  {
    id: "no",
    label: "Je ne pourrai pas venir",
    description: "Malheureusement absent(e)",
    attendance: { thursday: false },
    variant: "error",
  },
];
