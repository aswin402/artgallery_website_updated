export const artKeys = {
  all: ["arts"] as const,
  lists: () => [...artKeys.all, "list"] as const,
  detail: (id: number) => [...artKeys.all, id] as const,
};