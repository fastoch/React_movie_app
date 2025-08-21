import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import NavigationBar from "./components/NavigationBar";
import MovieDetails from "./pages/MovieDetails";
import Wishlist from "./pages/Wishlist";
import { movies } from "./data/movies";

const App = () => {
  const [wishlist, setWishlist] = useState<string[]>([]);

  const updateWishlist = (movieId: number) => {
    const movie = movies.find((m) => m.id === movieId);
    if (!movie) return;

    setWishlist((currentWishlist) => {
      if (!currentWishlist.includes(movie.title)) {
        return [...currentWishlist, movie.title];
      }
      return currentWishlist.filter((title) => title !== movie.title);
    });
  };

  return (
    <>
      <NavigationBar wishlist={wishlist} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies wishlist={wishlist} updateWishlist={updateWishlist} />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/wishlist" element={<Wishlist wishlist={wishlist} updateWishlist={updateWishlist} />} />
      </Routes>
    </>  
  );
};

export default App;