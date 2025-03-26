## Fakenetflix
FakeNetflix is a Netflix-inspired movie streaming platform built using **Next.js** and **TypeScript**. It provides users with an immersive experience to browse and explore movies and TV shows with seamless authentication and a personalized watchlist.

## 🎬 Demo

Check out the live demo: [FakeNetflix Demo](https://fakenetflix-ten.vercel.app)

**Test credentials (for lazy users 😓)**
- **Email:** testt@gmail.com  
- **Password:** 123456


## 🚀 Features
- **Modern UI**: Styled with **Tailwind CSS** for a responsive and sleek design.
- **Authentication**: Sign in with **Email & Google** using **Firebase Authentication**.
- **Dynamic Data Fetching**: Integrated with the **TMDb API** for real-time movie and TV show data.
- **State Management**: Utilizes **Context API** for managing global state.
- **Custom Hooks**: Optimized logic handling with reusable hooks.
- **Middleware Protection**: Restricts access to specific pages if the user is not authenticated.
- **Watchlist Management**:
  - Uses **LocalStorage** to save user watchlists.
  - Stores authentication tokens in **cookies** for session persistence.
- **Smooth Carousels**: Implemented using **Swiper.js** for interactive sliders.
- **Form Handling & Validation**: Uses **React Hook Form** and **Yup** for efficient and reliable form validation.

## 📌 Pages

- **Home Page** - Displays featured movies and trending content.
- **Movies Page** - Browse and explore movies.
- **TV Shows Page** - Discover popular TV shows.
- **Movie & TV Show Details Pages** - Get detailed information about a specific movie or show.
- **Search Page** - Search for movies and TV shows.
- **Watchlist Page** - View and manage your saved watchlist.
- **Login Page** - Sign in to access personalized content.
- **Sign Up Page** - Create a new account.

## 🛠️ Technologies Used

- **Next.js** - React framework for server-side rendering and static site generation.
- **TypeScript** - Ensures type safety and better code maintainability.
- **Tailwind CSS** - Provides a fast and customizable styling approach.
- **Firebase Authentication** - Handles user authentication securely.
- **TMDb API** - Fetches movie and TV show data dynamically.
- **Swiper.js** - Creates smooth carousels for featured content.
- **Context API** - Manages global state efficiently.
- **React Hook Form & Yup** - Simplifies form handling and validation.
- **Vercel** - Used for production deployment.

## 🔧 Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/saedaraed/fakenetflix.git
   cd fakenetflix
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file and add your Firebase and TMDb API keys:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.



## 🚀 Deployment

This project is deployed on **Vercel** for a seamless production experience. You can access the live version using the link above.


