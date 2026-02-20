"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AlertSuccess, { DestructiveAlert } from "@/components/shared/Alert";
import { useCreateArt } from "@/features/artworks/hooks/useArtworks";
import { ArtFormValues, artSchema } from "@/features/artworks/schema";

type AlertState =
  | { type: "success"; id: number }
  | { type: "error"; message: string }
  | null;

export default function UploadArtPage() {
  const [image, setImage] = useState<File | null>(null);
  const [alert, setAlert] = useState<AlertState>(null);

  const createArtMutation = useCreateArt();


//React Hook Form Setup=========================================================

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ArtFormValues>({
    resolver: zodResolver(artSchema),
  });


//Auto-dismiss alert============================================================

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [alert]);


//Submit Handler============================================================

  const onSubmit = (data: ArtFormValues) => {
    createArtMutation.mutate(
      {
        data: {
          ...data,
          imageUrl: undefined,
        },
        image: image ?? undefined,
      },
      {
        onSuccess: (res) => {
          setAlert({
            type: "success",
            id: res.id,
          });
          reset();
          setImage(null);
        },
        onError: (error) => {
          const message =
            error instanceof Error
              ? error.message
              : "Upload failed";

          setAlert({
            type: "error",
            message,
          });
        },
      }
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">

      {alert && (
        <div className="fixed bottom-6 right-6 z-50 w-90 animate-in fade-in slide-in-from-top-2">
          {alert.type === "success" && (
            <AlertSuccess
              title="Art Uploaded Successfully"
              description={`Art ID: ${alert.id}`}
            />
          )}

          {alert.type === "error" && (
            <DestructiveAlert
              title="Upload Failed"
              description={alert.message}
            />
          )}
        </div>
      )}

      <Card className="bg-background/60  h-100 backdrop-blur border w-100 mb-40">
        <CardHeader>
          <CardTitle>Upload New Art</CardTitle>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
          >
            {/* Art Name */}
            <div>
              <Input
                placeholder="Art Name"
                {...register("artname")}
              />
              {errors.artname && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.artname.message}
                </p>
              )}
            </div>

            {/* Artist */}
            <div>
              <Input
                placeholder="Artist Name"
                {...register("artist")}
              />
              {errors.artist && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.artist.message}
                </p>
              )}
            </div>

            {/* Price */}
            <div>
              <Input
                type="number"
                placeholder="Price"
                {...register("price", { valueAsNumber: true })}
              />
              {errors.price && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.price.message}
                </p>
              )}
            </div>


            {/* Image */}
            <Input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setImage(e.target.files?.[0] || null)
              }
            />

            <Button
              type="submit"
              className="w-full"
              disabled={createArtMutation.isPending}
            >
              {createArtMutation.isPending
                ? "Uploading..."
                : "Upload Art"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}