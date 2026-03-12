import { NewDiaryEntry, Weather, Visibility } from './types';
import { z } from "zod";

export const newEntrySchema = z.object({
  weather: z.enum(Weather),
  visibility: z.enum(Visibility),
  date: z.iso.date(),
  comment: z.string().optional()
});

export const toNewDiaryEntry = (object: unknown): NewDiaryEntry => {
  return newEntrySchema.parse(object);
};
