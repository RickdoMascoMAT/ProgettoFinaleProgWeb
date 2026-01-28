# Hypixel SkyBlock Stats Tracker

A Single Page Application (SPA) built with React + TypeScript to view Hypixel SkyBlock player statistics, auctions, and profiles.

## Project Description

This application allows users to:

- Search for Minecraft players and view their Hypixel SkyBlock statistics
- Browse the SkyBlock Auction House with filtering and sorting
- Save favorite players for quick access
- View detailed player profiles with SkyBlock-specific data

## Tech Stack

- **React 18** - UI Library
- **TypeScript** - Type-safe JavaScript
- **React Query (@tanstack/react-query)** - Server state management and API caching
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework

## Installation & Setup

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd ProgettoFinaleProgWeb

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Environment Setup

The application uses the Hypixel API. To access real data:

1. Get an API key from [developer.hypixel.net](https://developer.hypixel.net)
2. Enter the API key in the application's home page

## API Used

### Hypixel API

- **Base URL**: `https://api.hypixel.net/v2/`
- **Documentation**: [api.hypixel.net](https://api.hypixel.net/)
- **Endpoints used**:
  - `GET /player` - Player data
  - `GET /skyblock/profiles` - SkyBlock profiles
  - `GET /skyblock/auctions` - Auction House data

### Mojang API

- **Base URL**: `https://api.mojang.com/`
- **Endpoints used**:
  - `GET /users/profiles/minecraft/:username` - Username to UUID conversion

### API Key Management

- API key is stored in `localStorage`
- Key validation is performed on save
- Invalid/expired keys show a warning message

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ErrorMessage.tsx
│   ├── FavoriteItem.tsx
│   ├── LoadingSpinner.tsx
│   ├── PlayerCard.tsx
│   ├── StatDisplay.tsx
│   └── SuccessMessage.tsx
├── hooks/               # Custom React hooks
│   ├── useApiData.ts       # Generic React Query wrapper
│   ├── useApiKey.ts        # API key management
│   ├── useNavigationState.ts
│   ├── usePlayer.ts        # Player data fetching
│   ├── useProfiles.ts      # Profile data fetching
│   ├── useProgressiveAuctions.ts  # Auctions with progressive loading
│   └── useUUID.ts          # Username to UUID conversion
├── pages/               # Application pages
│   ├── AuctionsPage.tsx
│   ├── HomePage.tsx
│   ├── NotFoundPage.tsx
│   └── ProfilePage.tsx
├── services/            # API services
│   ├── auctionApi.ts
│   ├── favoritesApi.ts     # Includes POST mock for user preferences
│   ├── hypixelApi.ts
│   └── minecraftAPI.ts
├── types/               # TypeScript type definitions
│   ├── advanced.ts         # Generic types, unions, intersections
│   ├── api.ts
│   ├── auctions.ts
│   ├── player.ts
│   ├── profiles.ts
│   └── ...
├── utils/               # Utility functions
│   ├── apiErrorHandler.ts
│   └── typeGuards.ts
├── App.tsx              # Main app component with routing
└── main.tsx             # Application entry point
```

## Completed Features

### Exam Requirements - Minimum (18 points)

- [x] **Project structure** with `components/` and `pages/` folders
- [x] **Routing** with 2+ pages (Home, Profile, Auctions, 404)
- [x] **TypeScript** with interfaces for API objects and typed props
- [x] **React Query GET call** with data visualization

### Exam Requirements - Advanced

- [x] **Well-structured project** with reusable components and separated types
- [x] **API Calls**:
  - [x] Multiple calls with `async/await` (minecraftAPI, hypixelApi)
  - [x] Multiple calls with React Query (usePlayer, useProfiles, useProgressiveAuctions)
  - [x] **POST mock call** (`saveUserPreferences` in favoritesApi.ts)
  - [x] Error handling for each API call
- [x] **Advanced Routing**:
  - [x] Dynamic URL parameters (`/profile/:username`)
  - [x] Navigation with data passing (useNavigationState)
  - [x] 404 page (NotFoundPage)
- [x] **Advanced TypeScript**:
  - [x] Multiple interfaces (Player, Profile, Auction, etc.)
  - [x] Type aliases (`UUID`, `LoadingState`, etc.)
  - [x] Generics (`useApiData<T>`, `ApiResponse<T>`)
  - [x] Union/Intersection types (in `advanced.ts`)
- [x] **Code Quality**:
  - [x] Clean and readable code
  - [x] Consistent naming conventions
  - [x] Organized file structure
- [x] **UI/UX**:
  - [x] App design and flow
  - [x] Graphical components
  - [x] Loading states and error handling

### Extra Features

- [x] Progressive auction loading (loads pages incrementally)
- [x] Favorite players system with localStorage persistence
- [x] Auction filtering by item name
- [x] BIN/Non-BIN auction toggle with price sorting
- [x] Pagination for auction results
- [x] API key validation before saving
- [x] Auto-refresh for auction data

## Credentials / Mock Data

- **API Key**: Required for real Hypixel data. Get one at [developer.hypixel.net](https://developer.hypixel.net)
- **Mock Data**: WIP
- **LocalStorage Keys**:
  - `hypixelApiKey` - Stored API key
  - `favorites` - Array of favorite player UUIDs
  - `userPreferences` - User preferences (POST mock)

## License

This project was created for educational purposes as part of the UF07WEB exam 2025/26.

## Author

Riccardo Mascotto

## Inspiration

Took inspiration from the website made by adjective_noun: [adjectils.com](https://adjectils.com/)

Repository: [github.com/adjectiven0un/adjectils](https://github.com/adjectiven0un/adjectils)
