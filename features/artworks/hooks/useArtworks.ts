import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllArts, deleteArt, updateArt, getArtById, createArt } from "../artworks.service";
import { Art } from "../types";

//getAllArts====================================
export const useArtworks = () =>
  useQuery({
    queryKey: ["arts"],
    queryFn: getAllArts,
  });

//getArtById====================================
export const useArtById = (id: number) =>
  useQuery({
    queryKey: ["art", id],
    queryFn: () => getArtById(id),
    enabled: !!id,
  });

//createArts====================================
export const useCreateArt = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createArt,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["arts"] });
    },
  });
};


//DeleteArts====================================
export const useDeleteArt = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteArt,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["arts"] });
    },
  });
};

//UpdateArts====================================
export const useUpdateArt = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (art: Art) => updateArt(art),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["arts"] });
    },
  });
};
