# 🧩 User Management App (Next.js 16)

A modern web application built with **Next.js 16**, **React 19**, and **TailwindCSS 4**, designed to display and manage user data with features such as client-side caching, favorites, offline fallback, and theme switching.

---

## ⚙️ Technical Documentation

### 🧠 Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** TailwindCSS 4 (light/dark theme)
- **UI Feedback:** react-hot-toast
- **API Source:** [https://dummyjson.com/users](https://dummyjson.com/users)
- **State Logic:** Custom React hooks (`useUsers`)
- **Offline Cache:** LocalStorage

---

### 🔧 Installation

```bash
# Clone the repository
git clone https://github.com/LeBaptouBaptiste/examfrontend.git
cd examfrontend

# Install dependencies
npm install
```

---

### 🚀 Run the app

```bash
# Development mode
npm run dev

# Build for production
npm run build

# Start production build
npm start
```

Then open [http://localhost:3000](http://localhost:3000)

---

### 🧩 Folder structure

```
src/
 ├─ app/
 │   ├─ page.tsx            → Main user list page
 │   ├─ user/[id]/page.tsx  → Dynamic user details page
 │   ├─ layout.tsx          → Global layout + Toaster + ThemeProvider
 │
 ├─ components/
 │   ├─ UserCard.tsx        → Display for user preview
 │   ├─ UserList.tsx        → Grid with pagination, search & sorting
 │   ├─ UserDetails.tsx     → Detailed user info
 │   ├─ Loading.tsx         → Loading animation component
 │
 ├─ hooks/
 │   ├─ useUsers.ts         → Custom hook managing fetching, filters, pagination & favorites
 │
 ├─ types/
 │   ├─ userInterface.ts    → Type definitions for user data
 │
 └─ public/
     ├─ favicon.png         → App icon
```

---

## 🧠 Development Journey

### 1️⃣ Project Setup

- Created project with `npx create-next-app@latest` using **App Router structure (`src/app/`)**.
- Installed and configured **TailwindCSS 4** manually, without `tailwind.config.js`.
- Added **TypeScript** support and type definitions (`@types/react`, `@types/node`).

### 2️⃣ UI Components

- Designed modular UI with **Tailwind**: cards, pagination, and loading animation.
- Implemented responsive design using `grid-cols-1 sm:grid-cols-3 lg:grid-cols-5`.

### 3️⃣ User Fetching

- Data fetched from `https://dummyjson.com/users`.
- Moved fetching logic into a dedicated **custom hook**: `useUsers()`.
- Hook handles:
  - Data fetching (with server pagination)
  - Client pagination (`limit` / `skip`)
  - Search & filtering
  - Sorting (name, age, firstname)
  - Error handling (`error` + `loading` states)

### 4️⃣ Favorites System

- Added persistent favorites stored in **localStorage**.
- Favorite state synchronized globally in `useUsers`.
- Clicking the ⭐ icon toggles favorite status for any user.
- Cards visually update instantly, without reload.

### 5️⃣ Offline Mode

- If the API is unavailable, the app loads the user directly from **localStorage**.
- Fallback logic implemented in **UserClient**.
- Works seamlessly offline if users were previously favorited.

### 6️⃣ Error Handling & Boundaries

- Implemented a custom **ErrorBoundary** for network-level or fetch exceptions.
- `notFound()` is used for invalid IDs, falling back to `/user/not-found.tsx`.

### 7️⃣ Loading & Transitions

- Added a global **loading.tsx** page for Next’s route transitions.
- Created a minimal **Loading** component with spinning animation and pulsing text.

### 8️⃣ Toast Notifications

- Integrated `react-hot-toast` for success/error feedback:
  - ✅ “User loaded from API”
  - 💾 “User loaded from cache”
  - ❌ “No cached data available”
- Added dark/light styling consistency with Tailwind themes.

### 9️⃣ Theme System

- Created a **ThemeButton** allowing real-time light/dark switch.
- Uses Tailwind’s `dark:` variant directly (no context needed).
- Button visually matches the app’s accent color (fuchsia/purple).

### 🔟 Favicon & Branding

- Designed and integrated a minimalist favicon representing the app’s purpose:
  - Gradient fuchsia/violet user silhouette on white background.
  - Located in `/public/favicon.png`.
  - Automatically detected by Next.js.

---

## 💾 Features Summary

| Feature | Description |
|----------|--------------|
| 🧠 Custom Hook | Centralized logic for fetch, filters, sorting, pagination |
| ⭐ Favorites | Persistent favorites stored in localStorage |
| 🌐 Offline Mode | Fallback to cached data when API fails |
| 🔄 Pagination | Server and client pagination supported |
| 🔍 Search & Sort | Real-time filtering by name/email |
| 🌓 Theme | Light/dark theme with transition |
| 🧱 Error Boundary | Clean fallback for network and route errors |
| 🔔 Toast Feedback | Success/error notifications with react-hot-toast |

---

## WebSite
 - This app is available on Vercel,
 - You can see it on [examfrontend-nu.vercel.app]

## 💬 Author

**Baptiste Vidal**  
Developer & Designer  
🖥️ Next.js • React • TailwindCSS  
📧 [baptiste.vidal.2005@gmail.com]  

---

## 🏁 License

MIT License © 2025 Baptiste Vidal
