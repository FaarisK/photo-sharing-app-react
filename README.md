# Project 1: Single Page Applications

A modern React photo-sharing application built with Vite, Axios Mock Adapter and Material-UI.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development:
   ```bash
   npm run dev
   ```

The app will open at `http://localhost:3000`

## How It Works

The project has **two phases**:

### **Mock Data (Start Here)**

The app works immediately with mock data. No server needed!

**What happens:**
1. `photoShare.jsx` imports `./lib/mockSetup.js`
2. Mock setup intercepts all API calls
3. Returns mock data from `modelData/photoApp.js`
4. App works without any backend



## API Endpoints

The server provides these endpoints:
- `GET /test/info` - Schema information
- `GET /user/list` - All users
- `GET /user/:id` - Specific user details
- `GET /photosOfUser/:id` - User's photos with comments

## Development Commands

```bash
npm run dev      # Start frontend development
npm run build    # Build for production
npm run lint     # Check code quality 
```

## Technology Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Material-UI** - React component library
- **React Router** - Client-side routing
- **Axios** - HTTP client with mock adapter
