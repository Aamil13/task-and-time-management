# Task & Time Management

A full-stack task and time tracking app built with Next.js. Manage tasks, log time, and monitor progress — all in one place.

## 🔗 Live Demo

**[https://task-and-time-management.vercel.app/](https://task-and-time-management.vercel.app/)**

## 🔐 Test Credentials

| Field    | Value               |
| -------- | ------------------- |
| Email    | `text2@exa.co`  |
| Password | `12345678`          |

> If the above credentials don't work, sign up for a new account — registration is open.

## 🛠 Tech Stack

| Layer     | Technology                                      |
| --------- | ----------------------------------------------- |
| Framework | Next.js 16 (App Router)                         |
| Language  | TypeScript                                      |
| Styling   | Tailwind CSS v4                                 |
| State     | Zustand                                         |
| Data      | TanStack Query v5 + Axios                       |
| Forms     | React Hook Form                                 |
| Auth      | JWT stored in cookies, middleware-protected routes |

## 🚀 Local Development

**Prerequisites:** Node.js 18+

1. **Clone the repo**

   ```bash
   git clone <repo-url>
   cd task-and-time-management
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the project root:

   ```env
   NEXT_PUBLIC_API_URL=https://be-task-and-management.vercel.app/api/v1
   ```

   Or point it at a local backend if you're running one:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
   ```

4. **Start the dev server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Available Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Production build         |
| `npm run start` | Start production server  |
| `npm run lint`  | Run ESLint               |
