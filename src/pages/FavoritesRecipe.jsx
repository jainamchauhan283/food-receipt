import { useContext } from "react";
import RecipeItem from "../components/RecipeItem";
import { GlobalContext } from "../context/Context";

export default function FavoriteRecipe() {
  const { favoritesList } = useContext(GlobalContext);

  return (
    <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10">
      {favoritesList && favoritesList.length > 0 ? (
        favoritesList.map((item) => (
          <RecipeItem 
            key={item.recipe_id} // Ensure each item has a unique key
            item={item} 
          />
        ))
      ) : (
        <div className="flex items-center justify-center w-full">
          <p className="lg:text-4xl text-xl text-center text-black font-extrabold">
            Nothing is added in favorites.
          </p>
        </div>
      )}
    </div>
  );
}
