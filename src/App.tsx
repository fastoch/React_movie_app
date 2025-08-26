import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import NavigationBar from "./components/NavigationBar";
import MovieDetails from "./pages/MovieDetails";
import Wishlist from "./pages/Wishlist";

const App = () => {
  // The wishlist state holds movie IDs
  const [wishlist, setWishlist] = useState<number[]>([]);

  const updateWishlist = (movieId: number) => {
    setWishlist((currentWishlist) => {
      if (currentWishlist.includes(movieId)) {
        // if the movie is already there, do not add it
        return currentWishlist.filter((id) => id !== movieId);
      } else {
        // otherwise, add it
        return [...currentWishlist, movieId];
      }
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