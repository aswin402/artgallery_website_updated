# 🎨 Art Gallery Website
updated my old project [oldrepo](https://github.com/aswin402/NEXT.JS_CRUD_with_HONO) with new features and improvements using new development tools and techniques and packages.
A modern, full-stack web application for showcasing and managing artworks.
Built with **Next.js**, **React**, and **TypeScript**, this project demonstrates scalable architecture, clean code practices, and modern frontend patterns.

---

## 🚀 Overview

The Art Gallery Website allows users to:

* View a list of artworks
* Add new artworks
* Edit existing artworks
* Delete artworks
* Manage data efficiently with modern state management

This project follows a **feature-based architecture**, clean separation of concerns, and production-ready API handling.

---

## 🛠 Tech Stack

### Frontend

* Next.js 16 (App Router)
* React 19
* TypeScript

### Styling & UI

* Tailwind CSS
* shadcn/ui
* class-variance-authority
* clsx

### State & Data Management

* @tanstack/react-query
* Zustand

### Forms & Validation

* React Hook Form
* Zod

### API & Utilities

* Axios
* Custom API client
* Logger utility

### Code Quality

* ESLint
* Prettier
* Strict TypeScript configuration

---

## 🏗 Architecture

The project follows a **feature-based folder structure**:

```
features/
  artworks/
    artworks.service.ts
    artworks.hooks.ts
    types.ts
```

### Layers

* **Service Layer** → Handles API communication
* **Hooks Layer** → Wraps React Query logic
* **UI Layer** → Components & pages
* **State Layer** → Zustand for client state

This ensures:

* Separation of concerns
* Scalability
* Easy maintenance
* Testability

---

## ✨ Features

* Full CRUD functionality for artworks
* API error handling with proper status management
* Cache invalidation with React Query
* Form validation with Zod
* Responsive UI with Tailwind CSS
* Reusable component system

---

## 📦 Installation

Clone the repository:

```bash
git clone https://github.com/aswin402/artgallery_website_updated
cd artgallery_website_updated
```

Install dependencies:

```bash
bun install
# or
npm install
# or
yarn install
# or
pnpm install
```

---

## ▶️ Running the Development Server

```bash
npm run dev
```

Then open:

```
http://localhost:3000
```

---

## 🧪 Linting & Formatting

```bash
npm run lint
npm run format
```

---

## 🔮 Future Improvements

* Authentication & role-based access
* Image upload support
* Optimistic UI updates
* Pagination & filtering
* Unit & integration testing
* CI/CD pipeline

---

## 📄 License

This project is for learning and demonstration purposes.

---

## 👨‍💻 Author

Built with modern frontend best practices and scalable architecture.

---
