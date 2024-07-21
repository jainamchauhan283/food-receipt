import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RecipeDetails from "./pages/RecipeDetails";
import Navbar from "./components/Navbar";
import FavoriteRecipe from "./pages/FavoritesRecipe";

function App() {
  return (
    <div>
      <div className="min-h-screen p-6 bg-white text-gray-600 text-lg">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/favorites" element={<FavoriteRecipe />} />
          <Route path="/recipe-item/:id" element={<RecipeDetails />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
