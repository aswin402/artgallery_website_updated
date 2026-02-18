# 🧠 Application Logic & Architecture Notes

This document explains the architectural decisions and logic flow of the Art Gallery feature.

---

# 📦 Feature-Based Architecture

The project follows a **feature-first structure**:

```
features/
  artworks/
    artworks.service.ts
    artworks.hooks.ts
    types.ts
```

Each feature contains:

* **Types** → Domain models
* **Service Layer** → API communication
* **Hooks Layer** → React Query integration

This ensures:

* Separation of concerns
* Scalability
* Maintainability
* Clear ownership of logic

---

# 🧩 Domain Model

```ts
export interface Art {
  id: number;
  artname: string;
  artist: string;
  price: number;
  imageUrl?: string;
}
```

This represents the backend contract.

All API calls return strongly typed data.

---

# 🌐 Service Layer (API Logic)

File: `artworks.service.ts`

Responsibilities:

* Communicate with backend
* Handle HTTP requests
* Check response status
* Log errors
* Throw errors for UI layer

Example pattern:

```ts
if (!res.ok) {
  throw new Error("Failed to fetch arts");
}
```

### Error Handling Strategy

* Backend handles status codes (200, 404, 500, etc.)
* Frontend checks `res.ok`
* Errors are logged using a centralized logger
* Errors are re-thrown to React Query

This ensures:

* No silent failures
* Centralized error logging
* Clean separation between API and UI

---

# 🔄 React Query Layer

File: `artworks.hooks.ts`

React Query is used for:

* Caching
* Background refetching
* Mutation handling
* Cache invalidation
* Loading & error states

---

## 📥 Queries

### Fetch All Artworks

```ts
useQuery({
  queryKey: ["arts"],
  queryFn: getAllArts,
});
```

* Cached under `"arts"`
* Automatically refetches when invalidated
* Provides `data`, `isLoading`, and `error`

---

### Fetch Single Artwork

```ts
useQuery({
  queryKey: ["art", id],
  queryFn: () => getArtById(id),
  enabled: !!id,
});
```

* Cache key includes ID
* Prevents execution when ID is undefined
* Allows granular cache control

---

## ✏️ Mutations

### Delete Artwork

```ts
useMutation({
  mutationFn: deleteArt,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["arts"] });
  },
});
```

### Update Artwork

```ts
useMutation({
  mutationFn: updateArt,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["arts"] });
  },
});
```

### Why Invalidate?

When data changes:

1. Mutation runs
2. Backend updates data
3. Cache becomes stale
4. `invalidateQueries` triggers refetch
5. UI updates automatically

This ensures data consistency without manual state updates.

---

# 🔁 Data Flow

```
UI Component
   ↓
Custom Hook (React Query)
   ↓
Service Layer
   ↓
Backend API
   ↓
Response → React Query Cache
   ↓
UI Re-render
```

This layered approach prevents tight coupling between UI and API logic.

---

# 📊 Query Key Strategy

* `["arts"]` → list
* `["art", id]` → single entity

This enables:

* Granular cache control
* Scalable query structure
* Independent invalidation

---

# 🛡 Error Propagation Flow

```
Backend sends 4xx / 5xx
        ↓
Service checks res.ok
        ↓
Throws Error
        ↓
React Query catches error
        ↓
UI receives error state
```

Errors are never swallowed.

---

# 📚 State Management Strategy

* **Server State** → React Query
* **Client State** → Zustand (if needed)
* **Forms** → React Hook Form + Zod

Separation ensures:

* Server state stays normalized
* UI state remains predictable
* Forms remain validated and type-safe

---

# 🎯 Design Principles Followed

* Single Responsibility Principle
* Separation of Concerns
* DRY (Don’t Repeat Yourself)
* Type Safety Everywhere
* Centralized Error Logging
* Feature Encapsulation

---

# 🚀 Scalability Considerations

The current structure supports:

* Adding create functionality easily
* Optimistic updates
* Pagination
* Authentication headers
* API abstraction layer
* Global error interceptors

No structural changes are required to scale.

---

# 🏁 Summary

The application logic is structured around:

* Clean feature boundaries
* Typed API contracts
* Centralized error handling
* Predictable cache management
* Declarative data fetching

The system is scalable, maintainable, and production-ready.

---