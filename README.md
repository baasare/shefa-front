# ShefaFx Frontend

AI-Powered Trading Platform Frontend built with Next.js, TypeScript, and Tailwind CSS.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **HTTP Client**: Axios

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

2. Copy environment variables:

```bash
cp .env.local.example .env.local
```

3. Update `.env.local` with your backend API URL via `NEXT_PUBLIC_API_URL`

### Development

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm run start
```

## Project Structure

```
src/
├── app/                  # Next.js app router pages
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Home page
│   └── providers.tsx    # App providers (React Query, etc.)
├── components/
│   ├── ui/              # Reusable UI components
│   ├── layout/          # Layout components
│   └── features/        # Feature-specific components
├── lib/
│   ├── api/             # API client and endpoints
│   ├── hooks/           # Custom React hooks
│   ├── store/           # Zustand stores
│   └── utils/           # Utility functions
├── types/               # TypeScript type definitions
└── styles/              # Global styles
```

## Features

- ✅ TypeScript support
- ✅ Tailwind CSS for styling
- ✅ API client with JWT authentication
- ✅ Auth state management
- ✅ React Query for data fetching
- ✅ Reusable UI components
- ✅ Responsive design

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Check TypeScript types

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | Set in your environment, for example `http://api.localhost:8000` in local development |
| `NEXT_PUBLIC_APP_NAME` | Application name | `ShefaFx` |
| `NEXT_PUBLIC_APP_URL` | Frontend URL | `http://localhost:3000` |
