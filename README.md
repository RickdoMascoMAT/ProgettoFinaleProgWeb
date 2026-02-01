# Hypixel SkyBlock Stats Tracker

A Single Page Application (SPA) built with React + TypeScript to view Hypixel SkyBlock player statistics, auctions, and profiles.

## Project Description

This application allows users to:

- Search for Minecraft players and view their Hypixel SkyBlock statistics
- Browse the SkyBlock Auction House with advanced filtering and sorting
- Save favorite players for quick access
- View detailed player profiles with SkyBlock-specific data
- View auction details including item attributes, prices, and auctioneer information
- **Filter auctions by All/BIN Only/Non-BIN** with intuitive slider controls
- **Sort auctions by Ending Soon, Lowest Price, or Highest Price**
- Toggle between searching by item name or auctioneer name/UUID
- **Auctioneer usernames always visible** (UUID to username conversion via PlayerDB API, no auth required)
- Item autocomplete with intelligent filtering (removes % items, bazaar items, Booster Cookie)
- Click on auction to copy /viewauction command to clipboard

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

### PlayerDB API (Production & Username Resolution)

- **Base URL**: `https://playerdb.co/api/player/minecraft/`
- **Documentation**: [playerdb.co](https://playerdb.co/)
- **Authentication**: None required (public API)
- **Usage**: UUID to username conversion for auctioneer names
- CORS-friendly alternative to Mojang API
- Used for displaying auctioneer usernames in auction listings
- **Always available**: Works even without Hypixel API key

### API Key Management

- API key is stored in `localStorage`
- Key validation is performed on save
- Invalid/expired keys show a warning message

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── AuctionItem.tsx    # Auction card with auctioneer name display
│   ├── ErrorMessage.tsx   # Error notification component
│   ├── FavoriteItem.tsx   # Favorite player list item with DEV badge
│   ├── LoadingSpinner.tsx # Loading state indicator
│   ├── PlayerCard.tsx     # Player profile card with favorite toggle
│   ├── StatDisplay.tsx    # Statistic display with optional icon/color
│   └── SuccessMessage.tsx # Success notification component
├── hooks/               # Custom React hooks
│   ├── useApiData.ts       # Generic React Query wrapper
│   ├── useApiKey.ts        # API key management
│   ├── useNavigationState.ts # Navigation state management
│   ├── usePlayer.ts        # Player data fetching
│   ├── useProfiles.ts      # Profile data fetching
│   ├── useProgressiveAuctions.ts  # Auctions with progressive loading
│   ├── useUUID.ts          # Username to UUID conversion
│   └── useUsername.ts      # UUID to username conversion
├── pages/               # Application pages
│   ├── AuctionsPage.tsx    # Advanced auction browser with filters/sorting
│   ├── HomePage.tsx        # Home with API key config and player search
│   ├── NotFoundPage.tsx    # 404 error page
│   └── ProfilePage.tsx     # Player profile with SkyBlock stats
├── services/            # API services
│   ├── auctionApi.ts       # Auction data fetching
│   ├── favoritesApi.ts     # Favorites + POST mock for user preferences
│   ├── hypixelAPI.ts       # Hypixel API wrapper
│   ├── minecraftAPI.ts     # Mojang/PlayerDB API (UUID/username conversion)
│   └── mockService.ts      # Mock data management for demo mode
├── types/               # TypeScript type definitions
│   ├── advanced.ts         # Generic types, unions, intersections
│   ├── api.ts              # API response types
│   ├── auctions.ts         # Auction types with optional auctioneerName
│   ├── player.ts           # Player types
│   ├── profiles.ts         # Profile types
│   └── ...                 # Other type definitions
├── utils/               # Utility functions
│   ├── apiErrorHandler.ts  # Centralized error handling
│   └── typeGuards.ts       # Type validation guards
├── App.tsx              # Main app with routing and sidebar
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
- [x] **Advanced Auction Filtering**:
  - Slider controls for All/BIN Only/Non-BIN filtering
  - Sort by Ending Soon, Lowest Price, or Highest Price
  - Real-time filter updates with pagination reset
- [x] **Smart Item Autocomplete**:
  - Filters out % items (percent-based items)
  - Excludes bazaar items (not auctionable)
  - Removes Booster Cookie from suggestions
  - Strips Minecraft color codes (§x) from item names
  - Simplifies item names for better matching
- [x] **Username Resolution**:
  - Auctioneer usernames always visible (no API key required)
  - Uses PlayerDB API for UUID to username conversion
  - Rate-limited to prevent API overload (10 concurrent requests)
  - Shows shortened UUID as fallback when name unavailable
- [x] Progressive auction loading (loads pages incrementally)
- [x] Favorite players system with localStorage persistence
- [x] Pagination for auction results (50 items per page)
- [x] API key validation before saving
- [x] Auto-refresh for auction data with countdown timer
- [x] Click on auction to copy /viewauction command to clipboard
- [x] Grid layout for auctions (2 columns)
- [x] Success message feedback for user actions
- [x] Sidebar always visible for easy navigation
- [x] Error message when player username not found

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

## Technical Highlights

### Advanced Auction Filtering System

The auction page features a dual-slider system for intuitive filtering:

- **BIN Filter**: All / BIN Only / Non-BIN with visual active state
- **Sort Mode**: Ending Soon / Lowest Price / Highest Price
- Real-time updates with automatic pagination reset
- Filters applied on top of search results without re-fetching data

### Smart Item Name Processing

Item names undergo intelligent processing for better autocomplete:

- **Removes Minecraft color codes** (`§x` patterns stripped)
- **Filters bazaar items** using live Hypixel bazaar API
- **Excludes percentage items** (progress/stat-based items)
- **Blocks Booster Cookie** (non-auctionable item)
- **Simplifies names** by removing quality prefixes (Legendary, Epic, etc.)
- **Deduplication** of similar items with different modifiers

### Username Resolution Without Authentication

Auctioneer names are always visible thanks to:

- **PlayerDB API integration** (public, no auth required)
- **Rate limiting** with p-limit (10 concurrent requests)
- **Fallback to shortened UUID** when resolution fails
- **Independent of Hypixel API key** - works in demo mode
- **Batch resolution** of all unique auctioneers in search results

### Progressive Data Loading

Auction data loads incrementally to improve performance:

- Fetches multiple auction pages concurrently
- Dynamic buffer adjustment based on available data
- React Query caching for instant re-renders
- Auto-refresh with countdown timer

## License

This project was created for educational purposes as part of the UF07WEB exam 2025/26.

## Author

Riccardo Mascotto

## Inspiration

Took inspiration from the website made by adjective_noun: [adjectils.com](https://adjectils.com/)

Repository: [github.com/adjectiven0un/adjectils](https://github.com/adjectiven0un/adjectils)
