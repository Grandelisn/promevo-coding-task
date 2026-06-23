# Promevo Coding Task Front-end

This is the frontend user interface for a "vertical slice" for the gPanel file/label management application. Built using React, TypeScript, and Vite, this component-driven dashboard communicates directly with the Spring Boot middleware to manage Google Gmail labels via a highly interactive UI.

---

## 🛠️ Core Tech Stack
* **Build Tool:** [Vite](https://vite.dev/) — Provides instant Hot Module Replacement (HMR) and optimized production builds.
* **UI Framework:** [Material UI (MUI)](https://mui.com/) — Utilized for polished, responsive components and high-performance tables.
* **State Management & Data Fetching:** [TanStack Query (v5)](https://tanstack.com/query/latest) — Manages asynchronous server state, caching, and cache invalidation following CRUD updates.
* **Routing:** [React Router (v7)](https://reactrouter.com/) — Handles client-side declarative and programmatic route navigation.
* **Form Handling:** [React Hook Form](https://react-hook-form.com/) — Powers performant, uncontrolled form validation for creating and editing labels.

---

## 🚀 Implemented Features

The application delivers a complete "vertical slice" demonstrating complex data flow across the following views and actions:

### 1. Label Dashboard (`MUI DataGrid`)
* Renders all synchronized Gmail labels in a structurally clean data grid
* Handles cell formatting, status badges, and custom pagination out of the box.

### 2. Programmatic Row Navigation
* Fully integrated with `React Router`. Clicking any row within the data grid intercepts the event and demonstrates navigating to a new client route.

### 3. Integrated CRUD Mutations (`TanStack Query` + `React Hook Form`)
* **Create Label:** A validated form modal/view that dispatches a `POST` request.
* **Update Label:** Automatically populates fields by parsing matching objects into the form state, dispatching an optimized `PUT` mutation.
* **Delete Label:** Intercepts delete commands, executes safe asynchronous removals, and instantly triggers smart cache invalidation (`queryClient.invalidateQueries`) to refresh the dashboard seamlessly.

---

## 🏃‍♂️ Getting Started

### 1. Install Dependencies
Navigate to the frontend directory and install the necessary node modules: npm install
### 2. Add .env for VITE_API_BASE_URL
example: VITE_API_BASE_URL=<your api url>
### 3. npm run dev

src/
├── api/            # Requests for labels
│   ├── labels-mutations/  # Custom TanStack Query mutations & queries (useUpdateLabel, etc.)
├── assets/ # Holds image assets
├── components/
│   ├── form/  # Reusable MUI wrapped form elements (Select, TextField, etc)
│   └── lable-table.tsx # Display for data grid
│   └── label-form.tsx # Display for data grid
│   └── custom-toolbar.tsx # Toolbar to add bar to the MUI Data Grid
├── context/ # Custom TanStack Query mutations & queries (useUpdateLabel, etc.)
│   └── lable-context.tsx # Context for Label
│   └── lable-form-schema.tsx # Schema for Lable Form
├── App.tsx           # Router configuration and QueryClientProvider setup
└── main.tsx          # Application entry point
