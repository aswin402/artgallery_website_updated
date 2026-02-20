import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllArts,
  deleteArt,
  updateArt,
  getArtById,
  createArt,
} from "../artworks.service";
import { Art, CreateArtInput } from "../types";
import { artKeys } from "../art.queryKeys";

/* ================= GET ALL ================= */
export const useArtworks = () =>
  useQuery({
    queryKey: artKeys.lists(),
    queryFn: getAllArts,
  });

/* ================= GET BY ID ================= */
export const useArtById = (id: number) =>
  useQuery({
    queryKey: artKeys.detail(id),
    queryFn: () => getArtById(id),
    enabled: !!id,
  });

/* ================= CREATE ================= */
export const useCreateArt = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ data, image }: CreateArtInput) =>
      createArt(data, image),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: artKeys.all });
    },
  });
};

/* ================= DELETE ================= */
export const useDeleteArt = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteArt(id),

    onSuccess: (_, id) => {
      // Optimistic removal from cache
      queryClient.setQueryData<Art[]>(
        artKeys.lists(),
        (old) => old?.filter((art) => art.id !== id) ?? []
      );
    },
  });
};

/* ================= UPDATE ================= */
export const useUpdateArt = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: Partial<Art>;
    }) => updateArt(id, data),

    onSuccess: (updatedArt) => {
      queryClient.setQueryData<Art[]>(
        artKeys.lists(),
        (old) =>
          old?.map((art) =>
            art.id === updatedArt.id ? updatedArt : art
          ) ?? []
      );
    },
  });
};