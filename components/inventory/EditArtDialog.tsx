"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArtFormValues, artSchema} from "@/features/artworks/schema";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Art } from "@/features/artworks/types";
import { useUpdateArt } from "@/features/artworks/hooks/useArtworks";






type Props = {
  art: Art | null;
  setArt: (art: Art | null) => void;
};

export default function EditArtDialog({ art, setArt }: Props) {
  const { mutate, isPending } = useUpdateArt();
  
  const form = useForm({
    resolver: zodResolver(artSchema),
    defaultValues: {
      artname: art?.artname ?? "",
      artist: art?.artist ?? "",
      price: art?.price ?? 0,
      imageUrl: art?.imageUrl ?? "",
    },
  });
  const { register, handleSubmit, formState: { errors } } = form;

  if (!art) return null;

  const onSubmit = (data: ArtFormValues) => {
    mutate(
      {
            id: art.id,
            data, 
          },
      {
        onSuccess: () => setArt(null),
      }
    );
  };

  return (
    <Dialog open={!!art} onOpenChange={() => setArt(null)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Art</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label>Art Name</Label>
            <Input {...register("artname")} />
            {errors.artname && (
              <p className="text-sm text-red-500">
                {errors.artname.message}
              </p>
            )}
          </div>

          <div>
            <Label>Artist</Label>
            <Input {...register("artist")} />
            {errors.artist && (
              <p className="text-sm text-red-500">
                {errors.artist.message}
              </p>
            )}
          </div>

          <div>
            <Label>Price</Label>
            <Input type="number" {...register("price")} />
            {errors.price && (
              <p className="text-sm text-red-500">
                {errors.price.message}
              </p>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setArt(null)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Done"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}