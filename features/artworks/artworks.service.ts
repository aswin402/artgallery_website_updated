import { api } from "@/lib/api-client";
import { Art } from "./types";
import { logger } from "@/lib/logger";

//getAllArts==============================================================
export async function getAllArts(): Promise<Art[]> {
  try {
    const res = await fetch(`${api}/art`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch arts");
    }
    logger.info("Fetching artworks")
    return await res.json();
  } catch (error) {
    logger.error("getAllArts failed", error);
    throw error;
  }
}

//getArtById==============================================================
export async function getArtById(id: number): Promise<Art> {
  try {
    const res = await fetch(`${api}/art/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch art");
    }
    logger.info(`Fetching art with id ${id}`)
    return await res.json();
  } catch (error) {
    logger.error(`getArtById failed (id: ${id})`, error);
    throw error;
  }
}

//createArt==============================================================
export async function createArt(
  data: Omit<Art, "id">,
  image?: File
): Promise<Art> {
  try {
    const formData = new FormData();

    formData.append("artname", data.artname);
    formData.append("artist", data.artist);
    formData.append("price", String(data.price));

    if (image) {
      formData.append("image", image);
    }

    const res = await fetch(`${api}/art`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      throw new Error("Failed to create art");
    }

    logger.info(`Created art: ${data.artname}`);
    return await res.json();
  } catch (error) {
    logger.error("createArt failed", error);
    throw error;
  }
}

//deleteArt==============================================================
export async function deleteArt(id: number): Promise<void> {
  try {
    const res = await fetch(`${api}/art/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error("Failed to delete art");
    }
    logger.info(`Deleted art with id ${id}`)
  } catch (error) {
    logger.error(`deleteArt failed (id: ${id})`, error);
    throw error;
  }
}

//updateArt==============================================================
export async function updateArt(
  id: number,
  data: Partial<Art>
): Promise<Art> {
  try {
    const res = await fetch(`${api}/art/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error("Failed to update art");
    }

    logger.info(`Updated art with id ${id}`);
    return await res.json();
  } catch (error) {
    logger.error(`updateArt failed (id: ${id})`, error);
    throw error;
  }
}
