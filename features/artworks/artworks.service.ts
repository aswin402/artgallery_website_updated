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

    return await res.json();
  } catch (error) {
    logger.error(`getArtById failed (id: ${id})`, error);
    throw error;
  }
}

//createArt==============================================================
export async function createArt(art: Omit<Art, "id">): Promise<Art> {
  try {
    const res = await fetch(`${api}/art`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(art),
    });

    if (!res.ok) {
      throw new Error("Failed to create art");
    }

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
  } catch (error) {
    logger.error(`deleteArt failed (id: ${id})`, error);
    throw error;
  }
}

//updateArt==============================================================
export async function updateArt(art: Art): Promise<Art> {
  try {
    const res = await fetch(`${api}/art/${art.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(art),
    });

    if (!res.ok) {
      throw new Error("Failed to update art");
    }

    return await res.json();
  } catch (error) {
    logger.error(`updateArt failed (id: ${art.id})`, error);
    throw error;
  }
}
