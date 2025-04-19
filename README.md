# 🍿 usePopcorn

A React application for searching, rating, and tracking movies you've watched.

## Features

- Search for movies using the OMDB API
- View movie details including ratings, runtime, and plot
- Add movies to your watched list
- Rate movies you've watched
- Track statistics about your watched movies (average rating, runtime, etc.)
- Toggle movie and watched lists with collapsible UI components

## Technologies Used

- React 19
- React Hooks (useState, useEffect)
- Vite for development and building
- CSS for styling

## Project Structure

- `components/`: Contains all React components

  - `Navbar.jsx`: Top navigation bar with logo, search, and results count
  - `Main.jsx`: Main content area with movie list and watched movies
  - `MoviesList.jsx`: Displays list of movies from search results
  - `WatchedBox.jsx`: Container for watched movies summary and list
  - `WatchedSummary.jsx`: Statistics about watched movies
  - `WatchedMoviesList.jsx`: List of watched movies

- `data/`: Contains sample data for development
  - `tempData.js`: Temporary movie and watched movie data

## Getting Started

### Prerequisites

- Node.js (v16 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

### Build

Create a production build:

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## About the Project

usePopcorn is a React application built to demonstrate the use of React hooks and component composition. It allows users to search for movies, view details, and keep track of movies they've watched along with personal ratings.

The application was built as part of Jonas Schmedtmann's React course.
