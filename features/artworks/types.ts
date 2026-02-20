export interface Art {
  id: number;
  artname: string;
  artist: string;
  price: number;
  imageUrl?: string;
}

export type AlertVariant = "success" | "destructive";

export interface AlertProps {
  title?: string;
  description?: string;
  variant?: AlertVariant;
}

export type CreateArtInput = {
  data: Omit<Art, "id">;
  image?: File;
};