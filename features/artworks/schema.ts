import { z } from "zod";

export const artSchema = z.object({
  artname: z.string().min(2),
  artist: z.string().min(2),
  price: z.number().positive(),
  imageUrl: z.string().url().optional(),
});

export type ArtFormValues = z.infer<typeof artSchema>;
