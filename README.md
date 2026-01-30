# Hypixel SkyBlock Stats Tracker

A Single Page Application (SPA) built with React + TypeScript to view Hypixel SkyBlock player statistics, auctions, and profiles.

## Project Description

This application allows users to:

- Search for Minecraft players and view their Hypixel SkyBlock statistics
- Browse the SkyBlock Auction House with filtering and sorting
- Save favorite players for quick access
- View detailed player profiles with SkyBlock-specific data
- View auction details including item attributes, prices, and auctioneer information
- Filter and sort auctions by various criteria such as price, ending soonest, etc.
- Support for both BIN (Buy It Now) and auction listings
- Toggle between searching by item name or auctioneer name
- Auctioneer name to UUID conversion for accurate search

## Tech Stack

- **React 19** - UI Library
- **TypeScript** - Type-safe JavaScript
- **React Query (@tanstack/react-query)** - Server state management and API caching
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **GitHub Actions** - CI/CD pipeline for automated testing and deployment

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

### Mojang API (Development)

- **Base URL**: `https://api.mojang.com/`
- **Endpoints used**:
  - `GET /users/profiles/minecraft/:username` - Username to UUID conversion
- Used via Vite proxy in development mode

### PlayerDB API (Production)

- **Base URL**: `https://playerdb.co/api/player/minecraft/`
- **Documentation**: [playerdb.co](https://playerdb.co/)
- CORS-friendly alternative to Mojang API for production builds

### API Key Management

- API key is stored in `localStorage`
- Key validation is performed on save
- Invalid/expired keys show a warning message

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── AuctionItem.tsx    # Individual auction display component
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
│   ├── useUUID.ts          # Username to UUID conversion
│   └── useUsername.ts      # UUID to username conversion
├── pages/               # Application pages
│   ├── AuctionsPage.tsx
│   ├── HomePage.tsx
│   ├── NotFoundPage.tsx
│   └── ProfilePage.tsx
├── services/            # API services
│   ├── auctionApi.ts
│   ├── favoritesApi.ts     # Includes POST mock for user preferences
│   ├── hypixelAPI.ts
│   ├── minecraftAPI.ts
│   └── mockService.ts      # Mock data management for demo mode
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
  - [x] **POST call** (`saveUserPreferences` in favoritesApi.ts - simulates async API with localStorage)
  - [x] Error handling for each API call
  - [x] Type guards for API response validation (`typeGuards.ts`)
- [x] **Advanced Routing**:
  - [x] Dynamic URL parameters (`/profile/:username`)
  - [x] Navigation with data passing (useNavigationState)
  - [x] 404 page (NotFoundPage)
- [x] **Advanced TypeScript**:
  - [x] Multiple interfaces (Player, Profile, Auction, etc.)
  - [x] Type aliases (`UUID`, `DisplayName`, `Rank`, `Timestamp`, `Optional<T>`)
  - [x] Generics (`useApiData<T>`, `ApiResponse<T>`, `Optional<T>`)
  - [x] Type guards (`isValidApiResponse<T>`, `hasEssentialPlayerFields`)
- [x] **Code Quality**:
  - [x] Clean and readable code
  - [x] Consistent naming conventions
  - [x] Organized file structure
- [x] **UI/UX**:
  - [x] App design and flow
  - [x] Graphical components
  - [x] Loading states and error handling

### Extra Features

- [x] **CI/CD Pipeline** with GitHub Actions:
  - Automated build, lint, and type checking on push/PR
  - Automatic deployment to GitHub Pages
  - Release creation on version tags
- [x] **Demo Mode**: Automatic mock data when no API key is configured
- [x] **DEV Player**: Rick_doMasco shown with DEV tag as demo player
- [x] **Item Autocomplete**: Search suggestions from SkyBlock items database when typing in Auctions page
- [x] Progressive auction loading (loads pages incrementally)
- [x] Favorite players system with localStorage persistence
- [x] Auction filtering by item name
- [x] BIN/Non-BIN auction toggle with price sorting
- [x] Pagination for auction results
- [x] API key validation before saving
- [x] Auto-refresh for auction data
- [x] Auctioneer names displayed instead of UUIDs (using PlayerDB API)
- [x] Click on auction to copy /viewauction command to clipboard
- [x] Grid layout for auctions (2 columns)
- [x] Success message feedback for user actions
- [x] Toggle between item name and auctioneer name search modes
- [x] Auctioneer name to UUID conversion for accurate search

## Credentials / Mock Data

- **API Key**: Required for real Hypixel data. Get one at [developer.hypixel.net](https://developer.hypixel.net)
- **Demo Mode**: When no API key is configured, the app automatically uses mock data for authenticated endpoints (player, profiles). Click on **Rick_doMasco (DEV)** in the favorites to see sample data.
- **POST Call**: The `saveUserPreferences` function simulates a POST request with async/await, using `localStorage` for persistence and a 500ms delay to simulate network latency
- **Mock Data Files**: Located in `public/data/` - includes player.json, profiles.json for demo purposes
- **LocalStorage Keys**:
  - `hypixelApiKey` - Stored API key
  - `favorites` - Array of favorite player UUIDs
  - `userPreferences` - User preferences (saved via simulated POST)

## Live Demo

The application is deployed on GitHub Pages: [https://rickdomascomat.github.io/ProgettoFinaleProgWeb/](https://rickdomascomat.github.io/ProgettoFinaleProgWeb/)

## License

This project was created for educational purposes as part of the UF07WEB exam 2025/26.

## Author

Riccardo Mascotto

## Inspiration

Took inspiration from the website made by adjective_noun: [adjectils.com](https://adjectils.com/)

Repository: [github.com/adjectiven0un/adjectils](https://github.com/adjectiven0un/adjectils)
