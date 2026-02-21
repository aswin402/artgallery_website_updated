"use client";

import { useEffect, useState } from "react";
import InventorySearch from "@/components/inventory/InventorySearch";
import InventoryTable from "@/components/inventory/InventoryTable";
import InventoryTableSkeleton from "@/components/inventory/InventoryTableSkeleton";
import EditArtDialog from "@/components/inventory/EditArtDialog";

import { Art } from "@/features/artworks/types";
import {
  getAllArts,
  deleteArt as deleteArtService,
} from "@/features/artworks/artworks.service";

export default function InventoryPage() {
  const [arts, setArts] = useState<Art[]>([]);
  const [search, setSearch] = useState("");
  const [editArt, setEditArt] = useState<Art | null>(null);
  const [loading, setLoading] = useState(true);

  // Load Arts
  useEffect(() => {
    const loadArts = async () => {
      try {
        const data = await getAllArts();
        setArts(data);
      } catch (err) {
        console.error("Failed to load arts:", err);
      } finally {
        setLoading(false);
      }
    };

    loadArts();
  }, []);

  // Delete Art
  const handleDeleteArt = async (id: number) => {
    try {
      await deleteArtService(id);
      setArts((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const filteredArts = arts.filter(
    (a) =>
      a.artname.toLowerCase().includes(search.toLowerCase()) ||
      a.artist.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6 my-16">
      <h1 className="text-3xl font-bold">📦 Art Inventory</h1>

      <InventorySearch search={search} setSearch={setSearch} />

      {loading ? (
        <InventoryTableSkeleton />
      ) : (
        <InventoryTable
          arts={filteredArts}
          onEdit={(art) => setEditArt({ ...art })}
          onDelete={handleDeleteArt}
        />
      )}

      <EditArtDialog
        art={editArt}
        setArt={setEditArt}
      />
    </div>
  );
}