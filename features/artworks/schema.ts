import { z } from "zod";

export const artSchema = z.object({
  artname: z.string().min(2,"Art name must be at least 2 characters"),
  artist: z.string().min(2, "Artist name must be at least 2 characters"),
  price:  z.coerce
    .number()
    .positive("Price must be positive"),
  imageUrl: z.string().url().optional(),
});

export type ArtFormValues = z.infer<typeof artSchema>;
