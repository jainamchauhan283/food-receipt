import { useContext } from "react";
import { GlobalContext } from "../context/Context";
import RecipeItem from "../components/RecipeItem";

export default function HomePage() {
  const { recipeList, loading } = useContext(GlobalContext);

  if (loading) return <div className="text-center text-xl">Loading... Please wait!</div>;

  return (
    <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10">
      {recipeList && recipeList.length > 0 ? (
        recipeList.map((item) => (
          <RecipeItem
            key={item.recipe_id} // Ensure each item has a unique key
            item={item} 
          />
        ))
      ) : (
        <div className="flex items-center justify-center w-full">
          <p className="lg:text-4xl text-xl text-center text-black font-extrabold">
            Nothing to show. Please search for something.
          </p>
        </div>
      )}
    </div>
  );
}
